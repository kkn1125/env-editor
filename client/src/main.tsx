import { createRoot } from "react-dom/client";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <>
    {/* <StrictMode> */}
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    {/* </StrictMode> */}
  </>
);
