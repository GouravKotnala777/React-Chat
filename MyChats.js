import styled from "styled-components";
import SideBar from "./SideBar";
import MyChats from "../MyChats";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const MyChatsContainer = ({myChats, findMyChats}) => {
    



    return(
        <MyChatsContainerBackground>
            <div className="heading_and_new_group">
                <h4>My Chats</h4>
                <NavLink to="/chat/new" className="new_group_btn">+New Group</NavLink>
            </div>
            
            {/* <SideBar /> */}
            <div className="my_chats">
                <MyChats myChats={myChats} findMyChats={findMyChats} />
            </div>
        </MyChatsContainerBackground>
    )
};

export default MyChatsContainer;

const MyChatsContainerBackground = styled.section`
    background:rgb(255, 49, 83);
    width:25%;
    padding:0.5rem;
    margin:0.5rem 0.5rem 1rem 1rem;
    height:60vh;
    display:inline-block;
    border-radius:0.5rem;

    .heading_and_new_group{
        border:2px solid violet;
        display:flex;
        justify-content:space-between;
        background:white;
    }
        h4{
            border:2px solid indigo;

        }
        .new_group_btn{
            border:2px solid blue;
        }
    .my_chats{
        border:2px solid green;
        height:90%;
        font-size:12px;
        background:white;
        overflow:auto;
    }
`;