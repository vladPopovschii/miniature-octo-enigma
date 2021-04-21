import axios from "axios";
import { KEYS } from "../KEYS";
import authHeader from "./DataService";
import FormData from "form-data";

const URL = KEYS.API_URL;

class PostsService {
    async getAllPosts(username) {
        try {
            const data = await axios.get(`${URL}posts`, {
                headers: authHeader(),
            });
            return data.data;
        } catch (error) {
            return console.log(error);
        }
    }
    async makePost(title, content, description) {
        try {
            const data = await axios.post(
                `${URL}posts`,
                {
                    title,
                    content,
                    description,
                },
                {
                    headers: authHeader(),
                }
            );
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new PostsService();
