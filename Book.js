export default class Book{
    constructor(title, author){
        this.title = title;
        this.author = author;
    }

    viewProperties(){
        return `Title: ${this.title}\nAuthor: ${this.author}`;
    }
}