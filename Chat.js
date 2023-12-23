import { useEffect, useState } from "react";
import {user} from "./Join";
import styled from "styled-components";
import Message from "./Message";
// import socketIO from "socket.io-client";

// const ENDPOINT = "http://localhost:8000";
let socket;
const Chat = () => {
    // socket = socketIO(ENDPOINT, {transports:["websocket"]});
    // const [messageData, setMessageData] = useState([]);
    // const [id, setId] = useState("");

    const sendMessage = () => {
        let messageInpData = document.getElementById("chat_inp").value;
        // socket.emit("message", {message:messageInpData, id});
        document.getElementById("chat_inp").value = "";
    };

    
    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log({connect:{id:socket.id}});
    //         setId(socket.id);
    //         // alert("connected from Client Side Chat");
    //     });
    //     socket.emit("joined", {user});
    //     socket.on("welcome", (data) => {
    //         // console.log({wellcomeOne:data});
    //         // console.log({messageDataOne:messageData});
    //         setMessageData([...messageData, data]);
    //     });
    //     socket.on("welcomeall", (data) => {
    //         // console.log({wellcomeAll:data});
    //         // console.log({messageDataAll:messageData});
    //         setMessageData([...messageData, data]);
    //     });
    //     socket.on("disconnect_broadcast", (data) => {
    //         // console.log({disconnect_broadcast:data});
    //         setMessageData([...messageData, data]);
    //     });

    //     return () => {
    //         // socket.emit("disconnect");
    //         socket.off();
    //     }
    // }, []);

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
        <ChatBackground>
            <div className="chat_cont">
                <div className="heading_cont">
                    <h1>Hello From Chat</h1>
                    {/* <pre>{JSON.stringify(messageData, null, `\t`)}</pre> */}
                </div>

                <div className="chat_box">
                    {/* {messageData.map((item, index) => {
                        return(
                            <Message key={index} user={item.id === id ? "" : item.user} message={item.message} classs={item.id === id ? "right" : "left"} />
                        )
                    })} */}
                </div>

                <div className="chat_inp_cont">
                    <input type="text" id="chat_inp" />
                    <button onClick={() => {sendMessage()}}>Send</button>
                </div>
            </div>
        </ChatBackground>
    )
};

export default Chat;

const ChatBackground = styled.section`
    border:2px solid violet;
    
    .chat_cont{
        display:flex;
        flex-direction:column;
        border:2px solid indigo;
        width:80%;
        margin:10% 0 0 10%;
    }
        .chat_cont .heading_cont{
            border:2px solid blue;
        }
        .chat_cont .chat_box{
            border:2px solid green;
        }
        .chat_cont .chat_inp_cont{
            border:2px solid yellow;
        }
`;