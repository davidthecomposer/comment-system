const profileImages = [
	"blueProfile",
	"greenProfile",
	"purpleProfile",
	"redProfile",
	"tealProfile",
	"yellowProfile",
];

export const randomProfileImage = () => {
	const randomNumber = Math.floor(Math.random() * 6);

	return profileImages[randomNumber];
};
