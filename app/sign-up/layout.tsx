"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid2,
  Stack,
  Paper,
  Snackbar,
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
} from "@mui/material";
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
import Header from "@/components/Header";

const SignupFormSchema = [basicDetailsSchema, addressSchema, educationSchema];

const signUpSteps = ["Basic Details", "Address", "Education"];
type SignupStepType = z.infer<typeof signupSchema>;
function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeStep, setActiveStep] = useState(2);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
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
        const response = await axios.post("/api/signup", overallData);

        console.log("Signup successful:", response.data);
        setSnackbar({
          open: true,
          message: `Signup successful`,
          severity: "success",
        });
        reset();
        setTimeout(() => {
          router.push("/");
        }, 4000);
      } catch (error) {
        const stringifiedError = stringifyError(error, "some error occurred");
        setServerError(stringifiedError);
        setSnackbar({
          open: true,
          message: stringifiedError,
          severity: "error",
        });
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
    router.prefetch("address");
    router.prefetch("education");
    router.push(
      formNavigationMap[activeStep as keyof typeof formNavigationMap]
    );
  }, [activeStep, router]);

  return (
    <>
      <Snackbar open={snackbar.open} autoHideDuration={4000}>
        <Alert
          severity={snackbar.severity as AlertColor}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Header showSignup={false} />
      <Stack
        sx={{
          p: 6,
        }}
      >
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
        <Paper
          sx={{
            p: 2,
            mt: 4,
          }}
        >
          <FormProvider {...methods}>
            <Grid2
              component={"form"}
              container
              sx={{
                mt: 2,
              }}
              spacing={2}
              onSubmit={handleSubmit(onSubmit)}
            >
              {children}
              <Grid2 size={12}>
                <Grid2
                  container
                  justifyContent={"space-between"}
                  sx={{
                    marginTop: 2,
                  }}
                >
                  <Button
                    variant="text"
                    disabled={activeStep === 0}
                    onClick={() => goToPrev()}
                  >
                    Previous
                  </Button>
                  {activeStep !== 2 && (
                    <Button
                      variant="outlined"
                      onClick={() => goToNext()}
                      disabled={!isValid}
                    >
                      Next
                    </Button>
                  )}
                  {/* TODO: add condition to show this button once we are on final page (index becomes 2) */}

                  {activeStep === 2 && (
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  )}
                </Grid2>
              </Grid2>
            </Grid2>
            {serverError && <p style={{ color: "red" }}>{serverError}</p>}
          </FormProvider>
        </Paper>
      </Stack>
    </>
  );
}
export default Layout;
