import authService from '../services/auth';

class StudentAuthGuard {
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

export default new StudentAuthGuard();