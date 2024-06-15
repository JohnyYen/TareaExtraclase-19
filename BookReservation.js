import BaseReservation from './BaseReservation.js';

export default class BookReservation extends BaseReservation{
    constructor(book, dateDevolution, user, dateReservation){
        super(user, dateReservation);
        this.book = book;
        this.dateDevolution = dateDevolution;
    }


}