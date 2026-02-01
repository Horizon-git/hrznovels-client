"use client";

import Container from "@/components/Container/Container";
import styles from "./page.module.scss";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { books2 } from "@/data/books";
import LibraryItem from "@/components/LibraryItem/LibraryItem";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { BookCard } from "@/types/Book";
import Pagination from "@mui/material/Pagination";
import { getSearchWith } from "@/helpers/searchWith";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBooks } from "@/features/booksSlice";
import { Sort, sortObj } from "@/types/Sort";
import { DropDown } from "@/components/DropDown/DropDown";

const ITEMS_PER_PAGE = 5;

export default function Library() {
  const router = useRouter();
  const { books, loading, error } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const searchParam = searchParams.get("search") || "";
  const genreParam = searchParams.get("genre") || "All";
  const tagsParam = searchParams.get("tags") || "";
  const getSort = searchParams.get("sort") || "";

  const [currentBooks, setCurrentBooks] = useState<BookCard[]>([]);
  const [pageCount, setPageCount] = useState<number>(
    Math.ceil(books2.length / ITEMS_PER_PAGE)
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  const [activeGenre, setActiveGenre] = useState<string>("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const preparedBooks = useMemo(() => {
    let sortedBooks;
    const tags = tagsParam
      ? tagsParam.split(",").map((tag) => decodeURIComponent(tag))
      : [];
    const startBooks = [...books];

    const filteredBooks = startBooks.filter((book) => {
      const searchString = searchParam.toLowerCase();

      const matchesSearch =
        book.name.toLowerCase().includes(searchString) ||
        book.description.toLowerCase().includes(searchString);

      const matchesGenre =
        book.genres.includes(genreParam) || genreParam === "All";

      const matchesTags =
        tags.length === 0 || tags.every((tag) => book.tags.includes(tag));

      return matchesSearch && matchesGenre && matchesTags;
    });

    switch (getSort) {
      case Sort.alphabet:
        sortedBooks = [...filteredBooks].sort((p1, p2) =>
          p1[getSort].localeCompare(p2[getSort])
        );
        break;
      case Sort.newest:
        sortedBooks = [...filteredBooks].sort((p1, p2) => p2.id - p1.id);
        break;
      case Sort.rating:
        sortedBooks = [...filteredBooks].sort(
          (p1, p2) => p1.averageRating - p2.averageRating
        );
        break;

      default:
        return filteredBooks;
    }

    return sortedBooks || filteredBooks;
  }, [getSort, tagsParam, books, searchParam, genreParam]);

  useEffect(() => {
    const loadBooks = () => {
      const start = (Number(page) - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      setPageCount(Math.ceil(preparedBooks.length / ITEMS_PER_PAGE));
      setCurrentBooks(preparedBooks.slice(start, end));
    };

    loadBooks();
  }, [page, preparedBooks]);

  const genres = useMemo(() => {
    const allGenres = books.flatMap((book) => book.genres);
    return [...new Set(allGenres)];
  }, [books]);

  const tags = useMemo(() => {
    const allTags = books.flatMap((book) => book.tags);
    return [...new Set(allTags)];
  }, [books]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    const newParams = getSearchWith(searchParams, {
      page: page.toString(),
      search: searchQuery,
      genre: activeGenre,
      tags: selectedTags.join(","),
    });
    router.push(`/library?${newParams}`, { scroll: false });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    const newParams = getSearchWith(searchParams, {
      search: searchQuery,
      page: "1",
      genre: activeGenre,
      tags: selectedTags.map((tag) => encodeURIComponent(tag)).join(","),
    });
    router.push(`/library?${newParams}`, { scroll: false });
  };

  const handleFilter = () => {
    setIsFilterMenuOpen((value) => !value);
  };

  const handleGenreClick = (genre: string) => {
    setActiveGenre(genre);
  };

  const handleTagsChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    setSelectedTags(newValue);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Library</h1>
        <div className={styles.filterWrapper}>
          <input
            type="text"
            className={styles.input}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name or description"
          />
          <Button
            variant="contained"
            color="secondary"
            endIcon={<SearchIcon />}
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFilter}
            endIcon={
              !isFilterMenuOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />
            }
          >
            Filter
          </Button>
        </div>
        {isFilterMenuOpen && (
          <div className={styles.filterMenu}>
            <div className={styles.genresBlock}>
              <h6 className={styles.filterSpan}>Genres:</h6>
              <div className={styles.buttonsWrapper}>
                <button
                  className={`${styles.button} ${
                    activeGenre === "All" ? styles.active : ""
                  }`}
                  onClick={() => handleGenreClick("All")}
                >
                  All
                </button>
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className={`${styles.button} ${
                      activeGenre === genre ? styles.active : ""
                    }`}
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.tagsBlock}>
              <h6 className={styles.filterSpan}>Tags:</h6>
              <Autocomplete
                multiple
                limitTags={2}
                id="tags-standard"
                options={tags}
                getOptionLabel={(option) => option}
                value={selectedTags}
                onChange={handleTagsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select option"
                    placeholder="Select option"
                  />
                )}
              />
            </div>
          </div>
        )}
        <div className={styles.dropdownWrapper}>
          <DropDown
            currentOption={getSort}
            searchName="sort"
            options={sortObj}
          />
        </div>
        <div className={styles.books}>
          {currentBooks.map((book) => (
            <LibraryItem key={book.id} book={book} />
          ))}
        </div>
        <Pagination
          count={pageCount}
          page={Number(page)}
          onChange={handlePageChange}
          color="secondary"
          sx={{
            "& .MuiPaginationItem-root": {
              backgroundColor: "#2b2b2b",
              color: "#fff",
            },
            "& .Mui-selected": {
              color: "#121212 !important",
            },
          }}
        />
      </div>
    </Container>
  );
}
