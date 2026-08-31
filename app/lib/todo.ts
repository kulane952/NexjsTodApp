import { ObjectId } from "mongodb";
import {
    Todo,
    CreateTodoInput,
    UpdateTodoInput,
} from "../types/todo";
import { getTodoCollection } from "./db";

export async function fetchTodos(): Promise<Todo[]> {
    try {
        const collection = await getTodoCollection();

        const todos = await collection.find().toArray();

        return todos
            .map((todo) => ({
                _id: todo._id!.toString(),
                title: todo.title,
                completed: todo.completed,
                priority: todo.priority,
                createdAt:
                    todo.createdAt?.toISOString() ??
                    new Date().toISOString(),
                updatedAt:
                    todo.updatedAt?.toISOString(),
            }))
            .sort((a, b) => {
                const priorityOrder = {
                    high: 1,
                    medium: 2,
                    low: 3,
                };

                return (
                    priorityOrder[a.priority] -
                    priorityOrder[b.priority]
                );
            });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
}

export async function fetchTodoById(
    id: string
): Promise<Todo | null> {
    try {
        if (!ObjectId.isValid(id)) {
            return null;
        }

        const collection = await getTodoCollection();

        const todo = await collection.findOne({
            _id: new ObjectId(id),
        });

        if (!todo) {
            return null;
        }

        return {
            _id: todo._id!.toString(),
            title: todo.title,
            completed: todo.completed,
            priority: todo.priority,
            createdAt:
                todo.createdAt?.toISOString() ??
                new Date().toISOString(),
            updatedAt:
                todo.updatedAt?.toISOString(),
        };
    } catch (error) {
        console.error(
            "Error fetching todo by id:",
            error
        );

        return null;
    }
}

export async function createTodo(
    todo: CreateTodoInput
): Promise<string | null> {
    try {
        const collection = await getTodoCollection();

        const now = new Date();

        const result = await collection.insertOne({
            title: todo.title,
            completed: todo.completed,
            priority: todo.priority,
            createdAt: now,
            updatedAt: now,
        });

        return result.insertedId.toString();
    } catch (error) {
        console.error(
            "ERROR CREATING TODO:",
            error
        );

        return null;
    }
}

export async function updateTodo(
    id: string,
    todo: UpdateTodoInput
): Promise<boolean> {
    try {
        if (!ObjectId.isValid(id)) {
            return false;
        }

        const collection = await getTodoCollection();

        const result = await collection.updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: {
                    ...todo,
                    updatedAt: new Date(),
                },
            }
        );

        return result.matchedCount > 0;
    } catch (error) {
        console.error(
            "Error updating todo:",
            error
        );

        return false;
    }
}

export async function deleteTodoFromDB(
    id: string
): Promise<boolean> {
    try {
        if (!ObjectId.isValid(id)) {
            return false;
        }

        const collection = await getTodoCollection();

        const result = await collection.deleteOne({
            _id: new ObjectId(id),
        });

        return result.deletedCount > 0;
    } catch (error) {
        console.error(
            "Error deleting todo:",
            error
        );

        return false;
    }
}

export async function searchTodos(
    search: string = "",
    status: "all" | "active" | "completed" = "all"
): Promise<Todo[]> {
    try {
        const collection = await getTodoCollection();

        const query: any = {};

        // Search by title
        if (search.trim()) {
            query.title = {
                $regex: search.trim(),
                $options: "i",
            };
        }

        // Filter by completion
        if (status === "active") {
            query.completed = false;
        }

        if (status === "completed") {
            query.completed = true;
        }

        const todos = await collection
            .find(query)
            .toArray();

        return todos
            .map((todo) => ({
                _id: todo._id!.toString(),
                title: todo.title,
                completed: todo.completed,
                priority: todo.priority,
                createdAt:
                    todo.createdAt?.toISOString() ??
                    new Date().toISOString(),
                updatedAt:
                    todo.updatedAt?.toISOString(),
            }))
            .sort((a, b) => {
                const priorityOrder = {
                    high: 1,
                    medium: 2,
                    low: 3,
                };

                return (
                    priorityOrder[a.priority] -
                    priorityOrder[b.priority]
                );
            });
    } catch (error) {
        console.error(
            "Error searching todos:",
            error
        );

        return [];
    }
}