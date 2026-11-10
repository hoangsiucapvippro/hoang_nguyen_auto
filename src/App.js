import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import CarList from "./pages/CarList";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBooking from "./pages/MyBooking";
import TestDrive from "./pages/TestDrive";
import Buying from "./pages/Buying";
import AdminCars from "./pages/AdminCars";
import AdminBooking from "./pages/AdminBooking";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/hoangnguyen_auto/*" element={<HomePage />} />
            <Route
              path="/admin/cars"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminCars />
                </ProtectedRoute>
              }
            />
            <Route path="/hoangnguyen_auto/about_us" element={<AboutUs />} />
            <Route
              path="/hoangnguyen_auto/cars"
              element={
                <ProtectedRoute requiredRole="user">
                  <CarList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hoangnguyen_auto/test_drive"
              element={
                <ProtectedRoute requiredRole="user">
                  <TestDrive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hoangnguyen_auto/test-drive"
              element={
                <ProtectedRoute requiredRole="user">
                  <TestDrive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hoangnguyen_auto/test-drive/:carId"
              element={
                <ProtectedRoute requiredRole="user">
                  <TestDrive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hoangnguyen_auto/my_bookings"
              element={
                <ProtectedRoute requiredRole="user">
                  <MyBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hoangnguyen_auto/buying"
              element={
                <ProtectedRoute requiredRole="user">
                  <Buying />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hoangnguyen_auto/buying/:carId"
              element={
                <ProtectedRoute requiredRole="user">
                  <Buying />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminBooking />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
