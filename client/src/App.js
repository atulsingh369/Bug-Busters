import Header from './layout/Navbar'
import Home from './pages/Home.js'
import Footer from './layout/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					{/* <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/my-profile" element={<Profile />} /> */}
				</Routes>
				<Footer />
			</Router>
		</>
	)
}

export default App
