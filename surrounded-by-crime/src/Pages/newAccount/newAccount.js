import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';

//forms and logic to create and register a new account
export default function NewAccount() {
    const [userForm, setUserForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    function updateUserForm(newInfo) {
        for (const [field, entry] of Object.entries(newInfo)) {
            userForm[field] = entry;
        }
        setUserForm(userForm);
    }

    // async function testingSession() {
    //     const response = await fetch(`http://localhost:5050/crime/`, {credentials: 'include'});
    //     if (!response.ok) {
    //         console.log(response);
    //         const message = `An error occurred: ${response.statusText}`;
    //         console.error(message);
    //         return;
    //     }
    // }

    // testingSession();

    async function registerUser(e) {
        e.preventDefault();
        try {
            const registration = { ...userForm };
            const response = await fetch("http://localhost:5050/crime/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(registration)}
        )
        } finally {
            navigate('/');
        }
    };

  return (
    <main>
    <h1 class="h1">Sign Up: </h1>
    <form className="text" onSubmit={registerUser}>

    <div className="inputBox">
            <input type="text" name="firstName" id="firstName" placeholder="First Name" required onChange={(e) => updateUserForm({firstName: e.target.value})}></input>
        </div>

        <div className="inputBox">
            <input type="text" name="lastName" id="lastName" placeholder="Last Name" required onChange={(e) => updateUserForm({lastName: e.target.value})}></input>
        </div>
        
        <div className="inputBox">
            <input type="email" name="email" id="email" placeholder="Email" required onChange={(e) => updateUserForm({email: e.target.value})}></input>
        </div>
        
        <div className="inputBox">
            <input type="password" name="password" id="password" placeholder="Password" required onChange={(e) => updateUserForm({password: e.target.value})}></input>
        </div>
        
        <div className="btn2 inputBox">
            <input type="submit" name="submit" id ="submit" value="Sign Up"></input>
        </div>
    </form>
</main>
  )
};