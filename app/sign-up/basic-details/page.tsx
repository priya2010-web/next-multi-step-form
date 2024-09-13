"use client";
import TextField from "@/components/TextField";
import { Stack } from "@mui/material";

function BasicDetails() {
  return (
    <Stack gap={2}>
      <TextField type="text" label="First Name" name="firstName" />
      <TextField type="text" label="Last Name" name="lastName" />
      <TextField type="text" label="Email" name="email" />
      <TextField type="password" label="Password" name="password" />
      <TextField
        type="password"
        label="Confirm Password"
        name="confirmPassword"
      />
    </Stack>
  );
}

export default BasicDetails;
