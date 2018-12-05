import authService from '../services/auth';

class AuthGuard {
    shouldRoute() {
        return new Promise((resolve, reject) => {
            authService.isAuthenticated()
                .then((success) => {
                    resolve(success);
                })
                .catch((err) => {
                    resolve(false);
                });
        });
    }
}

export default new AuthGuard();