export default function auth({ next, router }) {
    if (!localStorage.getItem('user')) {
        return router.push({ name: 'login' });
    } else {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const expiredate = new Date(user['ExpireToken']);
            if (expiredate <= new Date()) {
            }
            return next();
        } catch (error) {
            return router.push({ name: 'login' });
        }
    }
}
