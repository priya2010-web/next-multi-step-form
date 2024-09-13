import { z } from "zod";

export const basicDetailsSchema = z
  .object({
    //section 1
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export const addressSchema = z.object({
  //section 2
  address: z.string().min(10),
  landmark: z.string().optional(),
});

export const educationSchema = z.object({
  //section 3
  highestQualification: z.string().max(5),
  cgpa: z.string().refine((val) => !Number.isNaN(parseFloat(val)), {
    message: "Expected number, received a string",
  }),
  college: z.string(),
});

export const signupSchema = z.intersection(
  z.intersection(basicDetailsSchema, addressSchema),
  educationSchema
);
