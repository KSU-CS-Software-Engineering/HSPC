import authService from '../services/auth';

class VolunteerAuthGuard {
    shouldRoute() {
        return new Promise((resolve, reject) => {
            authService.isAuthenticated()
                .then((success) => {
                    if (authService.authenticatedUser.accesslevel !== '2') success = false;
                    resolve(success);
                })
                .catch((err) => {
                    resolve(false);
                });
        });
    }
}

export default new VolunteerAuthGuard();