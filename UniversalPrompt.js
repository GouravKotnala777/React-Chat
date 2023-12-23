import { useEffect, useState } from "react";
import styled from "styled-components";

const UnivarsalPrompt = (prompt) => {
    const [searchEmailPreview, setSearchEmailPreview] = useState("");
    const [searchIdPreview, setSearchIdPreview] = useState("");
    const [promptValue, setPromptValue] = useState({});
    const [searchedEmailTag, setSearchedEmailTag] = useState([]);
    const [searchedIdTag, setSearchedIdTag] = useState([]);
    const promptInpHandler = (e) => {
        setPromptValue({...promptValue, [e.target.name]:e.target.value});
        console.log(promptValue.chat_name_inp);
    };

    const findUser = async() => {
        const res = await fetch(prompt.chatOptions, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:promptValue.chat_name_inp})
        });

        const data = await res.json();

        console.log("--------- Universal Prompt");
        console.log(data);
        console.log("--------- Universal Prompt");
    };

    const updateMyChatName = async() => {
        if (prompt.chatOptions === "/chat/chatName/update") {
            const res = await fetch(prompt.chatOptions, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({chatId:prompt.chatId, chatName:promptValue.chat_name_inp})
            });
    
            const data = await res.json();
            console.log("--------- Universal Prompt");
            console.log(data);
            console.log("--------- Universal Prompt");
    
            prompt.promptActivator(false);
            prompt.activator();
            
        }
        if (prompt.chatOptions === "/chat/members/delete") {
            const res = await fetch("/mymember", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email:promptValue.chat_name_inp, chatId:prompt.chatId})
            });
    
            const data = await res.json();
    
            
            if (data.message !== "email is required" && data.message !== "user not found" ) {
                console.log("--------- Universal Prompt");
                console.log(data);
                console.log(searchedEmailTag);
                setSearchEmailPreview(data.message);
                setSearchIdPreview(data.message2);
                console.log(searchedEmailTag);
                console.log("--------- Universal Prompt");
            }
            else if (data.message === "No member found with this email id"){
                setSearchEmailPreview("No member found with this email id");
                setSearchIdPreview("No member found with this email id");
            }
            else{
                setSearchEmailPreview("");
                setSearchIdPreview("");
            }
            
        }
        if (prompt.chatOptions === "/chat/members/add") {
            const res = await fetch("/user", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email:promptValue.chat_name_inp, chatId:prompt.chatId})
            });
    
            const data = await res.json();
    
            
            if (data.message !== "email is required" && data.message !== "user not found" ) {
                console.log("--------- Universal Prompt");
                console.log(data);
                console.log(searchedEmailTag);
                setSearchEmailPreview(data.message);
                setSearchIdPreview(data.message2);
                console.log(searchedEmailTag);
                console.log("--------- Universal Prompt");
            }
            else{
                setSearchEmailPreview("");
                setSearchIdPreview("");
            }
            
        }
        // if (prompt.chatOptions === "/chat/:chatId") {
            
            
        // }


    }

    const updateAddMyChatMember = async() => {
        const res = await fetch("/chat/members/add", {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({chatId:prompt.chatId, allMembersId:searchedIdTag})
        });

        const data = await res.json();

        console.log("--------- update add members Universal Prompt");
        console.log(data);
        console.log("--------- update add members Universal Prompt");
    };
    const updateDeleteMyChatMember = async() => {
        const res = await fetch("/chat/members/delete", {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({chatId:prompt.chatId, allMembersId:searchedIdTag})
        });

        const data = await res.json();

        console.log("--------- update delete members Universal Prompt");
        console.log(data);
        console.log("--------- update delete members Universal Prompt");

    };
    const deleteMyChat = async() => {
        const res = await fetch(`/chat/${prompt.chatId}`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({chatId:prompt.chatId})
        });

        const data = await res.json();

        console.log("------- Delete Chat");
        console.log(data);
        console.log("------- Delete Chat");

    };

    const addEmailPreviewData = () => {

        let findResultForSearchedEmailTag = searchedEmailTag.find(item => item === searchEmailPreview);
        console.log({findResultForSearchedEmailTag});
        if (!findResultForSearchedEmailTag) {
            setSearchedEmailTag([...searchedEmailTag, searchEmailPreview]);
            setSearchedIdTag([...searchedIdTag, searchIdPreview]);
        }
        else{
            let filterResultForSearchedEmailTag = searchedEmailTag.filter(item => item !== searchEmailPreview);
            setSearchedEmailTag([...filterResultForSearchedEmailTag]);
        }
        console.log("ffffffffff");
    };

    useEffect(() => {
        if (prompt.chatOptions !== "/chat/chatName/update") {
            if (searchedEmailTag !== "email is required" || searchedEmailTag !== "user not found" ) {
                updateMyChatName();
            }
        }
    }, [promptValue]);

    return(
        prompt.trigger
        ?
        <UnivarsalPromptBackground>
            <button className="cancel_btn" onClick={() => {prompt.promptActivator(false); setSearchedEmailTag([]); setSearchedIdTag([]); setSearchEmailPreview(""); setSearchIdPreview("");}}>X</button>
            <h4>Change Chat Name</h4>


            <input className="chat_name_inp" name="chat_name_inp" onChange={promptInpHandler} placeholder="New Chat Name" />

            <div className="email_tag_cont">
                {
                    searchedEmailTag.map((item, index) => {
                        return(
                            <div className="email_tag" key={index}>
                                {item}
                            </div>
                        )
                    })
                }
            </div>
            {
                searchEmailPreview !== "No member found with this email id" ? 
                    <div className="search_email_preview" onClick={() => {addEmailPreviewData()}}>{searchEmailPreview}</div>
                    :
                    <div className="search_email_preview">{searchEmailPreview}</div>
            }

            {
                prompt.chatOptions === "/chat/chatName/update"?
                <button className="update_btn" onClick={() => {updateMyChatName()}}>Submit</button>
                :
                ""
            }
            {
                prompt.chatOptions === "/chat/members/add"?
                <button className="update_btn" onClick={() => {updateAddMyChatMember()}}>Submit</button>
                :
                ""
            }
            {
                prompt.chatOptions === "/chat/members/delete"?
                <button className="update_btn" onClick={() => {updateDeleteMyChatMember()}}>Submit</button>
                :
                ""
            }
            {
                prompt.chatOptions === "/chat/:chatId"?
                <button className="update_btn" onClick={() => {deleteMyChat()}}>Delete</button>
                :
                ""
            }
        </UnivarsalPromptBackground>
        :
        ""
    )
};
export default UnivarsalPrompt;

