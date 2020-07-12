import React, { useState, useEffect, useRef } from "react";
import "./SingleMessageContainer.css";
import MessageSubmittedState from "./MessageSubmittedState";
import MessageInputState from "./MessageInputState";

const SingleMessageContainer = ({ comment, updateCommentsFromReply }) => {
	const messageId = `${comment._id}`;
	const allChildren = useRef(null);
	const userVoteTallyInitial = Number(
		localStorage.getItem(`message${messageId}`)
	);
	const [showReplies, setShowReplies] = useState("");
	const [visibilityClass, setVisibilityClass] = useState("");
	const [replyButtonText, setReplyButtonText] = useState("reply");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [voteTally, setVoteTally] = useState(comment.currentVoteTally);
	const [voteColorClass, setVoteColorClass] = useState({
		thumbsUp: "",
		thumbsDown: "",
	});
	const [userVoteTally, setUserVoteTally] = useState(userVoteTallyInitial || 0);

	useEffect(() => {
		if (userVoteTally === 1) {
			setVoteColorClass({
				...voteColorClass,
				thumbsUp: "green-vote",
				thumbsDown: "",
			});
		}
		if (userVoteTally === -1) {
			setVoteColorClass({
				...voteColorClass,
				thumbsDown: "red-vote",
				thumbsUp: "",
			});
		}
	}, []);

	const sendUpdatedVoteToServer = async () => {
		try {
			const response = await fetch("/vote", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					currentVoteTally: voteTally,
					_id: messageId,
					dbToQuery: "TestComment",
				}),
			});
			const data = await response.json();

			updateCommentsFromReply(data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleRepliesPress = () => {
		return showReplies === "" || showReplies === "close-replies"
			? setShowReplies("open-replies")
			: setShowReplies("close-replies");
	};

	const handleAllRepliesPress = () => {
		handleRepliesPress();
		[...allChildren.current.querySelectorAll(".replies")].forEach(
			(replyBtn) => {
				replyBtn.click();
			}
		);
	};

	const handleReplyButtonPress = () => {
		if (visibilityClass === "" || visibilityClass === "invisible") {
			setVisibilityClass("visible");
			setReplyButtonText("cancel");
		} else {
			setVisibilityClass("invisible");
			setReplyButtonText("reply");
		}
	};

	const nestedComments = (comment.replies || []).map((comment) => {
		return (
			<SingleMessageContainer
				key={comment._id}
				comment={comment}
				updateCommentsFromReply={updateCommentsFromReply}
				handleAllRepliesPress={handleAllRepliesPress}
				showReplies={showReplies}
			/>
		);
	});

	const deleteFormData = () => {
		setName("");
		setMessage("");
	};

	const sendReply = async (event) => {
		event.preventDefault();

		const date = new Date();

		try {
			const response = await fetch("/reply", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					message: message,
					date: date,
					parent_id: comment._id,
					dbToQuery: "TestComment",
				}),
			});
			const data = await response.json();

			deleteFormData();
			setVisibilityClass("invisible");
			setReplyButtonText("reply");

			updateCommentsFromReply(data);
		} catch (err) {
			console.log(err);
		}
	};

	const recordName = (event) => {
		setName(event.target.value);
	};

	const recordMessage = (event) => {
		setMessage(event.target.value);
	};

	const handleIncrement = () => {
		if (userVoteTally !== 1) {
			if (userVoteTally === 0) {
				setVoteTally(voteTally + 1);
			}
			if (userVoteTally === -1) {
				setVoteTally(voteTally + 2);
			}
			setUserVoteTally(1);
			localStorage.setItem(`message${messageId}`, "1");
			setVoteColorClass({
				...voteColorClass,
				thumbsUp: "green-vote",
				thumbsDown: "",
			});
		} else {
			setVoteTally(voteTally - 1);
			setVoteColorClass({ ...voteColorClass, thumbsUp: "" });
			setUserVoteTally(0);
			localStorage.setItem(`message${messageId}`, "0");
		}
		console.log(voteTally);
	};

	const handleDecrement = () => {
		if (userVoteTally === 0 || userVoteTally === 1) {
			if (userVoteTally === 0) {
				setVoteTally(voteTally - 1);
			}
			if (userVoteTally === 1) {
				setVoteTally(voteTally - 2);
			}

			setUserVoteTally(-1);
			localStorage.setItem(`message${messageId}`, "-1");
			setVoteColorClass({
				...voteColorClass,
				thumbsDown: "red-vote",
				thumbsUp: "",
			});
		} else {
			setVoteTally(voteTally + 1);

			setVoteColorClass({ ...voteColorClass, thumbsDown: "" });
			setUserVoteTally(0);
			localStorage.setItem(`message${messageId}`, "0");
		}
	};

	return (
		<div className='message-container'>
			<MessageSubmittedState
				comment={comment}
				handleRepliesPress={handleRepliesPress}
				handleReplyButtonPress={handleReplyButtonPress}
				replyButtonText={replyButtonText}
				handleDecrement={handleDecrement}
				handleIncrement={handleIncrement}
				voteTally={voteTally}
				voteColorClass={voteColorClass}
				sendUpdatedVoteToServer={sendUpdatedVoteToServer}
				handleAllRepliesPress={handleAllRepliesPress}
			/>
			<MessageInputState
				visibilityClass={visibilityClass}
				id={comment._id}
				sendReply={sendReply}
				recordMessage={recordMessage}
				recordName={recordName}
				name={name}
				message={message}
			/>
			<div className={`reply-container ${showReplies}`} ref={allChildren}>
				{nestedComments}
			</div>
		</div>
	);
};

export default SingleMessageContainer;
