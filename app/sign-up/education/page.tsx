"use client";
import { HIGHEST_QUALIFICATIONS } from "@/app/lib/schemas/constants";
import Select from "@/components/Select";
import TextField from "@/components/TextField";
import { Grid2 } from "@mui/material";

function Education() {
  return (
    <>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <Select
          options={[...HIGHEST_QUALIFICATIONS]}
          label="Highest Qualification"
          name="highestQualification"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField type="number" label="CGPA" name="cgpa" />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField type="text" label="College" name="college" />
      </Grid2>
    </>
  );
}
export default Education;
