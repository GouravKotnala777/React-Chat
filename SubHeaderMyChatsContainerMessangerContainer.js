import styled from "styled-components";
import SubHeader from "./components/SubHearder";
import MyChatsContainer from "./components/MyChats";
import Messanger from "./components/Messanger";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:8000";
let socket;


const SubHeaderMyChatsContainerMessangerContainer = ({myProfile}) => {
    const {chatId} = useParams();
    const [myChats, setMyChats] = useState({
        success: false,
        message: [
          {
            _id: "no data",
            chatName: "no data",
            isGroupChat: false,
            users: [],
            latestMessage: "no data",
            groupAdmin: "no data"
          }]});
    const [chatMessage, setChatMessage] = useState({
        success: false,
        message: [
          {
            _id: "no data",
			sender: "no data",
			content: "no data",
			chat: "no data",
			createdAt: "no data",
			updatedAt: "no data",
          }]});
    socket = socketIO(ENDPOINT, {transports:["websocket"]});
    




    const findMyChatMessage = async() => {
        
        const res = await fetch(`/chat/${chatId}`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({chatId})
        });

        const data = await res.json();

        console.log("-------- Single Chat");
        console.log(data);
        if (data.success) {
            setChatMessage(data);
        }
        console.log(data);
        console.log("-------- Single Chat");




        // socket.on("connect", () => {
            // console.log({connect:socket.id});
            // setId(socket.id);
            // alert("connected from Client Side Chat");
        // });
        socket.emit("joined", {userId:myProfile.message._id, userName:myProfile.message.name});

        socket.on("welcomeall", (data) => {
            console.log(data);
            // setMessageData([...messageData, data]);
        });
        




    };






    const findMyChats = async() => {
        const res = await fetch("/chats", {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data = await res.json();

        console.log("-------- MyChats");
        setMyChats(data);
        console.log(data);
        console.log("-------- MyChats");
    };




    useEffect(() => {
        findMyChats();
    }, []);

    useEffect(() => {
        findMyChatMessage();
    }, [chatId]);



    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log({connect:socket.id});
    //         // setId(socket.id);
    //         // alert("connected from Client Side Chat");
    //     });
    //     socket.emit("joined", {userId:myProfile.message._id, userName:myProfile.message.name});

    //     socket.on("welcomeall", (data) => {
    //         console.log(data);
    //         // setMessageData([...messageData, data]);
    //     });

    //     return () => 
    //     {
    //         // socket.emit("disconnect");
    //         socket.off();
    //     }
    // }, []);







    return(
        <SubHeaderMyChatsContainerMessangerContainerBackground>
            {/* <pre>{JSON.stringify(chatMessage, null, `\t`)}</pre> */}
            <SubHeader />
            <div className="mychats_and_messanger" >
                <MyChatsContainer myChats={myChats} findMyChats={findMyChats} />
                <Messanger chatId={chatId} chatMessage={chatMessage} findMyChatMessage={findMyChatMessage} />
            </div>
        </SubHeaderMyChatsContainerMessangerContainerBackground>
    )
};

export default SubHeaderMyChatsContainerMessangerContainer;

const SubHeaderMyChatsContainerMessangerContainerBackground = styled.section`
    border:2px solid yellow;
`;