import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
} from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool({
    UserPoolId: import.meta.env.VITE_USERPOOLID,
    ClientId: import.meta.env.VITE_CLIENTID
});

export function signIn(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({ Username: username, Pool: userPool });

        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const token = result.getAccessToken().getJwtToken();
                resolve(token);
            },
            onFailure: (err) => {
                reject(err);
            }
        });
    });
}