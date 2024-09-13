import Header from "@/components/Header";
import { Box, Grid2, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <Grid2 container justifyContent="center" alignItems="center">
          <Grid2>
            <Typography variant="h5" textAlign="center">
              Complete your profile in just a few simple steps.
            </Typography>
            <Typography variant="body1" textAlign="center">
              Follow the easy steps to fill in your information.
            </Typography>
            <Link href="/sign-up/basic-details">
              <Box
                sx={{
                  border: "1px solid grey",
                  borderRadius: "4px",
                  p: 2,
                  mt: 2,
                  backgroundColor: "#2196F3",
                }}
              >
                <Typography variant="h6" textAlign="center">
                  Sign Up Here
                </Typography>
              </Box>
            </Link>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
}
