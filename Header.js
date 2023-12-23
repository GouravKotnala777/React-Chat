import { NavLink } from "react-router-dom";
import header_logo from "../../header_logo.png";
import styled from "styled-components";
const Header = () => {

    return(
        <HeaderBackground>
            <div className="logo_cont">
                <img src={header_logo} alt="header_logo.png" />
            </div>
            <div className="navlinks_cont">
                <NavLink to="/chat" className="page2_navlink navlink">Chat</NavLink>
                <NavLink to="/register" className="page2_navlink navlink">Register</NavLink>
                <NavLink to="/login" className="page2_navlink navlink">Login</NavLink>
                <NavLink to="/" className="page2_navlink navlink">Join</NavLink>
            </div>
        </HeaderBackground>
    )
}

export default Header;

const HeaderBackground = styled.section`
    display:flex;
    height:5rem;
    background:linear-gradient(90deg, rgb(255, 49, 83), rgb(255, 118, 59));

    .logo_cont{
        // border:2px solid blue;
        width:6%;
    }
        img {
            // border:2px solid blue;
            width:97%;
            border-radius:3rem;
        }
    .navlinks_cont{
        // border:2px solid blue;
        width:94%;
        display:flex;
        align-items:center;
        justify-content:right;
    }
        .navlinks_cont .navlink{
            // float:right;
        }
    .page1_navlink{
        font-size:1.5rem;
        // border:2px solid blue;
        border-radius:1rem;
        padding:0.4rem;
        margin:1rem;
        cursor:pointer;
        text-decoration:none;
    }
    .page1_navlink:active{
        background:rgb(255, 228, 177);
    }
    .page2_navlink{
        font-size:1rem;
        font-weight:bold;
        // border:2px solid blue;
        color:white;
        margin-left:2%;
        cursor:pointer;
        text-decoration:none;
        padding:0.2rem;
    }
    .page2_navlink:active{
        background:rgb(255, 228, 177);
    }
    .page2_navlink:hover{
        border-bottom:2px solid white;
    }
`;