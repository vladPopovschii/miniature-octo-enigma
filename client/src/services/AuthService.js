import axios from "axios";
import authHeader from "./DataService";
import { KEYS } from "../KEYS";

const URL = KEYS.API_URL;

class AuthService {
    async login(email, password) {
        try {
            const result = await axios.post(`${URL}login`, {
                email,
                password,
            });
            const data = result.data;
            if (data.error) {
                return data;
            }
            localStorage.setItem(
                KEYS.LOCAL_STORAGE_TOKEN,
                JSON.stringify(data.token)
            );
            localStorage.setItem(
                KEYS.LOCAL_STORAGE_REFRESH_TOKEN,
                JSON.stringify(data.refreshToken)
            );
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async logout() {
        try {
            const token = JSON.parse(
                localStorage.getItem(KEYS.LOCAL_STORAGE_REFRESH_TOKEN)
            );
            localStorage.removeItem(KEYS.LOCAL_STORAGE_REFRESH_TOKEN);
            localStorage.removeItem(KEYS.LOCAL_STORAGE_TOKEN);

            axios.delete(`${URL}logout`, {
                token,
            });
        } catch (error) {}
    }
    async register(username, email, password, confirmPassword) {
        return axios
            .post(`${URL}register`, {
                username,
                email,
                password,
                confirmPassword,
            })
            .then((result) => {
                const data = result.data;
                return data;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    async getCurrentUser() {
        try {
            const data = await axios.get(`${URL}users/user`, {
                headers: authHeader(),
            });
            return data.data.user;
        } catch (error) {
            const refreshToken = JSON.parse(
                localStorage.getItem(KEYS.LOCAL_STORAGE_REFRESH_TOKEN)
            );
            console.log(refreshToken);
            if (!refreshToken) return null;
            try {
                const token = await axios.post(`${URL}login/token`, {
                    refreshToken,
                });
                if (!token) return null;
                localStorage.setItem(KEYS.LOCAL_STORAGE_TOKEN, token);
                const data = await axios.get(`${URL}users/user`, {
                    headers: authHeader(),
                });
                return data.data.user;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    }
    async token() {
        const token = JSON.parse(
            localStorage.getItem(KEYS.LOCAL_STORAGE_USER_KEY)
        ).refreshToken;
        return axios
            .post(`${URL}/login/token`, { token })
            .then((data) => console.log(data.data.token))
            .catch((error) => console.error);
    }
}

export default new AuthService();
