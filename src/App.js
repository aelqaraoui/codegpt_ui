import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import ReactGA from 'react-ga';

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ActualApp from "./pages/ActualApp";
import Checkout from "./pages/Checkout";

ReactGA.initialize("G-4MY6M57ZBD");

export default function App() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/app" element={<ActualApp/>} />
              <Route path="/checkout" element={<Checkout/>} />
        </Routes>
    </Router>
  );
}