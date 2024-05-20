import React, { useState , useEffect} from 'react'
import Button from '../utilities/Button';
import '../style/register_LogIn.css'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../utilities/Sidebar';

function LogIn() {
    
    const [userLogInInfo, setUserLogInInfo] = useState({
        username: "",
        email: "",
        password: ""
    })
    
    const [responseMessage , setResponseMessage] = useState("");
    const [val , setVal] = useState(false)
    const [username , setUsername] = useState('')
    const navigate = useNavigate()
    

    function handleuserLogInInfo(event) {
        const { name, value } = event.target;
        setUserLogInInfo((preState) => {
            return ({ ...preState, [name]: value })
        })
        console.log(userLogInInfo);
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userLogInInfo)
    }

    function preventFormDefault (event) {
        event.preventDefault();
    }

    async function logInUser() {
        const response = await fetch("http://localhost:3001/user/login", requestOptions);
        const data = await response.json();
        let message = await data.message
        setUsername(data.username) 
        setResponseMessage(message)
        console.log("request Sent");
        console.log(userLogInInfo);
    }

    useEffect(()=> {
        if (responseMessage === "You are Logged In") {
            localStorage.setItem("IsLoggedIn", "true");
            localStorage.setItem("username", username);
            setVal(true)
            navigate("/"); 
        }     
    }, [responseMessage])

    return (
        <div className='logIn'>
            <Sidebar></Sidebar>
            <div className='content'>
                <div className='logIn-content'>
                    <div className='logIn-header'>
                        <h2>Log In</h2>
                        <p>Enter your credentials to Log In</p>
                    </div>

                    <form onSubmit={preventFormDefault}>
                        <label>Email / Username</label>
                        <input type='text' placeholder='Enter your email or username' name='email' value={userLogInInfo.email} onChange={handleuserLogInInfo} required></input>

                        <label>Password</label>
                        <input type='password' placeholder='Enter your password' name='password' value={userLogInInfo.password} onChange={handleuserLogInInfo} required></input>

                        <div className='terms'>
                            <input type='checkbox' id='terms' name='terms' required></input>
                            <label htmlFor='terms'>I agree to the terms of use</label>
                            <NavLink to={"/resetPassword"}>Forget Password</NavLink>
                        </div>
                        <div className='response-message'>
                            <p>{responseMessage}</p>
                        </div>

                        <Button styleClass="button logIn-button" textContent="Log In" handleClick={logInUser}></Button>
                    </form>

                    <div className='logIn-footer'>
                        <span>You don't have an account ?</span>
                        <NavLink to={"/Register"}>Register</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;