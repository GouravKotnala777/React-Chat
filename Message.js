import styled from "styled-components";


const Message = ({user, message, classs}) => {

    if (user) {
        return(
            <MessageBackground>
                <div className={`message_cont ${classs} `}>{`${user}: ${message}`}</div>
            </MessageBackground>
        )
        // if (user !== "default") {
        //     return(
        //         <MessageBackground>
        //             <div className={`message_cont ${classs} `}>{`${user}: ${message}`}</div>
        //         </MessageBackground>
        //     )
        // }
        // else{
        //     return(
        //         <MessageBackground>
        //             <div className={`message_cont ${classs} `}>{`${user}: ${message}`}</div>
        //         </MessageBackground>
        //     )
        // }
        
    }
    else{
        return(
            <MessageBackground>
                <div className={`message_cont ${classs} `}>{`You: ${message}`}</div>
            </MessageBackground>
        )
    }

};

export default Message;

const MessageBackground = styled.section`
    background:gainsboro;
    // display:inline-block;
    // display:block;
    // display:inline;
    width:100%;
    // clear:both;
    float:right;

    .message_cont{
        border:2px solid red;
        width:40%;
        border-radius:1rem;
    }
    .right{
        float:right;
        padding:0.5rem;

    }
    .center{
        width:40%;
        margin:1rem 0 1rem 30%;
        font-size:0.8rem;
        text-align:center;
    }
    .left{
        padding:0.5rem;
        float:left;
    }
`;