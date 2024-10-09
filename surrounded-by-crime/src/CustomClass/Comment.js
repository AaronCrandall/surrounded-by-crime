class Comment{
    constructor(text, id, authorF, authorL, date, time, authID){
        this.text = text;
        this.id = id;
        this.authorF = authorF;
        this.authorL = authorL;
        this.comments = [];
        this.date = date;
        this.time = time;
        this.authID = authID;
    }
    getAuthID(){return this.authID;}
    setAuthID(authID){this.authID = authID;}
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
export default Comment