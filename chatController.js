const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.accessChat = async(req, res, next) => {
    const {userId} = req.body;

    if (!userId) {
        return res.json({success:false, message:"userId not sent"})
    }

    console.log("--------------- (1)");
    let isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user.id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    }).populate("users", "-password").populate("latestMessage");
    
    console.log("--------------- (2)");
    isChat = await User.populate(isChat, {
        path:"latestMessage.sender",
        select:"name email pic"
    });
    
    console.log("--------------- (3)");
    
    if (!isChat.length > 0) {
        console.log("--------------- (4)");
        console.log(isChat);
        // res.send(isChat[0]);
        return res.json({success:true, message:isChat[0]});
        
    }
    else{
        console.log("--------------- (5)");
        const chatData = {
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id, userId]
        };
        
        try {
            console.log("--------------- (6)");
            const createChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id:createChat._id}).populate("users", "-password");
            
            res.send(fullChat);
        } catch (error) {
            console.log("--------------- (7)");
            console.log(error);
            return res.json({success:false, message:error});
        }
    }
};

exports.createChat = async(req, res, next) => {
    if (!req.user) {
        return res.json({success:false, message:"login first"});
    }

    if (!req.body.chatName) {
        return res.json({success:false, message:"all fields are required"});
    }

    const newChat = await Chat.create({
        isGroupChat:true,
        users:[
            req.user._id
        ],
        chatName:req.body.chatName,
        latestMessage:req.user._id,
        groupAdmin:req.user._id
    });
    const addChatIdInUser = await User.findById(req.user.id);

    console.log({addChatIdInUser});
    console.log({["newChat._id"]:newChat._id});
    addChatIdInUser.chats.push(newChat._id);

    await addChatIdInUser.save({validateBeforeSave:false});

    console.log(newChat);
    res.json({success:true, message:newChat});
};


exports.findMyChats = async(req, res, next) => {
    const findMyChats = await User.findById(req.user.id).populate("chats");

    // console.log(findMyChats);

    if (!findMyChats) {
        return res.json({success:false, message:"login first"});
    }

    res.json({success:true, message:findMyChats.chats});
};

exports.deleteChat = async(req, res) => {
    try {
        const findChat = await Chat.findById(req.params.chatId);
        const {newAdmin} = req.body;

        if (findChat.groupAdmin.toString() !== req.user.id) {
            return res.json({success:false, message:"Only admin can delete chat"});
        }

        let filterResult = findChat.users.filter(item => item.toString() !== req.user.id);
        console.log(filterResult);

        if (filterResult.length < 1) {
            await findChat.deleteOne();
            return res.json({success:true, message:findChat});
        }

        let findResult = findChat.users.find(item => item.toString() === newAdmin);

        if (!findResult) {
            return res.json({success:false, message:"new admin is not a member in this chat"});
        }
        if (newAdmin === req.user.id) {
            return res.json({success:false, message:"you have to make admin someone else"});
        }

        // findChat.groupAdmin = newAdmin;
        // findChat.users = filterResult;
        // await findChat.save({validateBeforeSave:false});
    
        res.json({success:true, message:findChat});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error})
    }

};

exports.updateChatName = async(req, res, next) => {
    try {
        const findChatAndUpdate = await Chat.findByIdAndUpdate(req.body.chatId, {$set:{chatName:req.body.chatName}}, {new:true});

        if (!findChatAndUpdate) {
            return res.json({success:false, message:"user not found"});
        }
    
        console.log(findChatAndUpdate);
        res.json({success:true, message:findChatAndUpdate});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error})
    }
};

