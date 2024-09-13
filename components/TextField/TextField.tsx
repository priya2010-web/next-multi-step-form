import { TextField as MuiTextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
export default function TextField({
  type,
  label,
  name,
}: {
  type: string;
  label: string;
  name: string;
}): React.ReactNode {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <MuiTextField
      fullWidth
      type={type}
      label={label}
      {...register(name)}
      disabled={isSubmitting}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message as string}
    />
  );
}
