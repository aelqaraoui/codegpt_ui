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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJg5tWD_H920aRxDLTbCqgEPHp2vcxIR0",
  authDomain: "codegpt-fdbe3.firebaseapp.com",
  projectId: "codegpt-fdbe3",
  storageBucket: "codegpt-fdbe3.appspot.com",
  messagingSenderId: "627192950526",
  appId: "1:627192950526:web:499a4563aad82cf5e03faf",
  measurementId: "G-4MY6M57ZBD"
};

ReactGA.initialize("G-4MY6M57ZBD");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
        </Routes>
    </Router>
  );
}