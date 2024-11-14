"use client";

import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuthAsync, logout } from "@/features/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthModal from "../Auth/AuthModal/AuthModal";

export default function Header() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleOpenAuthModal = () => setAuthModalOpen(true);
  const handleCloseAuthModal = () => setAuthModalOpen(false);
  const handleLogout = () => dispatch(logout());
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link className={styles.link} href={"/"}>
          HRZNOVELS
        </Link>
      </h1>
      <nav className={styles.nav}>
        <Link className={styles.link} href={"/"}>
          Home
        </Link>
        <Link className={styles.link} href={"/library"}>
          Library
        </Link>
      </nav>
      {user ? (
        <>
          <IconButton onClick={toggleDrawer(true)} color="secondary">
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
              className: styles.drawerContent,
            }}
          >
            <List className= {styles.list}>
              <ListItem>
                <ListItemText
                  primary={`@${user.username}`}
                  className={styles.username}
                />
              </ListItem>
              <Divider className={styles.divider} />
              <ListItemButton
                component={Link}
                href="/bookmarks"
                className={styles.navLink}
              >
                <ListItemText className={styles.listItemText} primary="Bookmarks" />
              </ListItemButton>
              <ListItemButton onClick={handleLogout} className={styles.navLink}>
                <ListItemText className={styles.listItemText} primary="Logout" />
              </ListItemButton>
            </List>
          </Drawer>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenAuthModal}
            endIcon={<LoginIcon />}
          >
            Sign in
          </Button>
          <AuthModal open={isAuthModalOpen} onClose={handleCloseAuthModal} />
        </>
      )}
    </header>
  );
}
