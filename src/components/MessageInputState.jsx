import React from "react";
import "./MessageInputState.css";

const MessageInputState = ({
	visibilityClass,
	sendReply,
	recordMessage,
	recordName,
	name,
	message,
}) => {
	return (
		<form
			className={`comment-form ${visibilityClass}`}
			method='POST'
			name='form'
			id='form'
			onSubmit={sendReply}>
			<div className='first-column'>
				<input
					type='text'
					className='name-input'
					placeholder='Name'
					name='name'
					value={name}
					maxLength='12'
					required
					onChange={recordName}
				/>

				<button type='submit' className='submit-button'>
					Submit
				</button>
			</div>

			<textarea
				className='message-input'
				name='message'
				id='message'
				cols='30'
				rows='8'
				placeholder='write reply here'
				value={message}
				onChange={recordMessage}
				required></textarea>
		</form>
	);
};

export default MessageInputState;
