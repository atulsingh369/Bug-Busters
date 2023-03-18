import { Link } from 'react-router-dom'
import logo from '../assets/master_g.png'

const Header = () => {
	return (
		<nav className="navbar z-3 navbar-expand-lg bg-transparent">
			<div className="container-fluid d-flex justify-content-evenly m-5">
				<a className="navbar-brand" href="/">
					<img src={logo} alt="logo" height={100} className="ms-1" />
				</a>

				<Link to="/about" className='fs-5 text-decoration-none text-white'>
					<span>
						About
					</span>
				</Link>
				<Link to="/program" className='fs-5 text-decoration-none text-white'>
					<span>
						Program
					</span>
				</Link>
				<Link to="/instructor" className='fs-5 text-decoration-none text-white'>
					<span>
						Instructor
					</span>
				</Link>
				<Link to="/contact" className='fs-5 text-decoration-none text-white'>
					<span>
						Contact
					</span>
				</Link>

				<div className="fs-5 justify-content-end" id="navbarNavAltMarkup">
					<div className="navbar-nav mb-2 align-items-center mb-lg-0 ms-3">
						<div
							className="btn-group btn-group-lg  border-0"
							role="group"
							id="get-started-button"
						>
							<button className="btn nav-link py-3 ps-4 pe-3"
								id="double-button-left" >
								<Link
									to="/login"
									className='text-decoration-none text-white'
								>
									Login
								</Link>
							</button>
							<button className="btn nav-link py-3 ps-3 pe-4"
								id="double-button-right" >
								<Link
									to="/login"
									className='text-decoration-none text-white'
								>
									Register
								</Link>
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Header
