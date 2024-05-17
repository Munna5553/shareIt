import { config } from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
    client = new Client();
    database;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appwrite)
            .setProject(config.projectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, image, userId }: { title: string, slug: string, content: string, image: string, userId: string }) {
        try {
            return await this.database.createDocument(
                config.databaseId,
                config.collectionId,
                slug,
                { title, content, image, userId }
            );
        } catch (error) {
            console.log("error to create post", error);
        }
    }

    async updatePost(slug: string, { title, content, image }: { title: string, content: string, image: string }) {
        try {
            return await this.database.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                { title, content, image }
            );
        } catch (error) {
            console.log("error in updating post", error);
        }
    }

    async deletePost(slug: string) {
        try {
            await this.database.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug,
            );
            return true;
        } catch (error) {
            console.log("error in deleting post", error);
            return false;
        }
    }

    async getPost(slug: string) {
        try {
            return await this.database.getDocument(
                config.databaseId,
                config.collectionId,
                slug,
            );
        } catch (error) {
            console.log("error in getting post", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(
                config.databaseId,
                config.collectionId,
                queries,
            )
        } catch (error) {
            console.log("error to getting all posts", error);
            return false;
        }
    }

    async uploadFile(file: File) {
        try {
            return await this.bucket.createFile(
                config.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("error uploading the image file", error);
            return false;
        }
    }

    async deleteFile(fileId: string) {
        try {
            return await this.bucket.deleteFile(
                config.bucketId,
                fileId
            )
        } catch (error) {
            console.log("error deleting the image file", error);
            return false;
        }
    }

    getImagePreview(fileId: string) {
        return this.bucket.getFilePreview(
            config.bucketId,
            fileId
        )
    }
}

export const service = new Services();