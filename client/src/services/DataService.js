import { KEYS } from "../KEYS";
import AuthService from "./AuthService";

export default function authHeader() {
    const token = JSON.parse(localStorage.getItem(KEYS.LOCAL_STORAGE_TOKEN));
    // console.log(token);
    if (token) {
        return { Authorization: "Bearer " + token };
    }
    return null;
}
