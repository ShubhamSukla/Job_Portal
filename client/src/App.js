import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage"
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import {Toaster} from "react-hot-toast";
import PrivateRoute from "./components/shared/routes/PrivateRoute";
import PublicRoute from "./components/shared/routes/PublicRoute";

const options  = {
  // style: {
  //     border: '1px solid #713200',
  //     padding: '16px',
  //     color: '#103000',
  //   },
    success: {
      style: {
        background: 'green',
      },
    },
    error: {
      style: {
        background: 'red',
      },
    },
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
        <PublicRoute>
          <Homepage/>
        </PublicRoute>}/>
        <Route path="/login" element={
        <PublicRoute>
        <Login/>
        </PublicRoute>}/>
        <Route path="/register" element={
          <PublicRoute>
            <Register/>
          </PublicRoute>
        }/>
        <Route path="/dashboard" 
        element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
        }/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Toaster 
      position="bottom-right" 
      toastOptions = {options} />
    </>
  );
}

export default App;
