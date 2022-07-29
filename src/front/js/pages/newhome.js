import React from "react";
import "../../styles/home.css";

export const NewHome = () => {

	return (
		<div className="container text-center mt-5">
			<h1>Welcome!</h1>
            <h2>Please Register or Login</h2>
            <h3 className="bg-danger">The profile page is only accessible with a valid JWT-Token</h3>
            
		</div>
	);
};
