import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import socketIO from "socket.io-client";

// const ENDPOINT = "http://localhost:8000";
// let socket;

const Messanger = ({chatId, chatMessage, findMyChatMessage}) => {
    let contentSTO;
    const [content, setContent] = useState("");
    // socket = socketIO(ENDPOINT, {transports:["websocket"]});
    // const [id, setId] = useState("");



    const contentInpHandler = (e) => {
        clearTimeout(contentSTO);
        contentSTO = setTimeout(() => {
            setContent(e.target.value);
        }, 300);
    };
    
    
    const sendMessage = async() => {
        if (content.trim() === "") {
            console.log("Empty");
        } 
        else {
            // let messageInpData = document.getElementById("chat_inp").value;
            let contentInpValue = document.getElementById("content");
            // socket.emit("message", {message:contentInpValue.value, id});
            contentInpValue.value = "";
            const res = await fetch(`/chat/message/${chatId}`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({content, chatId})
            });

            const data = await res.json();

            console.log("-------- Send Message");
            // setMessages(data)
            console.log(data);
            console.log("-------- Send Message");
            contentInpValue.value = "";
            setContent("");
        }
    };


    
    

    // useEffect(() => {
    //     socket.on("sendMessageIO", (data) => {
    //         // console.log({sendMessageIO:data});
    //         // console.log({messageDataIO:messageData});
    //         setMessageData([...messageData, data]);
    //     });

    //     return () => {
    //         socket.off();
    //     }
    // }, [messageData]);


















    return(
        <MessangerBackground>
            <div className="message_cont">
                {
                    chatMessage.success === true ?
                    chatMessage.message.map((item, index) => {
                        return(
                            <h5 key={index}>{item.content}</h5>
                        )
                    })
                    :
                    // <pre>{JSON.stringify(chatMessage, null, `\t`)}</pre>
                    <h1>Click on the use to start chatting</h1>

                }
                
            </div>
            <div className="message_inp_and_send_btn">
                <button className="send_btn">++</button>
                <input className="content" id="content" name="content" onChange={(e) => {contentInpHandler(e)}} />
                {
                    content.trim() !== "" ?
                    <button className="send_btn" onClick={() => {sendMessage(); findMyChatMessage();}}>Send</button>
                    :
                    null
                }
            </div>
        </MessangerBackground>
    )
};

export default Messanger;

const MessangerBackground = styled.section`
    background:rgb(255, 49, 83);
    width:75%;
    padding:0.5rem;
    margin:0.5rem 1rem 1rem 0.5rem;
    height:60vh;
    display:inline-block;
    border-radius:0.5rem;
    
    .message_cont{
        border:2px solid black;
        height:84%;
        background:white;
    }
    .content_and_send_btn{
        display:flex;
        justify-content:space-between;
    }
        .content{
            width:80%;
            font-size:1.1rem;
            background:none;
            margin-top:0.5rem;
            padding:0.3rem 1rem;
            outline:none;
            border:2px solid green;
            border-radius:2rem;
            background:white;
        }
        .content:focus{
            border:2px solid rgb(255, 49, 83);
        }
        .send_btn{
            border:2px solid green;
            font-size:1.1rem;
            margin-top:0.5rem;
            // padding:0.3rem;
            border-radius:1rem;
        }
`;