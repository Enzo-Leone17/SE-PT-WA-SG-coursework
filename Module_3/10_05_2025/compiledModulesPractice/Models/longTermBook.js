import { BookItem } from "./bookItem.js";

export class LongTermBook extends BookItem {
    constructor(title, author, weeksOnList, currentRank, rankLastWeek) {
        super(title, author, weeksOnList, currentRank, rankLastWeek);
        this.weeksOnList = weeksOnList;
    }
}