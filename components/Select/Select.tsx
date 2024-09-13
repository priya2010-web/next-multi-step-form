import { TextField as MuiTextField } from "@mui/material";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function Select({
  options,
  label,
  name,
}: {
  options: string[];
  label: string;
  name: string;
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();
  return (
    <MuiTextField
      fullWidth
      select
      label={label}
      {...register(name)}
      disabled={isSubmitting}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message as string}
    >
      {options?.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </MuiTextField>
  );
}
