import Home from './pages/Home.js'
import Login from './components/LoginSignUp'
import Footer from './layout/Footer'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/login" element={<Login />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
