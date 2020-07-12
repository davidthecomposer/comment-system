import React from "react";
import "./InitialInput.css";

const InitialInput = ({
	addNewComment,
	name,
	message,
	recordName,
	recordMessage,
}) => {
	return (
		<form
			className={`comment-form-initial`}
			method='POST'
			name='form'
			id='form'
			onSubmit={addNewComment}>
			<div className='first-column'>
				<input
					type='text'
					className='name-input'
					placeholder='Name'
					name='name'
					value={name}
					required
					onChange={recordName}
					tabIndex='1'
				/>

				<button type='submit' className='submit-button' tabIndex='0'>
					Submit
				</button>
			</div>

			<textarea
				className='message-input'
				name='message'
				id='message'
				cols='30'
				rows='8'
				placeholder='write new message here'
				value={message}
				onChange={recordMessage}
				tabIndex='2'
				required></textarea>
		</form>
	);
};

export default InitialInput;
