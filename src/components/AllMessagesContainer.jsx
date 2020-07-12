import React, { useState, useEffect } from "react";
import SingleMessageContainer from "./SingleMessageContainer";
import buildAllNestedObjects from "../server/helpers.mjs";
import InitialInput from "./InitialInput";
import "./App.css";

const AllMessagesContainer = (props) => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [allMessages, setAllMessages] = useState([]);

	useEffect(() => {
		const loadAllMessagesInit = async () => {
			try {
				const response = await fetch("/initial", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						dbToQuery: "TestComment",
					}),
				});
				const allComments = await response.json();
				if (allComments) {
					allComments.forEach(
						(comment) =>
							(comment.date = generateDateString(new Date(comment.date)))
					);
					buildAllNestedObjects(allComments);
					console.log(allComments);
					setAllMessages(allComments);
				}
			} catch (err) {
				console.log(err);
			}
		};
		loadAllMessagesInit();
	}, []);

	const deleteFormData = () => {
		setName("");
		setMessage("");
	};

	const generateDateString = (dateObject) => {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			timeZoneName: "short",
		};
		const dateString = dateObject.toLocaleDateString("en-US", options);

		return dateString;
	};

	const recordName = (event) => {
		setName(event.target.value);
	};

	const recordMessage = (event) => {
		setMessage(event.target.value);
	};

	const addNewComment = async (e) => {
		e.preventDefault();

		const date = new Date();

		try {
			const response = await fetch("/new", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					message: message,
					date: date,
					dbToQuery: "TestComment",
				}),
			});
			const data = await response.json();

			if (data) {
				data.forEach(
					(comment) =>
						(comment.date = generateDateString(new Date(comment.date)))
				);
				buildAllNestedObjects(data);

				deleteFormData();
				setAllMessages(data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const updateCommentsFromReply = (data) => {
		data.forEach(
			(comment) => (comment.date = generateDateString(new Date(comment.date)))
		);
		buildAllNestedObjects(data);
		setAllMessages(data);
	};

	return (
		<div className='all-messages-container'>
			{(allMessages || []).map((comment) => {
				return (
					<SingleMessageContainer
						key={comment["_id"]}
						comment={comment}
						updateCommentsFromReply={updateCommentsFromReply}
						generateDateString={generateDateString}
						buildAllNestedObjects={buildAllNestedObjects}
					/>
				);
			})}
			<InitialInput
				recordName={recordName}
				recordMessage={recordMessage}
				addNewComment={addNewComment}
				name={name}
				message={message}
			/>
		</div>
	);
};

export default AllMessagesContainer;
