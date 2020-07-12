// const message = [
// 	{
// 		_id: 1,
// 		name: "david",
// 		replies: [
// 			{
// 				_id: 2,
// 				name: "Jenny",
// 				replies: [
// 					{
// 						_id: 3,
// 						name: "Brian",
// 						replies: [{ _id: 4, name: "david", replies: [] }],
// 					},
// 				],
// 			},
// 		],
// 	},
// ];

// const reply = { _id: 5, name: "the", replies: [] };

// const searchByIdAndInsertReply = (array, parent_id, reply) => {
// 	for (let obj of array) {
// 		if (obj["_id"] === parent_id) {
// 			obj.replies = [...obj.replies, reply];
// 			return true;
// 		}

// 		searchByIdAndInsertReply(obj.replies, parent_id, reply);
// 	}
// };

// searchByIdAndInsertReply(message, 4, reply);

// console.log(message);

// const allComments = [
// 	{
// 		_id: "5f0656af7ec73a2fc4534113",
// 		replies: [],
// 		parent_id: "0",
// 		name: "David",
// 		date: "July 8, 2020",
// 		message: "My message\n",
// 		currentVoteTally: 0,
// 		profileImage: "tealProfile",
// 		__v: 0,
// 		allChildComments: 0,
// 	},
// 	{
// 		_id: "5f0656b87ec73a2fc4534114",
// 		replies: [],
// 		parent_id: "0",
// 		name: "Brian",
// 		date: "July 8, 2020",
// 		message: "Second message",
// 		currentVoteTally: 0,
// 		profileImage: "greenProfile",
// 		__v: 0,
// 		allChildComments: 0,
// 	},
// 	{
// 		_id: "5f0656c77ec73a2fc4534115",
// 		replies: [],
// 		name: "aliya",
// 		date: "July 8, 2020",
// 		message: "first reply",
// 		currentVoteTally: 0,
// 		profileImage: "tealProfile",
// 		parent_id: "5f0656b87ec73a2fc4534114",
// 		__v: 0,
// 		allChildComments: 0,
// 	},
// 	{
// 		_id: "5f0656b87ec73a2fc4534117",
// 		replies: [],
// 		parent_id: "0",
// 		name: "Jennga",
// 		date: "July 8, 2020",
// 		message: "Second message",
// 		currentVoteTally: 0,
// 		profileImage: "greenProfile",
// 		__v: 0,
// 		allChildComments: 0,
// 	},
// ];

const addNumbersFromArray = (arr) => {
	const value = arr.reduce((a, b) => {
		return a["allChildComments"] + b["allChildComments"];
	});

	return value.allChildComments;
};

const buildAllNestedObjects = (arr) => {
	while (
		arr.filter((comment) => comment.parent_id === "0").length === arr.length
	) {
		return arr;
	}
	for (let i = arr.length - 1; i > -1; i--) {
		for (let j = arr.length - 1; j > -1; j--) {
			if (arr[i].parent_id === arr[j]._id) {
				arr[j].replies = [...arr[j].replies, arr[i]];
				arr[j].allChildComments =
					arr[j].replies.length + addNumbersFromArray(arr[j].replies);
				arr.splice(i, 1);
				return buildAllNestedObjects(arr);
			}
		}
	}
};

// console.log(buildAllNestedObjects(allComments));

export default buildAllNestedObjects;
