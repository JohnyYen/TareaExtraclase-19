import ReservaBase from './ReservaBase.js';

export default class ReservaLibro extends ReservaBase{
    constructor(book, dateDevolution, user, dateReservation){
        super(user, dateReservation);
        this.book = book;
        this.dateDevolution = dateDevolution;
    }


}