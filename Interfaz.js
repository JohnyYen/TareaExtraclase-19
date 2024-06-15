import ReservaLibro from './ReservaLibro.js';
import pr from 'prompt-sync';
import { Usuario } from './Usuario.js';
import Libro from './Libro.js';

const prompt = pr({sigint: true});

export default class Interfaz{
    constructor(){
        this.reservationBooks = new Set();
        this.users = new Map();
        this.books = new Map();
    }

    //Add
    addReservation(nameBook, idUser, dateDevolution){
        const user = this.users.get(idUser);
        const book = this.books.get(nameBook);

        if(user && book && dateDevolution){
            const today = new Date();
            if(today < dateDevolution)
                this.reservationBooks.add(new ReservaLibro(book, dateDevolution, user, today));
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
        this.users.set(id, new Usuario(name, age, sex, id));
    }

    addBook(name, author){
        this.books.set(name, new Libro(name, author));
    }

    //Views
    viewBooks(){
        this.books.forEach((book, index) => {
            console.log(`Book #${index}`);
            console.log(book.viewProperties());
        })
    }

    viewReservation(){
        this.reservationBooks.forEach((reservation, index) => {
            console.log(`Reservation #${index}`);
            console.log(`Date Reservation: ${reservation.fechaReserva}`);
            console.log(`Date Devolution: ${reservation.fechaDevolucion}`);
            console.log(reservation.book.viewProperties());
            console.log(reservation.user.viewProperties());
        })
    }
    viewUsers(){
        this.users.forEach((user, index) => {
            console.log(`User #${index}`);
            console.log(user.viewProperties());
        });
    }

    //Get Information
    //Usuario
    getNameUser(){
        let name;
        do {
            name = prompt('Introduce el nombre del usuario ');
        } while (!name);
        return name;
    }

    getAge(){
        let age;
        do {
            age = prompt('Introduce la edad del usuario ');
        } while (!age);
        return age;
    }

    getSex(){
        let sex;
        do {
            sex = prompt('Introduce el sexo del usuario ');
        } while (!sex);
        return sex;
    }

    getIDUser(){
        let id;
        do {
            id = prompt('Introduce el id del usuario ');
        } while (!id);
        return id;
    }

    getTitle(){
        let title;
        do {
            title = prompt('Introduce el titulo del libro ');
        } while (!title);
        return title;
    }

    getAuthor(){
        let author;
        do {
            author = prompt('Introduce el autor del libro ');
        } while (!author);

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
            console.log('6 -> Cancelar Reservas');
            console.log('7 -> Agregar Reserva de Libros');
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
                const date = new Date('2025-05-05');
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
        
        }while(op != 8);

    }

    //Logic
    cancelReservation(nameBook, idUser){
        let flag = false;
        for (let i = 0; i < this.reservationBooks.size && !flag; i++) {
            const reservation = this.reservationBooks[i];

            if(reservation.book.title === nameBook && reservation.user.id === title){
                this.reservationBooks.delete(reservation);
                flag = true;
            }
            
        }

        return flag;
    }

}