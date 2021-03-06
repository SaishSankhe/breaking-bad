import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<div>
			<h1>Error 404: Page not found!</h1>
			<div className="alignCenter">
				<Link to="/" className="backBtn">
					<button>Home</button>
				</Link>
			</div>
		</div>
	);
};

export default Error;
