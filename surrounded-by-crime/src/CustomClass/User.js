class User{
    constructor(nameF, nameL, id, password, email){
        this.nameF = nameF;
        this.nameL = nameL;
        this.id = id;
        this.password = password;
        this.email = email;
    }
    getnameF(){return this.nameF}
    setnameF(nameF){this.nameF = nameF}
    getnameL(){return this.nameL}
    setnameL(nameL){this.nameL = nameL}
    getid(){return this.id}
    setid(id){this.id = id}
    getpassword(){return this.password}
    setpassword(password){this.password = password}
    getemail(){return this.email}
    setemail(email){this.email = email}
}
export default User;