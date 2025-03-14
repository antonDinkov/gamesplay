export function setUser(data) {
    localStorage.setItem('userToken', data.accessToken);
    localStorage.setItem('userId', data._id);
}

export function getUserToken() {
    return localStorage.getItem('userToken');
}

export function delUserData() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
}