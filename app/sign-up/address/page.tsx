"use client";
import TextField from "@/components/TextField";
import { Grid2, Stack } from "@mui/material";

function Address() {
  return (
    <>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField type="text" label="Address" name="address" />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField type="text" label="Landmark" name="landmark" />
      </Grid2>
    </>
  );
}

export default Address;
