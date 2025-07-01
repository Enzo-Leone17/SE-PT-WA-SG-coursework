//import services
const friendService = require("../services/friend.service");


module.exports = {
    getAllFriends : (req, res) => {
        return friendService.getAllFriends(req, res);
    },
    filterFriendsByQuery: (req, res) => {
        return friendService.filterFriendsByQuery(req, res);
    },
    getHeaderInfo: (req, res) => {
        return friendService.getHeaderInfo(req, res);
    },
    getFriendByID: (req, res) => {
        return friendService.getFriendByID(req, res);
    },
    createFriend: (req, res) => {
        return friendService.createFriend(req, res);
    },
    updateFriendByID: (req, res) => {
        return friendService.updateFriendByID(req, res);
    }
}