import React from "react";
import { Route, Routes } from "react-router-dom";
import Bookings from "./components/Bookings";
import AddUser from "./components/AddUser";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Users from "./components/Users";
import { AuthContextProvider } from "./context/AuthContext";
import Stats from "./components/Stats";
import Reviews from "./components/Reviews";
import Reports from "./components/Reports";
import UpdateUserCell from "./components/UpdateUserCell";
import ViewBooking from "./components/ViewBooking";



function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/main" element={
            <ProtectedRoute>
              <NavBar />
              <Bookings />
            </ProtectedRoute>
          } />

          <Route path="/stats" element={
            <ProtectedRoute>
              <NavBar />
              <Stats />
            </ProtectedRoute>
          } />

          <Route path="/view-booking" element={
            <ProtectedRoute>
              <NavBar />
              <ViewBooking />
            </ProtectedRoute>
          } />

          <Route path="/reports" element={
            <ProtectedRoute>
              <NavBar />
              <Reports />
            </ProtectedRoute>
          } />

          <Route path="/reviews" element={
            <ProtectedRoute>
              <NavBar />
              <Reviews />
            </ProtectedRoute>
          } />

          <Route path="/updateuser" element={
            <ProtectedRoute>
              <NavBar />
              <UpdateUserCell />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            // <OnlyAdmin>
            <ProtectedRoute>
              <NavBar />
              <Users />
            </ProtectedRoute>

          } />
          <Route path="/adduser" element={
            <ProtectedRoute>
              <NavBar />
              <AddUser />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
