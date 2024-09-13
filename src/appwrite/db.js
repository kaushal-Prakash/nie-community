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
                    status,
                }
            )
        }
        catch(err){
            console.log("Create post error",err);
        }
    }

    async updatePost(postId,title,link,content,status){
        try {
            return await this.databases.updateDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                postId,
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

    async getPost(docId){
        try {
            return this.databases.getDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                docId,
            )
        } catch (error) {
            console.log("get post error",err);
            return false;
        }
    }

    async getUserPosts(userId){
        try {
            const postsData = await this.databases.listDocuments(
                config.appwriteDBId,
                config.appwriteCollectionId,
                [Query.equal('userId',[userId])],
            )
            if(postsData){
                return postsData;
            }
            else{
                return null;
            }
        } catch (error) {
            console.log("get posts error ",error);
            return false;
        }
    }

    async getPosts(){
        try {
            const postsData = await this.databases.listDocuments(
                config.appwriteDBId,
                config.appwriteCollectionId,
                [Query.equal('status',[false])],
            )
            if(postsData){
                return postsData;
            }
            else{
                return null;
            }
        } catch (error) {
            console.log("get posts error ",error);
            return false;
        }
    }
}

const dbService = new DbService()
export default dbService
