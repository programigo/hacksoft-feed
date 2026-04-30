import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let app: any;
let mongod: MongoMemoryServer;
let token: string;

describe("API integration (users)", () => {
    beforeAll(async () => {
        // Spin up in-memory Mongo
        mongod = await MongoMemoryServer.create();

        // IMPORTANT: env.ts throws if these are missing, so set them before importing app/db
        process.env.PORT = "5001";
        process.env.MONGO_URI = mongod.getUri();
        process.env.JWT_SECRET = "test_jwt_secret";
        process.env.CLOUD_NAME = "test";
        process.env.CLOUDINARY_API_KEY = "test";
        process.env.CLOUDINARY_API_SECRET = "test";

        // Import after env variables are set
        const appModule = await import("../app.ts");
        app = appModule.default;

        const dbModule = await import("../config/db.ts");
        await dbModule.connectDB();
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongod.stop();
    });

    it("signup -> returns token, and /me works with auth", async () => {
        const signupRes = await request(app)
            .post("/api/users/signup")
            // signup uses multer (multipart/form-data), so send fields like this:
            .field("username", "testuser123")
            .field("password", "testpassword123")
            .field("email", "testuser123@example.com")
            .field("firstName", "Test")
            .field("lastName", "User")
            .field("jobTitle", "Engineer");

        expect(signupRes.status).toBe(200);
        expect(signupRes.body).toHaveProperty("token");
        token = signupRes.body.token;

        const meRes = await request(app)
            .get("/api/users/me")
            .set("Authorization", `Bearer ${token}`);

        expect(meRes.status).toBe(200);
        expect(meRes.body.username).toBe("testuser123");
    });

    it("GET /api/users/me without token -> 401", async () => {
        const res = await request(app).get("/api/users/me");

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("No authorization token exists");
    });

    it("GET /api/posts as guest -> 200, empty list initially", async () => {
        const res = await request(app).get("/api/posts?page=1&limit=5");

        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({ posts: [], total: 0 });
    });

    let createdPostId: string;

    it("POST /api/posts with auth -> 201 creates post", async () => {
        const res = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                text: "This is a test post with at least thirty characters.",
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("text");
        createdPostId = res.body._id;
    });

    it("GET /api/posts after creation -> total >= 1", async () => {
        const res = await request(app).get("/api/posts");

        expect(res.status).toBe(200);
        expect(res.body.total).toBeGreaterThanOrEqual(1);
    });

    it("GET /api/posts as authenticated user -> created post has hasLiked=false", async () => {
        const res = await request(app)
            .get("/api/posts?page=1&limit=5")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);

        const createdPost = res.body.posts.find((p: any) => p._id === createdPostId);
        expect(createdPost).toBeTruthy();
        expect(createdPost.hasLiked).toBe(false);
    });

    it("POST /api/posts/:id/like as authenticated user returns 200 and likes increment", async () => {
        const res = await request(app)
            .post(`/api/posts/${createdPostId}/like`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Post liked successfully");
        expect(res.body).toHaveProperty("likes", 1);
    });

    it("POST /api/posts/:id/like second time returns 404 and error message", async () => {
        const res = await request(app)
            .post(`/api/posts/${createdPostId}/like`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("You already liked this post or post is not found");
    });

    it("POST /api/posts/:id/unlike as authenticated user returns 200 and likes decrement", async () => {
        const res = await request(app)
            .post(`/api/posts/${createdPostId}/unlike`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Post unliked successfully");
        expect(res.body).toHaveProperty("likes", 0);
    });

    it("POST /api/posts/:id/unlike second time returns 404 and error message", async () => {
        const res = await request(app)
            .post(`/api/posts/${createdPostId}/unlike`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("You haven't liked this post or post is not found");
    });

    it("POST /api/posts without token returns 401", async () => {
        const res = await request(app)
            .post("/api/posts")
            .send({ text: "This is a valid post text with at least thirty characters." });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message", "No authorization token exists");
    });

    it("POST /api/posts with short text returns 500 (mongoose validation)", async () => {
        const res = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({ text: "Some short text" });

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty("message");
    });

    let token2: string;

    it("create a second user (token2)", async () => {
        const res = await request(app)
            .post("/api/users/signup")
            .field("username", "testuser456")
            .field("password", "testpassword456")
            .field("email", "testuser456@example.com")
            .field("firstName", "Test")
            .field("lastName", "User2")
            .field("jobTitle", "Engineer");

        expect(res.status).toBe(200);
        token2 = res.body.token;
        expect(token2).toBeTruthy();
    });

    it("PUT /api/posts/:id by non-owner returns 401", async () => {
        const res = await request(app)
            .put(`/api/posts/${createdPostId}`)
            .set("Authorization", `Bearer ${token2}`)
            .send({ text: "This is an updated post text with at least thirty characters." });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty(
            "message",
            "You do not have permissions to update that post"
        );
    });

    it("DELETE /api/posts/:id by non-owner returns 401", async () => {
        const res = await request(app)
            .delete(`/api/posts/${createdPostId}`)
            .set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty(
            "message",
            "You do not have permissions to delete that post"
        );
    });
});