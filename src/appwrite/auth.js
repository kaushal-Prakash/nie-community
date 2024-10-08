import config from '../config/config';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login(email, password);
            } else {
                return userAccount;
            }
        } catch (err) {
            throw err;
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (err) {
            throw err;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (err) {
            console.log("Login error", err);
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession('current'); // Ensure 'current' session is deleted
        } catch (err) {
            console.log("Logout error", err);
            throw err; // Re-throw the error for further handling
        }
    }
}

const authService = new AuthService();

export default authService;
