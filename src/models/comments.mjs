import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	currentVoteTally: {
		type: Number,
		required: true,
	},
	profileImage: {
		type: String,
		required: true,
	},
	parent_id: {
		type: String,
	},
	allChildComments: {
		type: Number,
		required: true,
	},
	replies: { type: Array },
});

CommentSchema.virtual("id").get(function () {
	return this._id.toString();
});

const TestComment = mongoose.model("TestComment", CommentSchema);

const allModels = { TestComment: TestComment };

const createNewComment = async (
	modelName,
	name,
	date,
	message,
	currentVoteTally,
	profileImage,
	allChildComments
) => {
	await modelName.create({
		parent_id: 0,
		name: name,
		date: date,
		message: message,
		currentVoteTally: currentVoteTally,
		profileImage: profileImage,
		allChildComments: allChildComments,
		replies: [],
	});
};

const createNewReply = async (
	modelName,
	name,
	date,
	message,
	currentVoteTally,
	profileImage,
	parent_id,
	allChildComments
) => {
	try {
		await modelName.create({
			name: name,
			date: date,
			message: message,
			currentVoteTally: currentVoteTally,
			profileImage: profileImage,
			parent_id: parent_id,
			allChildComments: allChildComments,
			replies: [],
		});
	} catch {
		console.log(error);
	}
};

export { CommentSchema, createNewComment, createNewReply, allModels };
// Call from reply comment is submitted
// App calls the database endpoint and adds into replies [])
//App inserts and then gets the given Schema/Collection

// User votes.
//If user votes local storage is updated with userVoteTally
//vote total is sent to App.JS
//App.js contacts correct endpoint and inserts into appropriate slot
//app gets the updated number and plugs that into the state of the given comment where it is updated for all.

// Things to consider:
// validation in front and backend
//security on forms (check out modules for that and native mongoose support or even earlier)
// Setup for demo (not persistent or local storage?)
//  Setup on actual server (for site)
