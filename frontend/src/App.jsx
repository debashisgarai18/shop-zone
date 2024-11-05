import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { wishlistContext, cartContext } from "./contexts/countContext";
import { CircularProgress } from '@mui/material';

const Navbar = lazy(() => import("./Components/Navbar"));
const Menubar = lazy(() => import("./Components/Menubar"));
const Footer = lazy(() => import("./Components/Footer"));
const Home = lazy(() => import("./Pages/Home"));
const Signin = lazy(() => import("./Pages/Signin"));
const Signup = lazy(() => import("./Pages/Signup"));
const Landing = lazy(() => import("./Pages/Landing"));
const ProductPage = lazy(() => import("./Pages/ProductPage"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const WishlistPage = lazy(() => import("./Pages/WishlistPage"));

function App() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  return (
    <BrowserRouter>
      <wishlistContext.Provider value={{ wishlistCount, setWishlistCount }}>
        <cartContext.Provider value={{ cartCount, setCartCount }}>
          <Suspense fallback={<CircularProgress/>}>
            <Navbar />
          </Suspense>
        </cartContext.Provider>
      </wishlistContext.Provider>
      <Suspense fallback={<CircularProgress/>}>
        <Menubar />
      </Suspense>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<CircularProgress/>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/landing"
          element={
            <Suspense fallback={<CircularProgress/>}>
              <Landing />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<CircularProgress/>}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<CircularProgress/>}>
              <Signin />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <cartContext.Provider value={{ cartCount, setCartCount }}>
              <Suspense fallback={<CircularProgress/>}>
                <Checkout />
              </Suspense>
            </cartContext.Provider>
          }
        />
        <Route
          path="/product"
          element={
            <wishlistContext.Provider
              value={{ wishlistCount, setWishlistCount }}
            >
              <cartContext.Provider value={{ cartCount, setCartCount }}>
                <Suspense fallback={<CircularProgress/>}>
                  <ProductPage />
                </Suspense>
              </cartContext.Provider>
            </wishlistContext.Provider>
          }
        />
        <Route
          path="/wishlist"
          element={
            <wishlistContext.Provider
              value={{ wishlistCount, setWishlistCount }}
            >
              <Suspense fallback={<CircularProgress/>}>
                <WishlistPage />
              </Suspense>
            </wishlistContext.Provider>
          }
        />
      </Routes>
      <Suspense fallback={<CircularProgress/>}>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
