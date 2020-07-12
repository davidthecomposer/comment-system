import React, { useState, useEffect } from "react";
import "./Profile.css";
import blueProfile from "../images/blue_headshot.svg";
import greenProfile from "../images/green_headshot.svg";
import purpleProfile from "../images/purple_headshot.svg";
import redProfile from "../images/red_headshot.svg";
import tealProfile from "../images/teal_headshot.svg";
import yellowProfile from "../images/yellow_headshot.svg";

const Profile = ({ comment: { profileImage, name } }) => {
	const [profileImageState, setProfileImageState] = useState("");

	useEffect(() => {
		switch (profileImage) {
			case "blueProfile":
				setProfileImageState(blueProfile);
				break;
			case "greenProfile":
				setProfileImageState(greenProfile);
				break;
			case "purpleProfile":
				setProfileImageState(purpleProfile);
				break;
			case "redProfile":
				setProfileImageState(redProfile);
				break;
			case "tealProfile":
				setProfileImageState(tealProfile);
				break;
			case "yellowProfile":
				setProfileImageState(yellowProfile);
				break;
			default:
				setProfileImageState(greenProfile);
		}
	}, [profileImage]);

	return (
		<div className='profile'>
			<img src={profileImageState} alt='profile' className='avatar' />
			<p className='comment-author'>{name}</p>
		</div>
	);
};

export default Profile;
