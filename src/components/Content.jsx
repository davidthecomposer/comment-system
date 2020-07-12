import React, { useEffect } from "react";
import "./Content.css";

const Content = ({
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
	useEffect(() => {
		sendUpdatedVoteToServer();
	}, [voteTally]);

	return (
		<div className='content'>
			<div className='message'>
				<p> {comment.message}</p>
			</div>
			<div className='interactions'>
				<button className='reply-btn' onClick={handleReplyButtonPress}>
					{" "}
					{replyButtonText}
				</button>
				<p className='replies' onClick={handleRepliesPress}>
					{" "}
					<i className='comment outline icon'></i>
					{`${(comment.replies || []).length}`}
				</p>
				<p onClick={handleAllRepliesPress}>
					<i className='comments outline icon'></i>
					{comment.allChildComments}
				</p>
				<p>{comment.date}</p>

				<div className='vote'>
					<div className='vote-display'> {voteTally}</div>
					<div className='vote-buttons'>
						<i
							className={`thumbs up icon ${voteColorClass.thumbsUp}`}
							onClick={handleIncrement}></i>
						<i
							className={`thumbs down icon ${voteColorClass.thumbsDown}`}
							onClick={handleDecrement}></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Content;
