import styled from "styled-components";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

const SubHeader = () => {
    const [sideBarPosition, setSideBarPosition] = useState("side_bar_hide");
    const [userSearchInp, setUserSearchInp] = useState("");
    const [userPreview, setUserPreview] = useState([]);

    const searchUserByEmail = async() => {
        const res = await fetch(`/allUsers`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userId:userSearchInp})
        });

        const data = await res.json();

        console.log("--------- Search User");
        setUserPreview(data.message2);
        console.log(data)
        console.log("--------- Search User");

    };

    useEffect(() => {
        searchUserByEmail();
    }, [userSearchInp]);

    return(
        <SubHeaderBackground>
            {/* <pre>{JSON.stringify(userPreview, null, `\t`)}</pre> */}
            <div className={sideBarPosition !== "side_bar_hide" ? "active main_cont" : "darkk main_cont"}>
                {/* <SideBar /> */}
                <div className={`side_bar ${sideBarPosition}`}>
                    <div className="heading_and_cancel_btn">
                        <div>SideBar</div>
                        <button onClick={() => {setSideBarPosition("side_bar_hide"); setUserSearchInp(""); document.getElementById("email").value = "";}}>X</button>
                    </div>
                    <input type="text" id="email" name="email" placeholder="Search My Email" onChange={(e) => setUserSearchInp(e.target.value)} />
                    <button>Search</button>
                    <div className="user_preview_list">
                        {
                            userPreview.map((item, index) => {
                                return(
                                    <div className="user_preview" key={index}>
                                        <h4>{item.name}</h4>
                                        <div>Email : {item.email}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <button className="side_bar_toggle_btn" onClick={() => setSideBarPosition("side_bar_show")}>Search User</button>
                <h2>Heading</h2>
                <div className="bell_and_my_profile_cont">
                    <div className="bell_icon_cont">Icon</div>
                    <div className="my_profile_cont">Profile</div>
                </div>
            </div>
        </SubHeaderBackground>
    )
};

export default SubHeader;

const SubHeaderBackground = styled.section`
    // background:red;
    // display:flex;
    // justify-content:space-between;
    // align-items:center;
    // margin:1rem;
    
    .darkk{
        background: gray;
    }
    
    .main_cont{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin:1rem;
        width:100%;
    }

    .side_bar{
        border:2px solid black;
        width:25.6%;
        position:absolute;
        top:14%;
        height:85.8%;
        background:white;
        transition:0.3s;
    }
    .side_bar_show{
        left:0%;
    }
    .side_bar_hide{
        left:-26%;
    }

    .heading_and_cancel_btn{
        display:flex;
        justify-content:space-between;
    }
        .heading_and_cancel_btn div{
            margin:0.5rem 0 0.5rem 0.5rem;
        }
        .heading_and_cancel_btn button{
            padding:4px 7px;
            margin:0.5rem 0.5rem 0.5rem 0;
            border-radius:1rem;
            outline:none;
            border:1px solid red;
            color:red;
            background:white;
            cursor:pointer;
        }
        .heading_and_cancel_btn button:hover{
            color:white;
            background:red;
        }


    .side_bar_toggle_btn{
        cursor:pointer;
        margin: 0 0 0 0.5rem;
    }
    .user_preview_list{
        border:2px solid green;
    }
        .user_preview_list .user_preview{
            margin:2px;
            border-radius:1rem;
            padding:0 1rem;
            font-size:13px;
            background:rgb(230, 230, 230);
        }
            .user_preview_list .user_preview h4{
                color:red;
            }


    h2{
        border:2px solid blue
    }
    .bell_and_my_profile_cont{
        border:2px solid violet;
        display:flex;
        margin: 0 0.5rem 0 0;
    }
        .bell_icon_cont{
            border:2px solid green;
            margin-right:1rem;
        }
        .my_profile_cont{
            border:2px solid yellow;
        }
`;