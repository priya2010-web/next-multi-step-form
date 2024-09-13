"use client";
import TextField from "@/components/TextField";
import { Stack } from "@mui/material";

function Education() {
  return (
    <Stack gap={2}>
      <TextField
        type="text"
        label="Highest Qualification"
        name="highestQualification"
      />
      <TextField type="number" label="CGPA" name="cgpa" />
      <TextField type="text" label="College" name="college" />
    </Stack>
  );
}
export default Education;
