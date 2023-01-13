//jshint esversion:6
//We are just getting a getDate function

exports.getDate = function() {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return today.toLocaleDateString("en-US", options);
};

exports.getDay = function getDay() {
  let today = new Date();

  let options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", options);
}
