
//export class for format of friends
class Friend {
    id;
    name;
    gender;
    constructor(id, name, gender) {
        this.id = id;
        this.name = name;
        this.gender = gender;
    }
}

const friends = [
    new Friend(1, 'Phoebe', 'female'),
    new Friend(2, 'Joey', 'male'),
    new Friend(3, 'Chandler', 'male'),
    new Friend(4, 'Monica', 'female'),
    new Friend(5, 'Ross', 'male'),
    new Friend(6, 'Rachael', 'female'),
];



module.exports = {friends, Friend};