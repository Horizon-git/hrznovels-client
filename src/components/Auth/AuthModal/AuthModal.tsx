"use client"

import { Modal, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import { LoginData, RegisterData } from "@/types/AuthData";
import { register } from "@/api/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginAsync } from "@/features/authSlice";
interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { user, isChecked, error } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const [isRegister, setIsRegister] = useState(true);

  const handleToggleForm = () => setIsRegister(!isRegister);

  const handleRegisterSubmit = async ({ username, email, password }: RegisterData) => {
    const response = await register({ username, email, password });
    console.log(response);
    onClose();
  };

  const handleLoginSubmit = ({ email, password }: LoginData) => {
    dispatch(loginAsync({ email, password }));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" align="center" gutterBottom>
          {!isRegister ? "Register" : "Login"}
        </Typography>
        {!isRegister ? (
          <RegisterForm onSubmit={handleRegisterSubmit} />
        ) : (
          <LoginForm onSubmit={handleLoginSubmit} />
        )}
        <Button onClick={handleToggleForm} color="secondary" fullWidth>
          {!isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </Button>
      </Box>
    </Modal>
  );
}
