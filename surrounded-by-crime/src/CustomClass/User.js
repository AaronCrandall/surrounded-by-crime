class User{
    constructor(nameF, nameL, id, password, email, distancePref){
        this.nameF = nameF;
        this.nameL = nameL;
        this.id = id;
        this.password = password;
        this.email = email;
        this.distancePref = distancePref
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
    getDistancePref(){return this.distancePref}
    setDistancePref(distancePref){this.distancePref = distancePref}
}
export default User;