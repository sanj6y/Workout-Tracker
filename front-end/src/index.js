import React from "react";
import ReactDOM from "react-dom/client";

import Home from "./Pages/Home.jsx";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import WorkoutDisplay from "./Pages/WorkoutDisplay.jsx";
import Dashboard from "./Pages/Dashboard.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/workout" element={<WorkoutDisplay />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