const UnivarsalPromptBackground = styled.section`
    border:2px solid red;
    width:40%;
    height: 50vh;
    position:absolute;
    top:50%;
    left:50%;
    translate: -50% -50%;
    border-radius:1rem;
    text-align:center;
    background:white;

    .chat_name_inp{
        width:90%;
        padding:0.5rem;
        border:none;
        outline:none;
        cursor:pointer;
        margin-top:10%;
        background:gainsboro;
        border-radius:1rem;
    }
    .search_email_preview{
        border:2px solid green;
        cursor:pointer;
    }
    .chat_name_inp:focus{
        outline:1.5px solid red;
        background:white;
    }
    .email_tag_cont{
        // border:2px solid blue;
    }
    .email_tag{
        // border:2px solid red;
        padding:2px;
        margin:2px;
        background:gainsboro;
        border-radius:3px;
        width:min-content;
        font-size:8px;
        display:inline-block;
    }
    .update_btn{
        width:90%;
        padding:0.5rem;
        border:2px solid red;
        border-radius:1rem;
        outline:none;
        background:none;
        cursor:pointer;
        margin-top:10%;
        color:red;
    }
    .update_btn:hover{
        outline:1.5px solid red;
        border-radius:1rem;
        background:red;
        color:white;
    }
    .cancel_btn{
        width:max-content;
        padding:0.2rem 0.4rem;
        border-radius:0.8rem;
        border:1.5px solid red;
        color:red;
        position:absolute;
        top:0.5rem;
        right:0.5rem;
        background:white;
        cursor:pointer;
    }
    .cancel_btn:hover{
        outline:1.5px solid red;
        border-radius:1rem;
        background:red;
        color:white;
    }



`;