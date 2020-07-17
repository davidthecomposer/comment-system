"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allModels = exports.createNewReply = exports.createNewComment = exports.CommentSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var CommentSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  currentVoteTally: {
    type: Number,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  parent_id: {
    type: String
  },
  allChildComments: {
    type: Number,
    required: true
  },
  replies: {
    type: Array
  }
});
exports.CommentSchema = CommentSchema;
CommentSchema.virtual("id").get(function () {
  return this._id.toString();
});

var TestComment = _mongoose.default.model("TestComment", CommentSchema);

var allModels = {
  TestComment: TestComment
};
exports.allModels = allModels;

var createNewComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(modelName, name, date, message, currentVoteTally, profileImage, allChildComments) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return modelName.create({
              parent_id: 0,
              name: name,
              date: date,
              message: message,
              currentVoteTally: currentVoteTally,
              profileImage: profileImage,
              allChildComments: allChildComments,
              replies: []
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createNewComment(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();

exports.createNewComment = createNewComment;

var createNewReply = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(modelName, name, date, message, currentVoteTally, profileImage, parent_id, allChildComments) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return modelName.create({
              name: name,
              date: date,
              message: message,
              currentVoteTally: currentVoteTally,
              profileImage: profileImage,
              parent_id: parent_id,
              allChildComments: allChildComments,
              replies: []
            });

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            console.log(error);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  }));

  return function createNewReply(_x8, _x9, _x10, _x11, _x12, _x13, _x14, _x15) {
    return _ref2.apply(this, arguments);
  };
}(); // Call from reply comment is submitted
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


exports.createNewReply = createNewReply;