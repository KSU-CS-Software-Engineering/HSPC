import authService from '../services/auth';

class AdminAuthGuard {
    shouldRoute() {
        return new Promise((resolve, reject) => {
            authService.isAuthenticated()
                .then((success) => {
                    if (authService.authenticatedUser.accesslevel !== '3') success = false;
                    resolve(success);
                })
                .catch((err) => {
                    resolve(false);
                });
        });
    }
}

export default new AdminAuthGuard();