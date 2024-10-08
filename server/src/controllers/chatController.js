import MessageModel from "../models/MessageModel.js";

const messageSearch = async (req, res) => {
  const room = encodeURIComponent(req.query.room);

  try {
    // console.log(room);
    const chatFindDoc = await MessageModel.find({ room });
    // console.log(chatFindDoc);
    res.status(200).json({ message: chatFindDoc });
  }

  catch (err) {
    res.status(500).json({ message: "Not found", err: err });
  }
}

export { messageSearch };