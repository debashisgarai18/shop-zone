import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Signin, Signup, Landing, ProductPage, Checkout } from "./Pages";
import Navbar from "./Components/Navbar";
import Menubar from "./Components/Menubar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Menubar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
