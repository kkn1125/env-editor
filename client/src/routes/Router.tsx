import Layout from "@components/templates/Layout";
import Home from "@pages/Home";
import { Route, Routes } from "react-router-dom";
// import Layout from "@components/templates/Layout";
// import Home from "@pages/Home";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Router;
