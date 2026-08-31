import {
    Db,
    MongoClient,
    Collection,
    ObjectId,
} from "mongodb";

export type TodoDocument = {
    _id?: ObjectId;
    title: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    createdAt: Date;
    updatedAt: Date;
};

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error(
        "MONGODB_URI environment variable is not defined"
    );
}

let client: MongoClient | undefined;
let db: Db | undefined;

export async function connecToDatabase() {
    if (!client) {
        client = new MongoClient(uri);

        await client.connect();

        db = client.db("todo_app");

        console.log("MongoDB connected successfully");
    }

    return {
        client,
        db: db!,
    };
}

export async function getTodoCollection(): Promise<
    Collection<TodoDocument>
> {
    const { db } = await connecToDatabase();

    return db.collection<TodoDocument>("todos");
}