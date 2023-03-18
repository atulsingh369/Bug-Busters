import { BsFacebook, BsTwitter, BsGoogle, BsInstagram } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer
      className="text-center text-white"
      style={{ backgroundColor: '#1c2331' }}
    >
      {/* Section: Social media */}
      <section className="row p-4 justify-content-between bg-secondary">
        <div className="col-12 col-sm-8 my-1 fs-4">
          Get connected with us on social networks:
        </div>

        <div className="col-12 col-sm-4 my-1 fs-4">
          <a href="/" className="text-white me-4">
            <BsFacebook />
          </a>
          <a href="/" className="text-white me-4">
            <BsTwitter />
          </a>
          <a href="/" className="text-white me-4">
            <BsGoogle />
          </a>
          <a href="/" className="text-white me-4">
            <BsInstagram />
          </a>
        </div>
      </section>

      {/* Section: Links  */}
      <section className="row p-4 px-0">
        <div className="col-6 d-flex flex-column justify-content-around fs-4 gap-4">
          <a href="/" className="text-decoration-none text-white">
            Support Us
          </a>
          <a href="/" className="text-decoration-none text-white">
            Contact Us
          </a>
          <a href="/" className="text-decoration-none text-white">
            Privacy Policy
          </a>
          <a href="/" className="text-decoration-none text-white">
            Terms & Condition
          </a>
        </div>
        <div className="col-6 d-flex flex-column justify-content-around">
          <a href="/" className="fs-4 text-decoration-none text-light">
            FAQ
          </a>
          <h6 className="fs-4 my-3">Member of</h6>
          <div className="d-flex justify-content-center gap-5">
          </div>
        </div>
      </section>

      {/* Section: Copyright  */}
      <section className="bg-dark text-center p-4">
        <h5 className="h5">© 2023. All rights reserved.</h5>
      </section>
    </footer>
  )
}

export default Footer
