"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomProfileImage = void 0;
var profileImages = ["blueProfile", "greenProfile", "purpleProfile", "redProfile", "tealProfile", "yellowProfile"];

var randomProfileImage = function randomProfileImage() {
  var randomNumber = Math.floor(Math.random() * 6);
  return profileImages[randomNumber];
};

exports.randomProfileImage = randomProfileImage;