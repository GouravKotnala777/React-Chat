import { useState } from "react";
import { Link } from "react-router-dom";
let user;

const Join = () => {
    const [userName, setUserName] = useState("");
    const sendData = () => {
        user = document.getElementById("join_inp").value;
        document.getElementById("join_inp").value = "";
    };

    return(
        <>
            <div className="join_page">
                <div className="join_container">
                    <h1>Hello From Join</h1>
                    <input type="text" id="join_inp" placeholder="Enter Your Name" onChange={(e) => {setUserName(e.target.value)}} />
                    <Link to="/chat" onClick={(event) => !userName ? event.preventDefault() : null}>
                        <button onClick={() => {sendData()}}>Submit</button>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default Join;
export {user};