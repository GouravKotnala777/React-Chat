import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Register from "./Register";
import Login from "./Login";
import Join from "./Join";
// import Chat from "./Chat";
import SubHeader from "./components/SubHearder";
import MyChats from "./MyChats";
import Messanger from "./components/Messanger";
import SideBar from "./components/SideBar";
import SingleChat from "./SingleChat";
import MyChatsContainer from "./components/MyChats";
import SubHeaderMyChatsContainerMessangerContainer from "./SubHeaderMyChatsContainerMessangerContainer";
import NewChat from "./NewChat";
import { useEffect, useState } from "react";


function App() {
  // const navigate = useLocation();
  const [myProfile, setMyProfile] = useState({
    success: false,
    message: {
      _id: "6583e643ec9cc4f14891073d",
      name: "no data",
      email: "no data",
      password: "no data",
      pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      chats: [],
      role: "no data"
    }
  });

  const gettingMyProfileData = async() => {
    const res = await fetch("/me", {
      method:"GET",
      heaers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    });

    const data = await res.json();

    console.log("---------MyProfile");
    setMyProfile(data);
    console.log(data);
    console.log("---------MyProfile");


  };

  useEffect(() => {
    gettingMyProfileData();
  }, []);


  return (
    <BrowserRouter>
      <Header />
      {/* <pre>{JSON.stringify(myProfile, null, `\t`)}</pre> */}
      {/* <SideBar /> */}
      {/* <SubHeader /> */}
      <div className="mychats_and_messanger">
        {/* <MyChatsContainer />
        <Messanger /> */}
      </div>
      <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={myProfile.success ? <Join /> : <Login />} />
          <Route path="/chat" element={myProfile.success ? <SubHeaderMyChatsContainerMessangerContainer myProfile={myProfile} /> : <Login />} />
          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route path="/mychats" element={<MyChats />} />
          <Route path="/chat/:chatId" element={<SubHeaderMyChatsContainerMessangerContainer />} />
          {/* <Route path="/chat/:chatId" element={<SingleChat />} /> */}
          <Route path="/chat/new" element={<NewChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
