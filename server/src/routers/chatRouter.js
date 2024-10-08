import { Router } from "express";
import { messageSearch } from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.get("/messagesearch", messageSearch);

export default chatRouter;