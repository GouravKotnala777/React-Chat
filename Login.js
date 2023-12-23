import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // const navigate = useNavigate();
    const [login, setLogin] = useState({email:"", password:""});
    const {email, password} = login;
    const loginInpHandler = (e) => {
        setLogin({...login, [e.target.name]:e.target.value});
    };
    const postLoginData = async() => {
        const res = await fetch("/login", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email, password})
        });
        const data = await res.json();

        console.log("-------------- Login");
        console.log(data);
        console.log("--------------");
        // navigate("/chat");
        window.location = "/chat";
    };

    return(
        <>
            <input type="text" name="email" placeholder="Email" onChange={loginInpHandler} />
            <input type="text" name="password" placeholder="Password" onChange={loginInpHandler} />
            <button onClick={() => {postLoginData()}}>Login</button>
        </>
    )

};

export default Login;