exports.addChatMembers = async(req, res, next) => {
    try {
        let alreadyAddedMembers = [];
        let newAddedMembers = [];
        let allMembersId = req.body.allMembersId;
        const findChat = await Chat.findById(req.body.chatId);
        // const selectedMember = await User.find();
        
        if (!findChat) {
            return res.json({success:false, message:"user not found"});
        }

        if (req.user.id!==findChat.groupAdmin.toString()) {
            return res.json({success:false, message:"only admin can add members"});
        }
        
        allMembersId.forEach((memberId, index) => {
            const findResultForChatMembers = findChat.users.find(item => item.toString() === memberId);
            if (!findResultForChatMembers) {
                console.log("nahi hai", memberId);
                findChat.users.push(memberId);
                newAddedMembers.push(memberId);
            }
            else{
                console.log("pahle se add hai", memberId);
                alreadyAddedMembers.push(memberId);
            }
        });

        
        allMembersId.forEach(async (item) => {
            const selectedMember = await User.findById(item);
            selectedMember.chats.push(req.body.chatId);
            await selectedMember.save({validateBeforeSave:false});
        })

        
        await findChat.save({validateBeforeSave:false});

        res.json({success:true, message:findChat, newAddedMembers, alreadyAddedMembers});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
};

exports.removeChatMembers = async(req, res, next) => {
    try {
        let membersNotFound = [];
        let removedMembers = [];
        let remainingMembers = [];
        let allMembersId = req.body.allMembersId;
        const findChat = await Chat.findById(req.body.chatId);
        
        if (!findChat) {
            return res.json({success:false, message:"user not found"});
        }

        if (req.user.id!==findChat.groupAdmin.toString()) {
            return res.json({success:false, message:"only admin can remove members"});
        }
        let resul = [];
        const reduceResultForChatMembers = findChat.users.forEach(async(memberId) => {
            const findResultForChatMembers = allMembersId.find((item) => item === memberId.toString());
            // const rr = allMembersId.filter(item => item !== memberId.toString());
            console.log(findResultForChatMembers);
            // membersNotFound = rr;
            if (!findResultForChatMembers) {
                // console.log("SAFE :- ", memberId);

                resul.push(memberId);
            }
            else{
                const selectedMember = await User.findById(memberId);
                const findResult2 = selectedMember.chats.find(item => item.toString() === req.body.chatId.toString());
                const filterResult2 = selectedMember.chats.filter(item => item.toString() !== req.body.chatId.toString());
                if (findResult2) {
                    selectedMember.chats = filterResult2;
                    await selectedMember.save({validateBeforeSave:false});
                }
                else{
                    console.log("memberId chat mai nahi hai");
                }
            }
        });
        // console.log(resul);
        
        // await reduceResultForChatMembers;
        // console.log(aa);

        // allMembersId.forEach(async(item1) => {
        //     let dd = findChat.users.find(item2 => item2.toString() === item1);
            
        //     if (dd) {
        //         const selectedMember = await User.findById(dd);
        //         const filterResult2 = selectedMember.chats.filter(item => item.toString() !== req.body.chatId.toString());
        //         // selectedMember.chats.push("657c7e5e917da01800dc7229");
        //         // await selectedMember.save({validateBeforeSave:false});
                
        //         console.log("::::::::::");
        //         console.log(filterResult2);
        //         console.log("::::::::::");
        //         selectedMember.chats = filterResult2;
        //         await selectedMember.save({validateBeforeSave:false});
        //     }
            

        // });
        

        findChat.users = resul;
        await findChat.save({validateBeforeSave:false});

        res.json({success:true, message:findChat, membersNotFound, removedMembers});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
};      // For Admin

exports.removeMeFromChat = async(req, res, next) => {
    const selectedChat = await Chat.findById(req.body.chatId);
    const selectedUser = await User.findById(req.user.id).populate("chats");
    
    const findResult = selectedChat.users.filter(item => item.toString() !== req.user.id);
    const findResult2 = selectedUser.chats.filter(item => item.toString() !== req.body.chatId);
    

    selectedChat.users = findResult;
    selectedUser.chats = findResult2;
    await selectedChat.save({validateBeforeSave:false});
    await selectedUser.save({validateBeforeSave:false});

    res.json({success:true, message:selectedUser.chats});
}

exports.findSingleMyChatMember = async(req, res, next) => {
    if (!req.body.email) {
        return res.json({success:false, message:"email is required"});
    }
    const findUser = await User.findOne({email:req.body.email});
    
    if (!findUser) {
        return res.json({success:false, message:"user not found"});
    }

    const findChatById = await Chat.findById(req.body.chatId);

    if (!findChatById) {
        return res.json({success:false, message:"wrong chatId", message2:"findUser._id"});
    }

    const isUserExistInChat = findChatById.users.find(item => item.toString() === findUser._id.toString());

    if (!isUserExistInChat) {
        return res.json({success:false, message:"No member found with this email id", message2:"findUser._id"});
    }

    res.json({success:true, message:findUser.email, message2:findUser._id});
};