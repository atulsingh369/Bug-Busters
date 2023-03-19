import Header from './layout/Navbar'
import Home from './pages/Home.js'
import Dashboard from "./pages/account"
import Login from './components/LoginSignUp'
import Footer from './layout/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/login" element={<Login />} />
				 <Route exact path="/account" element={<Dashboard />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
