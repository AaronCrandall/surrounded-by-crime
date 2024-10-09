class Blog{
    constructor(title, authorL, authorF, text, date, time, id, location, severity, authID){
        this.title = title;
        this.authorF = authorF;
        this.authorL = authorL;
        this.text = text;
        this.date = date;
        this.time = time;
        this.id = id;
        this.location = location;
        this.severity = severity;
        this.comments = [];
        this.authID = authID;
    }
    getAuthID(){return this.authID;}
    setAuthID(authID){this.authID = authID;}
    getTitle(){return this.title;}
    setTitle(title){this.title = title;}
    getAuthorL(){return this.authorL;}
    setAuthorL(authorL){this.authorL=authorL;}
    getAuthorF(){return this.authorF;}
    setAuthorF(authorF){this.authorF=authorF;}
    getText(){return this.text;}
    setText(text){this.text=text;}
    getDate(){return this.date}
    setDate(date){this.date=date;}
    getTime(){return this.time;}
    setTime(time){this.time = time;}
    getID(){return this.id}
    setID(id){this.id = id;}
    getLocation(){return this.location;}
    setLocation(location){this.location=location;}
    getSeverity(){return this.severity;}
    setSeverity(severity){this.severity = severity;}
    getComments(){return this.comments;}
    setComments(comments){this.comments = comments;}
    addComment(comment){this.comments.push(comment)};
    removeComment(comment){
        for(let i = 0; i < this.comments.length; i++)
        {
            if(this.comments[i].id === comment.id){
                delete this.comments[i];
            }
        }
    }

}
export default Blog;