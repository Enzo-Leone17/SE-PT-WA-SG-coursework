

export default class BookItem {
    title;
    author;
    weeksOnList;
    currentRank;
    rankLastWeek;
    constructor(title, author, weeksOnList, currentRank, rankLastWeek) {
        this.title = title;
        this.author = author;
        this.weeksOnList = weeksOnList;
        this.currentRank = currentRank;
        this.rankLastWeek = rankLastWeek;
    }
}