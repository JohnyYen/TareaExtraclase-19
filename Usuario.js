export class Usuario{
    constructor(name, age, sex, id){
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.id = id;
    }

    viewProperties(){
        return `Name: ${this.name}\nAge: ${this.age}\nSex: ${this.sex}\nID: ${this.id}`;
    }
}