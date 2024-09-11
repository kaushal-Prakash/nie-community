import config from '../config/config';
import { Client, ID, Databases, Query } from "appwrite";

export class DbService{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createPost(title,link,content,status,userId){
        try{
            return await this.databases.createDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    link,
                    content,
                    userId,
                }
            )
        }
        catch(err){
            console.log("Create post error",err);
        }
    }

    async updatePost(slug,{title,link,content,status,userId}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    link,
                    content,
                    status,
                }
            )
        } catch (error) {
            console.log("update error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                slug,
            )
            return false;
        } catch (error) {
            console.log("Delete error",err);
            return true;
        }
    }

    async getPost(slug){
        try {
            return this.databases.getDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("get post error",err);
            return false;
        }
    }

    async getPosts(){
        try {
            await this.databases.getPosts(
                config.appwriteDBId,
                config.appwriteCollectionId,
                
            )
        } catch (error) {
            console.log("get posts error ",error);
            return false;
        }
    }
}

const dbService = new DbService()
export default dbService
