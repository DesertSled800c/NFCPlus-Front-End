import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./NFC+.css"
import { createContext, useState } from "react"
import React from "react"
import ReactSwitch from "react-switch"


export const ThemeContext = createContext("null")


export const NFC = () => {
	const [theme, setTheme] = useState("dark")

	const toggleTheme = () => {
		setTheme((curr) => (curr === "light" ? "dark" : "light"))
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className="mode" id={theme}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route path="*" element={
						<Authorized>
							<>
								<NavBar />
								<ReactSwitch className="switch-knob" onChange={toggleTheme} checked={theme === "dark"}/>
								<label className="switch">{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
								<ApplicationViews />
							</>
						</Authorized>

					} />
				</Routes>
			</div>
		</ThemeContext.Provider>
	)
}

