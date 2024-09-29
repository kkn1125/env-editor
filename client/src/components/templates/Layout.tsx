import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Stack height='inherit'>
      <Outlet />
    </Stack>
  );
}

export default Layout;
