import { Link } from 'react-router-dom'
import logo from '../assets/master_g.png'

const Header = () => {
  return (
		<nav className="navbar stick-top navbar-expand-lg bg-transparent">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" height={100} className="ms-1" />
        </a>
        <div className="fs-5 justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav mb-2 align-items-center mb-lg-0 ms-3">
            <div
              className="btn-group btn-group-lg border-0 rounded-5"
              role="group"
              id="get-started-button"
            >
              <Link
                to="/dashboard"
                className="btn nav-link py-3 ps-4 pe-3"
                id="double-button-left"
              >
                Login
              </Link>
              <a href="#!" className="btn nav-link py-3 ps-3 pe-4">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
