import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const NewChat = () => {
    const navigate = useNavigate();
    const [chatName, setChatName] = useState("");

    const newChatInpHandler = (e) => {
        setChatName(e.target.value);
        console.log(chatName);
    };

    const creatingNewChat = async() => {
        const res = await fetch("/chat", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({chatName:chatName})
        });

        const data = await res.json();

        console.log("------- New Chat");
        console.log(data);
        console.log("------- New Chat");
        navigate("/chat");
    };

    return(
        <NewChatBackground>
            <h3>Create New Chat</h3>
            <input type="text" name="chatName" onChange={newChatInpHandler} placeholder="Chat Name" />
            <button onClick={() => {creatingNewChat()}}>Create</button>
        </NewChatBackground>
    )
};


export default NewChat;
const NewChatBackground = styled.section`
    border:2px solid pink;

`;