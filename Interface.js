import BookReservation from './BookReservation.js';
import pr from 'prompt-sync';
import User from './User.js';
import Book from './Book.js';

const prompt = pr({sigint: true});

export default class Interface{
    constructor(){
        this.reservationBooks = [];
        this.users = new Map();
        this.books = new Map();
    }

    //Metodos para agregar nuevas instancias de las entidades
    //Add
    addReservation(nameBook, idUser, dateDevolution){
        const user = this.users.get(idUser);
        const book = this.books.get(nameBook);

        if(user && book && dateDevolution){
            const today = new Date();
            if(today < dateDevolution)
                this.reservationBooks.push(new BookReservation(book, dateDevolution, user, today));
            else
                console.log('La fecha de devolucion es antes de la fecha de reservacion');
        }
        else{
            if(!user)
                console.log('El usuario no existe');
            if(!book)
                console.log('El libro no existe');
        }
    }

    addUser(name, age, sex, id){
        this.users.set(id, new User(name, age, sex, id));
    }

    addBook(name, author){
        this.books.set(name, new Book(name, author));
    }

    //Metodos para listar las propiedades de las entidades
    //Views
    viewBooks(){
        this.books.forEach((book, index) => {
            console.log(`Book #${index}`);
            console.log(book.viewProperties());
        })
    }

    viewReservation(){
        this.reservationBooks.forEach((reservation,index) => {
            console.log(`Reservation #${index}`);
            console.log(`Date Reservation: ${reservation.fechaReserva}`);
            console.log(`Date Devolution: ${reservation.fechaDevolucion}`);
            console.log(reservation.book.viewProperties());
            console.log(reservation.user);
            console.log(reservation.user.viewProperties());
        })
    }

    viewUsers(){
        this.users.forEach((user, index) => {
            console.log(`User #${index}`);
            console.log(user.viewProperties());
        });
    }

    //Gets para pedir informacion
    //Usuario
    getNameUser(){
        let name;
        do {
            name = prompt('Introduce el nombre del usuario ');
        } while (!name || !isNaN(Number(name)));
        return name;
    }

    getAge(){
        let age;
        do {
            age = prompt('Introduce la edad del usuario ');
        } while (!age || isNaN(Number(age)) || age <= 0);
        return age;
    }

    getSex(){
        let sex;
        do {
            sex = prompt('Introduce el sexo del usuario ');
        } while (!sex || !isNaN(Number(sex)) || (sex.toUpperCase() != 'M' && sex.toUpperCase() != 'F'));

        return sex;
    }

    getIDUser(){

        let id;

        do {
            id = prompt('Introduce el id del usuario ');
        } while (!id || isNaN(Number(id)));
        return id;
    }

    getTitle(){
        let title;
        do {
            title = prompt('Introduce el titulo del libro ');
        } while (!title || !isNaN(Number(title)));
        return title;
    }

    getDateDevolution(){
        let date;
        do{
            date = prompt("Introduce una fecha en el formato YYYY-MM-DD");
        }while(!date);
        return new Date(date);
    }

    getAuthor(){
        let author;
        do {
            author = prompt('Introduce el autor del libro ');
        } while (!author || !isNaN(Number(author)));

        return author;
    }

    menu(){
        let op;
        do{
            console.log('\nSistema de Gestión de Reserva de Libros: Cujae Biblioteca\n');
            console.log('1 -> Listar Libros');
            console.log('2 -> Listar Usuarios');
            console.log('3 -> Listar Reservas');
            console.log('4 -> Crear Usuario');
            console.log('5 -> Crear Libro');
            console.log('6 -> Agregar Reserva de Libros');
            console.log('7 -> Cancelar Reservas');
            console.log('8 -> Salir del Sistema');

            op = prompt('Introduce una opcion ');
           switch (op) {
            case '1':
                //Listar Libros
                this.viewBooks();
                
                break;
            case '2':
                //Listar Usuarios   
                this.viewUsers();

                break;
            case '3':
                //Listar Reservas
                this.viewReservation();

                break;
            case '4':
                //Crear Usuario    
                const name = this.getNameUser();
                const id = this.getIDUser();
                const age = this.getAge();
                const sex = this.getSex();
                this.addUser(name, age, sex, id);

                break;
            case '5':
                //Crear Libro
                const title = this.getTitle();
                const author = this.getAuthor();
                this.addBook(title, author);

                break;
            case '6':
                //Cancelar Reservas
                const bookName = this.getTitle();
                const userId = this.getIDUser();
                this.cancelReservation(bookName, userId);

                break;
            case '7':
                //Agregar Reserva de Libros
                const nameBook = this.getTitle();
                const idUser = this.getIDUser();
                const date = this.getDateDevolution();
                this.addReservation(nameBook, idUser, date);

                break;
            case '8':
                //Salir de la aplicacion
                console.log("Saliste de la aplicacion");
                    
                break;
            default:
                console.log("Valor incorrecto");
                break;
           }
           prompt('Toca una tecla para continuar...');
        }while(op != 8);

    }

    //Logic
    cancelReservation(nameBook, idUser){
        let flag = false;
        for (let i = 0; i < this.reservationBooks.length && !flag; i++) {
            const reservation = this.reservationBooks[i];

            if(reservation.book.title === nameBook && reservation.user.id === idUser){
                this.reservationBooks = this.reservationBooks.filter((e) => e !== reservation);
                flag = true;
            }
            
        }

        return flag;
    }

}