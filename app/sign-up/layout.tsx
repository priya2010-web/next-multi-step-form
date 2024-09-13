"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Stepper, Step, StepLabel, Button, Grid2, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import {
  basicDetailsSchema,
  addressSchema,
  educationSchema,
  signupSchema,
} from "../lib/schemas/signup-schema";
import { stringifyError } from "../utils";

const SignupFormSchema = [basicDetailsSchema, addressSchema, educationSchema];

const signUpSteps = ["Basic Details", "Address", "Education"];
type SignupStepType = z.infer<typeof signupSchema>;
function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeStep, setActiveStep] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const currentStepSchema = SignupFormSchema[activeStep];

  const methods = useForm<SignupStepType>({
    resolver: zodResolver(currentStepSchema),
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    getValues,
    formState: { isValid },
  } = methods;

  const onSubmit = async () => {
    if (activeStep < SignupFormSchema.length - 1) {
      // If not on the last step, go to the next step
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      // Final step: submit form data
      try {
        const overallData = getValues(); // Get all form data
        const response = await axios.post("/api/signup", {
          ...overallData,
          ...{ firstName: "" },
        });
        console.log("Signup successful:", response.data);
      } catch (error) {
        setServerError(stringifyError(error, "some error occurred"));
      }
    }
  };

  const formNavigationMap = {
    0: "basic-details",
    1: "address",
    2: "education",
  };

  const goToNext = async () => {
    if (isValid) {
      setActiveStep((prev) => prev + 1);
      reset(getValues()); // Reset form with current values to preserve state
    }
  };
  const goToPrev = () => {
    setActiveStep((prev) => prev - 1);
    reset(getValues());
  };

  useEffect(() => {
    router.push(
      formNavigationMap[activeStep as keyof typeof formNavigationMap]
    );
  }, [activeStep, router]);

  return (
    <Stack className="m-2">
      <Link href="/">Go to home</Link>
      <Stepper activeStep={activeStep}>
        {signUpSteps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="flex justify-center">
        <FormProvider {...methods}>
          <form
            className="w-full max-w-md bg-white shadow-md rounded px-4 pt-6 pb-2 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {children}
            <Grid2
              container
              justifyContent={"space-between"}
              sx={{
                marginTop: 2,
              }}
            >
              <Button
                variant="outlined"
                disabled={activeStep === 0}
                onClick={() => goToPrev()}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                hidden={activeStep === 2}
                onClick={() => goToNext()}
                disabled={!isValid}
              >
                Next
              </Button>
              {/* TODO: add condition to show this button once we are on final page (index becomes 2) */}

              <Button
                variant="contained"
                type="submit"
                hidden={activeStep !== 2}
              >
                Submit
              </Button>
            </Grid2>
            {serverError && <p style={{ color: "red" }}>{serverError}</p>}
          </form>
        </FormProvider>
      </div>
    </Stack>
  );
}
export default Layout;
