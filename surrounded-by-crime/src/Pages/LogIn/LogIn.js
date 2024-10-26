import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//forms and backend checking for logging in

export default function LogIn() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    function updateLoginForm(newInfo) {
        for (const [field, entry] of Object.entries(newInfo)) {
            loginForm[field] = entry;
        }
        setLoginForm(loginForm);
    }

    async function loginUser(e) {
        e.preventDefault();
        try {
            const login = { ...loginForm };
            await fetch("http://localhost:5050/crime/login-user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(login)}
            )
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem('jwt-token', data.token);
            })
        } catch(err) {
            console.log(err);
        }
        finally {
            navigate('/');
        }
    };

    return (
        <main>
        <h1 class="h1">Log In: </h1>
        <form onSubmit={loginUser}>
            
            <div class="inputBox">
                <input type="email" name="email" id="email" placeholder="Email" required onChange={(e) => updateLoginForm({email: e.target.value})}></input>
            </div>
            
            <div class="inputBox">
                <input type="password" name="password" id="password" placeholder="Password" required onChange={(e) => updateLoginForm({password: e.target.value})}></input>
            </div>
            
            <div class="btn2 inputBox">
                <input type="submit" name="submit" id ="submit" value="Log In"></input>
            </div>

        </form>
        </main>
    )

// LogIn.propTypes = {};

// LogIn.defaultProps = {};
};