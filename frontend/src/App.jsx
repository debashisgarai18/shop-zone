import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Navbar = lazy(() => import("./Components/Navbar"));
const Menubar = lazy(() => import("./Components/Menubar"));
const Footer = lazy(() => import("./Components/Footer"));
const Home = lazy(() => import("./Pages/Home"));
const Signin = lazy(() => import("./Pages/Signin"));
const Signup = lazy(() => import("./Pages/Signup"));
const Landing = lazy(() => import("./Pages/Landing"));
const ProductPage = lazy(() => import("./Pages/ProductPage"));
const Checkout = lazy(() => import("./Pages/Checkout"));

// TODO : Improve the loading of the JSX components

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={"Loading..."}>
        <Navbar />
      </Suspense>
      <Suspense fallback={"Loading..."}>
        <Menubar />
      </Suspense>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={"Loading...."}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/landing"
          element={
            <Suspense fallback={"Loading..."}>
              <Landing />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={"Loading..."}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={"Loading..."}>
              <Signin />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={"Loading..."}>
              <Checkout />
            </Suspense>
          }
        />
        <Route
          path="/product"
          element={
            <Suspense fallback={"Loading..."}>
              <ProductPage />
            </Suspense>
          }
        />
      </Routes>
      <Suspense fallback={"Loading..."}>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
