"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Rating,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addReview } from "@/features/bookDetailsSlice";

type Props = {
  bookId: number;
  bookTitle: string;
};

export default function ReviewModal({ bookId, bookTitle }: Props) {
  const { user, isChecked, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(0);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    console.log(1);
    if (rating && title && comment && user) {
      console.log(2);
      const userId = user.id;
      dispatch(addReview({ bookId, userId, rating, title, comment }));
      handleClose();
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Add Review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add a Review

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <h4>{bookTitle}</h4>
        <DialogContent>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={1}
          />
          <TextField
            fullWidth
            label="Review Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
