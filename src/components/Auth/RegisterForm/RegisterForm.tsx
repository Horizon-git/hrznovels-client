"use client";

import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });

  const handleShowPasswordToggle = () => setShowPassword(!showPassword);

  const validateUsername = (value: string) => {
    return value.length >= 3 ? "" : "Username must be at least 3 characters.";
  };

  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value) ? "" : "Enter a valid email.";
  };

  const validatePassword = (value: string) => {
    return value.length >= 6 ? "" : "Password must be at least 6 characters.";
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setErrors((prevErrors) => ({ ...prevErrors, username: validateUsername(value) }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: validatePassword(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (usernameError || emailError || passwordError) {
      setErrors({ username: usernameError, email: emailError, password: passwordError });
      return;
    }

    onSubmit({ username, email, password });
  };

  const isFormValid = email && password && username && !errors.email && !errors.password && !errors.username;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        fullWidth
        color="secondary"
        margin="normal"
        value={username}
        onChange={handleUsernameChange}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        label="Email"
        type="email"
        color="secondary"
        fullWidth
        margin="normal"
        value={email}
        onChange={handleEmailChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        color="secondary"
        margin="normal"
        value={password}
        onChange={handlePasswordChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPasswordToggle} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ my: 1 }}
        disabled={!isFormValid}
      >
        Register
      </Button>
    </form>
  );
}
