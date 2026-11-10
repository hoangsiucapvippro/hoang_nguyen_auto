import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import CarList from "./pages/CarList";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/hoangnguyen_auto/*" element={<HomePage />} />
            <Route path="/hoangnguyen_auto/about_us" element={<AboutUs />} />
            <Route path="/hoangnguyen_auto/cars" element={<CarList />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
