import React from "react";
import "./MessageSubmittedState.css";
import Profile from "./Profile";
import Content from "./Content";

const MessageSubmittedState = ({
	comment,
	handleRepliesPress,
	handleReplyButtonPress,
	replyButtonText,
	handleIncrement,
	handleDecrement,
	voteTally,
	voteColorClass,
	sendUpdatedVoteToServer,
	handleAllRepliesPress,
}) => {
	return (
		<div className='message-submitted-state'>
			<Profile comment={comment} />

			<Content
				comment={comment}
				handleRepliesPress={handleRepliesPress}
				handleReplyButtonPress={handleReplyButtonPress}
				replyButtonText={replyButtonText}
				handleIncrement={handleIncrement}
				handleDecrement={handleDecrement}
				voteTally={voteTally}
				voteColorClass={voteColorClass}
				sendUpdatedVoteToServer={sendUpdatedVoteToServer}
				handleAllRepliesPress={handleAllRepliesPress}
			/>
		</div>
	);
};

export default MessageSubmittedState;
