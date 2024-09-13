import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function Header({
  showSignup = true,
}: {
  showSignup?: boolean;
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DEMO-APP
          </Typography>

          {showSignup ? (
            <Link href="/sign-up/basic-details" passHref>
              <button type="button">Sign Up</button>
            </Link>
          ) : (
            <Link href="/">
              <button type="button">Home</button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
