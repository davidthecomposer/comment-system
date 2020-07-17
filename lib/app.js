"use strict";

require("dotenv/config.js");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _url = require("url");

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _randomProfileImage = require("./randomProfileImage.mjs");

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _comments = require("./models/comments.mjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _filename = (0, _url.fileURLToPath)(import.meta.url);

var _dirname = (0, _path.dirname)(_path.default.join(_filename, "..", "..", "package.json"));

var app = (0, _express.default)();
var localLinkToDB = "mongodb+srv://david:XaZ5jMD0kjxmZCSW@comments.olipm.mongodb.net/commentsDB?retryWrites=true&w=majority";
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use((0, _helmet.default)());
app.use((0, _cors.default)());

_mongoose.default.connect(process.env.DB_URI || localLinkToDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(function (result) {
  return app.listen(process.env.PORT || 8080, function () {
    console.log("server started on port 3000.");
  });
}).catch(function (err) {
  return console.log(err);
});

if (process.env.NODE_ENV === "production") {
  app.use(_express.default.static("".concat(_dirname, "/build")));
  console.log("using static");
}

app.get("/ping", function (req, res) {
  return res.send("pong");
});
app.post("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, error) {
    var modelName, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            modelName = _comments.allModels[req.body.dbToQuery];
            _context.next = 4;
            return modelName.find({}).lean();

          case 4:
            result = _context.sent;
            result.forEach(function (comment) {
              return comment._id = comment._id.toString();
            });
            res.json(result);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(error);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.post("/new", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, error) {
    var modelName, singleMessageObject, name, date, message, currentVoteTally, profileImage, allChildComments, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            modelName = _comments.allModels[req.body.dbToQuery];
            singleMessageObject = req.body;
            singleMessageObject.profileImage = (0, _randomProfileImage.randomProfileImage)();
            singleMessageObject.currentVoteTally = 0;
            singleMessageObject.allChildComments = 0;
            name = singleMessageObject.name, date = singleMessageObject.date, message = singleMessageObject.message, currentVoteTally = singleMessageObject.currentVoteTally, profileImage = singleMessageObject.profileImage, allChildComments = singleMessageObject.allChildComments;
            _context2.next = 9;
            return (0, _comments.createNewComment)(modelName, name, date, message, currentVoteTally, profileImage, allChildComments);

          case 9:
            _context2.next = 11;
            return modelName.find().lean();

          case 11:
            result = _context2.sent;
            // result.forEach((comment) => (comment._id = comment._id.toString()));
            // buildAllNestedObjects(result);
            res.json(result);
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            console.log(error);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
app.post("/reply", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, error) {
    var modelName, singleMessageObject, name, date, message, currentVoteTally, profileImage, parent_id, allChildComments, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            modelName = _comments.allModels[req.body.dbToQuery];
            singleMessageObject = req.body;
            singleMessageObject.profileImage = (0, _randomProfileImage.randomProfileImage)();
            singleMessageObject.currentVoteTally = 0;
            singleMessageObject.allChildComments = 0;
            name = singleMessageObject.name, date = singleMessageObject.date, message = singleMessageObject.message, currentVoteTally = singleMessageObject.currentVoteTally, profileImage = singleMessageObject.profileImage, parent_id = singleMessageObject.parent_id, allChildComments = singleMessageObject.allChildComments;
            _context3.next = 9;
            return (0, _comments.createNewReply)(modelName, name, date, message, currentVoteTally, profileImage, parent_id, allChildComments);

          case 9:
            _context3.next = 11;
            return modelName.find().lean();

          case 11:
            result = _context3.sent;
            // result.forEach((comment) => (comment._id = comment._id.toString()));
            // buildAllNestedObjects(result);
            res.json(result);
            _context3.next = 18;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](0);
            console.log(error);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 15]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
app.post("/vote", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, error) {
    var modelName, vote, currentVoteTally, _id, result;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            modelName = _comments.allModels[req.body.dbToQuery];
            vote = req.body;
            currentVoteTally = vote.currentVoteTally, _id = vote._id;
            modelName.findByIdAndUpdate({
              _id: _id
            }, {
              currentVoteTally: currentVoteTally
            }, function (err) {
              console.log(err);
            });
            _context4.next = 7;
            return modelName.find().lean();

          case 7:
            result = _context4.sent;
            // result.forEach((comment) => (comment._id = comment._id.toString()));
            res.json(result);
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            console.log(error);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());