import axios from "axios";
import { KEYS } from "../KEYS";
import authHeader from "./DataService";

const URL = KEYS.API_URL;

class PostsService {
    async getRoom(receiverId) {
        try {
            const data = await axios.get(`${URL}rooms/${receiverId}`, {
                headers: authHeader(),
            });
            return data.data;
        } catch (error) {
            return console.log(error);
        }
    }
}

export default new PostsService();
