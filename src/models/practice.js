import blueProfile from "../images/blue_headshot.svg";
import greenProfile from "../images/green_headshot.svg";
import purpleProfile from "../images/purple_headshot.svg";
import redProfile from "../images/red_headshot.svg";
import tealProfile from "../images/teal_headshot.svg";
import yellowProfile from "../images/yellow_headshot.svg";

const profileImages = [
	blueProfile,
	greenProfile,
	purpleProfile,
	redProfile,
	tealProfile,
	yellowProfile,
];

const getRandomNumber = () => {
	const randomNumber = Math.floor(Math.random() * 6);

	return randomNumber;
};

const blogPage1Comments = [
	{
		profileImage: profileImages[getRandomNumber()],
		name: "Jack",
		date: "June 22, 2020 at 7:36 pm",
		message: `This is my fake message. I really liked or disliked this thing that I'm commenting on! `,
		currentVoteTally: 34,
		replies: [],
		_id: 1,
		parent_id: 0,
	},
	{
		profileImage: profileImages[getRandomNumber()],
		name: "Bubba",
		date: "June 22, 2020 at 7:36 pm",
		message: `I am making a new comment`,
		currentVoteTally: 1,
		replies: [],
		_id: 2,
		parent_id: 0,
	},
];

export default blogPage1Comments;
