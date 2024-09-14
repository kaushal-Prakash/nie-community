import { Client, Account, OAuthProvider } from "appwrite";
import config from "../config/config";
import { useNavigate } from "react-router-dom";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject(config.appwriteProjectId);                

const account = new Account(client);
const navigate = useNavigate();
account.createOAuth2Session(
    OAuthProvider.Google, 
    navigate("/"),
    navigate("/login"), 
);
