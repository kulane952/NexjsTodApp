export type Priority = "low" | "medium" | "high";

export type Todo = {
    _id: string;
    title: string;
    completed: boolean;
    priority: Priority;
    createdAt: string;
    updatedAt?: string;
};

export type CreateTodoInput = {
    title: string;
    completed: boolean;
    priority: Priority;
};

export type UpdateTodoInput = {
    title?: string;
    completed?: boolean;
    priority?: Priority;
};