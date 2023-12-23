import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const SingleChat = () => {
    const {chatId} = useParams();
    const [chat, seChat] = useState({
        success: false,
        message: [
          {
            _id: "no data",
            chatName: "no data",
            isGroupChat: true,
            users: [],
            latestMessage: "no data",
            groupAdmin: "no data"
          }]});

    // const findSingleChat = async() => {
    //     const res = await fetch(`/chat/${chatId}`, {
    //         method:"POST",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({chatId})
    //     });

    //     const data = await res.json();

    //     console.log("-------- Single Chat");
    //     seChat(data);
    //     console.log(data);
    //     console.log("-------- Single Chat");
    // };

    // useEffect(() => {
    //     findSingleChat();
    // }, []);

    return(
        <SingleChatBackground>
            <div className="chat_cont">
                {/* <pre>{JSON.stringify(chat, null, `\t`)}</pre> */}
                {
                    chat.message.map((item, index) => {
                        return(
                            <h5 key={index}>{item.content}</h5>
                        )
                    })
                }
                
            </div>
        </SingleChatBackground>
    )
};

export default SingleChat;

const SingleChatBackground = styled.section`

    .chat_cont{
        border:2px solid red;
        cursor:pointer;
        margin:2rem;
        width:30%;
    }
    button{
        width:10%;
        font-size:2rem;
        background:none;
        outline:none;
        border:none;
        cursor:pointer;
    }
    .option_tag{
        background:yellow;
        width:max-content;
    }
    .option_tag_hide{
        display:none;
    }
    .option_tag_show{
        display:inline-block;
    }
    button:hover{
        color:red;
    }

`;