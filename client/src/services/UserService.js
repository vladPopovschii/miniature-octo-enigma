import axios from "axios";
import { KEYS } from "../KEYS";
import authHeader from "./DataService";
import FormData from "form-data";

const URL = KEYS.API_URL;

class UserService {
    async updateUsername(username) {
        try {
            const data = await axios.post(
                `${URL}users/edit`,
                {
                    username,
                },
                {
                    headers: authHeader(),
                }
            );
            return data.data;
        } catch (error) {
            return console.log(error);
        }
    }
    async updateUserAvatar(image) {
        try {
            const formData = new FormData();
            formData.append("avatar", image);
            const result = await axios.post(
                `${URL}users/edit-profile-image`,
                formData,
                {
                    headers: {
                        ...authHeader(),
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return result.data.user;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllUsers() {
        try {
            const data = axios.get(`${URL}users`, {
                headers: authHeader(),
            });
            return (await data).data.users;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserService();
