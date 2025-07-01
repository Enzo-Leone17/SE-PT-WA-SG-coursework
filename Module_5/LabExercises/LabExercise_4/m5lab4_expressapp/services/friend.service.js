//import models
const { friends, Friend } = require("../models/friends");

module.exports = {
  //get all friends
  getAllFriends: (req, res) => {
    return res.json(friends);
  },
  //filter friends by : gender || starting letter
  filterFriendsByQuery: (req, res) => {
    let filterGender = req.query.gender;
    let filterLetter = req.query.letter;
    let matchingFriends = [...friends];

    if (
      (filterGender && filterGender.toLowerCase() === "female") ||
      filterGender.toLowerCase() === "male"
    ) {
      matchingFriends = matchingFriends.filter(
        (friend) => friend.gender == filterGender.toLowerCase()
      );
    } else if (filterGender) {
      // return an error response when the gender is not valid
      res.status(404).json({ error: "Invalid gender " + filterGender });
      return;
    }

    if (filterLetter && filterLetter.length === 1) {
      matchingFriends = matchingFriends.filter((friend) =>
        friend.name.toLowerCase().startsWith(filterLetter.toLowerCase())
      );
    } else if (filterLetter) {
      // return an error response when the letter is not valid
      res.status(404).json({ error: "Invalid letter " + filterLetter });
      return;
    }

    if (matchingFriends.length > 0) {
      // return valid data when the gender matches
      return res.status(200).json(matchingFriends);
    } else {
      // and an error response when there are no matches
      let query =
        filterGender && filterLetter
          ? `gender ${filterGender} and letter ${filterLetter}`
          : filterGender
          ? `gender ${filterGender}`
          : filterLetter
          ? `letter ${filterLetter}`
          : "none";
      return res.status(404).json({ error: "No friends matching query " + query });
    }
  },
  //return header information "user-agent", "content-type" and "accept"
  getHeaderInfo: (req, res) => {
    const result = {
      "user-agent": req.get("user-agent"),
      "content-type": req.get("content-type"),
      accept: req.get("accept"),
    };
    return res.json(result);
  },
  //return friend information based on specific id
  getFriendByID: (req, res) => {
    let friendId = req.params.id; // 'id' here will be a value matching anything after the / in the request path

    // Modify this function to find and return the friend matching the given ID, or a 404 if not found
    //validate friendId
    if (!friendId || isNaN(Number(friendId))) {
      res.status(500).json({ error: "Invalid friend ID" });
      return;
    }

    let matchingFriend = friends.find((friend) => friend.id == friendId);
    if (!matchingFriend) {
      res
        .status(404)
        .json({ error: "Friend with ID " + friendId + " not found" });
      return;
    }

    return res.json(matchingFriend);
  },
  //create a new friend
  createFriend: (req, res) => {
    let newFriend = req.body; // FIRST add this line to index.js: app.use(express.json());
    console.log(newFriend); // 'body' will now be an object containing data sent via the request body

    // we can add some validation here to make sure the new friend object matches the right pattern
    if (!newFriend.name || !newFriend.gender) {
      res
        .status(500)
        .json({ error: "Friend object must contain a name and gender" });
      return;
    } else if (
      newFriend.gender.toLowerCase() !== "male" &&
      newFriend.gender.toLowerCase() !== "female"
    ) {
      res.status(500).json({ error: "Gender must be 'male' or 'female'" });
      return;
    } else if (!newFriend.id || isNaN(Number(newFriend.id))) {
      newFriend.id = friends.length + 1; // generate an ID if one is not present
    } else if (friends.find((friend) => friend.id == newFriend.id)) {
      res.status(500).json({
        error:
          "Friend with ID " +
          newFriend.id +
          " already exists, Use PUT request on /" +
          newFriend.id +
          " instead to update",
      });
      return;
    }
    //parse into Friend class object (standardize data format)
    let result = new Friend(
      newFriend.id,
      newFriend.name,
      newFriend.gender.toLowerCase()
    );
    // if the new friend is valid, add them to the list and return the successfully added object
    friends.push(result);
    return res.status(200).json(result);
  },
  //update a friend
  updateFriendByID: (req, res) => {
    let friendId = req.params.id;
    let updatedFriend = req.body;

    //validate friendId
    if (!friendId || isNaN(Number(friendId))) {
      res.status(500).json({ error: "Invalid friend ID" });
      return;
    }

    // we can add some validation here to make sure the new friend object matches the right pattern
    if (!updatedFriend.name && !updatedFriend.gender) {
      res
        .status(500)
        .json({
          error: "Friend object must contain a name or gender to change",
        });
      return;
    } else if (
      updatedFriend.gender &&
      updatedFriend.gender.toLowerCase() !== "male" &&
      updatedFriend.gender.toLowerCase() !== "female"
    ) {
      res.status(500).json({ error: "Gender must be 'male' or 'female'" });
      return;
    }

    //find friend to update
    let matchingFriend = friends.find((friend) => friend.id == friendId);
    if (!matchingFriend) {
      res
        .status(404)
        .json({ error: "Friend with ID " + friendId + " not found" });
      return;
    }

    //update friend
    if (updatedFriend.name) {
      matchingFriend.name = updatedFriend.name;
    }
    if (updatedFriend.gender) {
      matchingFriend.gender = updatedFriend.gender.toLowerCase();
    }

    // Modify this response with the updated friend, or a 404 if not found
    return res.json({
      result: "Updated friend with ID " + friendId,
      data: matchingFriend,
    });
  },
};
