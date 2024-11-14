"use client"

import Container from '@/components/Container/Container'
import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBookmarks } from '@/features/bookmarksSlice';
import BookmarksCard from '@/components/BookmarksCard/BookmarksCard'

export default function Bookmarks() {
  const { user } = useAppSelector(state => state.auth);
  const { bookmarks } = useAppSelector(state => state.bookmarks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchBookmarks(user.id))
    }
  }, [dispatch, user])

  if (!user) return <div>Please login first</div>

  return (
    <Container>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="center"
        sx={{ py: 4 }}
      >
        {bookmarks.map((bookmark) => (
          <BookmarksCard key={bookmark.book_id} bookmark={bookmark} />
        ))}
        {!bookmarks.length && (<p>There is no bookmarks yet</p>)}
      </Box>
    </Container>
  )
}
