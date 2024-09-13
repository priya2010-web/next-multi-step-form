"use client";
import TextField from "@/components/TextField";
import { Stack } from "@mui/material";

function Address() {
  return (
    <Stack gap={2}>
      <TextField type="text" label="Address" name="address" />
      <TextField type="text" label="Landmark" name="landmark" />
    </Stack>
  );
}

export default Address;
