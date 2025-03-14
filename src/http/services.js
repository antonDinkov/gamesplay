import { setUser } from "./localStorage";

export const post = async (url, method, dataBody) => {
    try {
        const response = await fetch (url, {
            method,
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(dataBody),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
        return data;
    } catch (err) {
        throw err;
    }
};

export const get = async (url) => {
    try {
        const response = await fetch (url);
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = response.json();
        return data;
    } catch (err) {
        throw err;
    }
}