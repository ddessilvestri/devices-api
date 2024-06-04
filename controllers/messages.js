
const Message = require('../models/message');

const getChat = async(req,res)=>{
    const myId = req.uid;
    const messagesFrom = req.params.from;
    
    const last30 = await Message.find({
        $or:[
            {from: myId, from: messagesFrom},
            {from: messagesFrom, from: myId}
            
        ]
    })
    .sort({createdAt:'desc'})
    .limit(30)

    res.json({
        ok:true,
        messages:'hey2!',
        myId,
        messagesFrom,
        messages: last30
    })
}

module.exports = {
    getChat
}