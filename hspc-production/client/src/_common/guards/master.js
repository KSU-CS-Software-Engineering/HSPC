import authService from '../services/auth';

class MasterAuthGuard {
    shouldRoute() {
        return new Promise((resolve, reject) => {
            authService.isAuthenticated()
                .then((success) => {
                    console.log(authService.authenticatedUser);
                    if (authService.authenticatedUser.accesslevel !== '6') success = false;
                    resolve(success);
                })
                .catch((err) => {
                    resolve(false);
                });
        });
    }
}

export default new MasterAuthGuard();