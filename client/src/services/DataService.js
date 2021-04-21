import { KEYS } from "../KEYS";

export default function authHeader(history) {
    const token = JSON.parse(localStorage.getItem(KEYS.LOCAL_STORAGE_TOKEN));
    if (token) {
        return { Authorization: "Bearer " + token };
    }
    return null;
}
