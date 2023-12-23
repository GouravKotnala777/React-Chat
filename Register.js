import { useState } from "react";

const Register = () => {
    const [register, setRegister] = useState({name:"no data", email:"no data", password:"no data", pic:""});
    const {name, email, password} = register;
    const registerInpHandler = (e) => {
        setRegister({...register, [e.target.name]:e.target.value});
    };
    const postRegisterData = async() => {
        const res = await fetch("/register", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name, email, password})
        });
        const data = await res.json();

        console.log("-------------- Register");
        console.log(data);
        console.log("--------------");
    };

    return(
        <>
            <h1>Register</h1>
            <input type="text" name="name" placeholder="Name" onChange={registerInpHandler} />
            <input type="text" name="email" placeholder="Email" onChange={registerInpHandler} />
            <input type="text" name="password" placeholder="Password" onChange={registerInpHandler} />
            <input type="file" name="pic" placeholder="Pic" onChange={registerInpHandler} />
            <button onClick={() => {postRegisterData()}}>Register</button>
        </>
    )
};

export default Register;