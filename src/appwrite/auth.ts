import { config } from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(config.appwrite)
            .setProject(config.projectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }: { email: string, password: string, name: string }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                return this.Login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error: unknown) {
            console.log(error);
        }
    }

    async Login({ email, password }: { email: string, password: string }) {
        try {
            return await this.account.createSession(email, password);
        } catch (error: unknown) {
            console.log("appwrite::login", error);
        }
    }

    async getUser() {
        try {
            return await this.account.get();
        } catch (error: unknown) {
            console.log("appwrite service::getuser", error);
        }
        return null;
    }

    async LogOut() {
        try {
            return await this.account.deleteSessions();
        } catch (error: unknown) {
            console.log("appwrite service::Logout", error);
        }
    }
}

export const authService = new AuthService();