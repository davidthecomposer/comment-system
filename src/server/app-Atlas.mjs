import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import { randomProfileImage } from "./randomProfileImage.mjs";
import helmet from "helmet";
// import buildAllNestedObjects from "./helpers.mjs";
import {
	createNewComment,
	createNewReply,
	allModels,
} from "../models/comments.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const dbURI =
	"mongodb://heroku_dzdjk8jx:677ir3gv1371es3527h5592i91@ds157057.mlab.com:57057/heroku_dzdjk8jx";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then((result) =>
		app.listen(process.env.PORT || 8080, () => {
			console.log(`server started on port 3000. Connected to Atlas`);
		})
	)
	.catch((err) => console.log(err));

// mongoose.ObjectId.get((v) => v.toString());

app.get("/ping", function (req, res) {
	return res.send("pong");
});

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/build/index.html`);
});

app.post("/initial", async (req, res, error) => {
	try {
		const modelName = allModels[req.body.dbToQuery];

		const result = await modelName.find({}).lean();
		result.forEach((comment) => (comment._id = comment._id.toString()));

		res.json(result);
	} catch {
		console.log(error);
	}
});

app.post("/new", async (req, res, error) => {
	try {
		const modelName = allModels[req.body.dbToQuery];

		const singleMessageObject = req.body;
		singleMessageObject.profileImage = randomProfileImage();
		singleMessageObject.currentVoteTally = 0;
		singleMessageObject.allChildComments = 0;
		console.log(singleMessageObject);
		const {
			name,
			date,
			message,
			currentVoteTally,
			profileImage,
			allChildComments,
		} = singleMessageObject;

		await createNewComment(
			modelName,
			name,
			date,
			message,
			currentVoteTally,
			profileImage,
			allChildComments
		);
		const result = await modelName.find().lean();
		// result.forEach((comment) => (comment._id = comment._id.toString()));

		// buildAllNestedObjects(result);
		res.json(result);
	} catch {
		console.log(error);
	}
});

app.post("/reply", async (req, res, error) => {
	try {
		const modelName = allModels[req.body.dbToQuery];

		const singleMessageObject = req.body;
		singleMessageObject.profileImage = randomProfileImage();
		singleMessageObject.currentVoteTally = 0;
		singleMessageObject.allChildComments = 0;
		const {
			name,
			date,
			message,
			currentVoteTally,
			profileImage,
			parent_id,
			allChildComments,
		} = singleMessageObject;

		await createNewReply(
			modelName,
			name,
			date,
			message,
			currentVoteTally,
			profileImage,
			parent_id,
			allChildComments
		);

		const result = await modelName.find().lean();
		// result.forEach((comment) => (comment._id = comment._id.toString()));
		// buildAllNestedObjects(result);
		res.json(result);
	} catch {
		console.log(error);
	}
});

app.post("/vote", async (req, res, error) => {
	try {
		const modelName = allModels[req.body.dbToQuery];

		const vote = req.body;

		const { currentVoteTally, _id } = vote;

		modelName.findByIdAndUpdate(
			{ _id },
			{ currentVoteTally: currentVoteTally },
			(err) => {
				console.log(err);
			}
		);

		const result = await modelName.find().lean();
		// result.forEach((comment) => (comment._id = comment._id.toString()));

		res.json(result);
	} catch {
		console.log(error);
	}
});
