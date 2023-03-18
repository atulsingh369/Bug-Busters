import React from 'react';
import bg from "../assets/slum.png";
import Navbar from '../layout/Navbar'

const section1 = () => {

	const styles = {
		header: {
			backgroundImage: `url(${bg})`,
			height: '100vh',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
		},

		content: {
			height: '100%',
			width: '100%',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		}
	}

	return (
		<>
			<div className='vh-100 z-1' style={styles.header}>
				<div style={styles.content} className="">
					<Navbar />
					<div className="d-flex flex-column text-white vh-75 d-flex justify-content-center align-items-center" >
						<h1 className='fs-1 mt-5'>Welcome to Master G</h1>
						<p className='fs-3 mt-5'>Education for All</p>
					</div>
				</div>

			</div>
		</>
	)
}

export default section1;
