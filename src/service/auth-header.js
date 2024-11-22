export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.metadata.accessToken) {
        return { Authorization: 'Bearer ' + user.metadata.accessToken };
    } else {
        return {};
    }
}
