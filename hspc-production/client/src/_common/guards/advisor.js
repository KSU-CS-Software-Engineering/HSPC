import authService from '../services/auth';

class AdvisorAuthGuard {
    shouldRoute() {
        return new Promise((resolve, reject) => {
            authService.isAuthenticated()
                .then((success) => {
                    console.log(authService.authenticatedUser);
                    console.log(authService.authenticatedUser.accesslevel);
                    if (authService.authenticatedUser.accesslevel !== '4') success = false;
                    resolve(success);
                })
                .catch((err) => {
                    resolve(false);
                });
        });
    }
}

export default new AdvisorAuthGuard();