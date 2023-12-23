import styled from "styled-components";

const SideBar = () => {

    return(
        <SideBarBackground>
            <div>SideBar</div>
            <button>close</button>
        </SideBarBackground>
    )
};

export default SideBar;

const SideBarBackground = styled.section`
    border:2px solid black;
    width:20%;
    position:absolute;
    top:17%;
    // left:-20%;
    height:90%;
`;