"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "dark", // общая темная тема
    background: {
      default: "#141414", // фон по умолчанию для страницы
      paper: "#2b2b2b",   // фон для таких компонентов, как Card и Drawer
    },
    primary: {
      main: "#03a9f4",    // основной цвет для primary кнопок
    },
    secondary: {
      main: "#b100dd",    // основной цвет для secondary кнопок
    },
    text: {
      primary: "#ffffff", // основной цвет текста
      secondary: "#94a3b8",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#94a3b8',
            // transform: 'translate(0, 0)', // Положение лейбла по вертикали
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#2b2b2b', // Цвет нижнего бордера (до фокуса)
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#2b2b2b', // Цвет нижнего бордера при наведении
          },
          '& .MuiInput-underline:hover:after': {
            borderBottomColor: '#2b2b2b', // Цвет нижнего бордера при наведении
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#2b2b2b', // Цвет нижнего бордера при фокусе
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#94a3b8', // Цвет текста для Autocomplete
          },
          '& .MuiInputBase-root': {
            color: '#94a3b8', // Цвет текста в поле ввода
          },
          '& .MuiInput-root': {
            paddingBottom: '10px',
          }
        },
        popper: {
          '& .MuiAutocomplete-listbox': {
            backgroundColor: '#2b2b2b', // Цвет фона списка
            color: '#fff',
          },
          '& .MuiAutocomplete-option': {
            '&[aria-selected="true"]': {
              backgroundColor: '#1e1e1e', // Цвет фона выбранного элемента
              color: '#fff', // Цвет текста выбранного элемента
            },
            '&:hover': {
              backgroundColor: '#3a3a3a', // Цвет фона при наведении
              color: '#fff', // Цвет текста при наведении
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#2b2b2b', // Цвет фона чипа
          color: '#ffffff',           // Цвет текста чипа
        },
        deleteIcon: {
          color: '#ff6b6b',           // Цвет иконки удаления
          '&:hover': {
            color: '#ff4c4c',         // Цвет иконки удаления при наведении
          },
        },
      },
    },
  },
});

export default theme;
