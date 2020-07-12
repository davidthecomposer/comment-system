import React from "react";
import AllMessagesContainer from "./AllMessagesContainer";
import CommentsHeader from "./CommentsHeader";
import "./App.css";
const App = (props) => {
	return (
		<div className='comment-app-container'>
			<CommentsHeader />

			<AllMessagesContainer />
		</div>
	);
};

export default App;
