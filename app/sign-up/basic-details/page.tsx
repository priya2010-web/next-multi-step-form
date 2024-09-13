"use client";
import TextField from "@/components/TextField";
import { Grid2 } from "@mui/material";

function BasicDetails() {
  return (
    <>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField type="text" label="First Name" name="firstName" />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField type="text" label="Last Name" name="lastName" />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField type="text" label="Email" name="email" />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField type="password" label="Password" name="password" />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
        />
      </Grid2>
    </>
  );
}

export default BasicDetails;
