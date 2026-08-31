import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchTodoById } from "../../lib/todo";
import { updateTodoAction } from "../../actions/update";

type EditTodoPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditTodoPage({
    params,
}: EditTodoPageProps) {

    const { id } = await params;

    const todo = await fetchTodoById(id);

    if (!todo) {
        notFound();
    }

    return (
        <main className="max-w-2xl mx-auto mt-10 p-6">
            <div className="bg-white rounded-lg shadow-md p-6">

                <div className="flex items-center justify-between mb-6">

                    <h1 className="text-2xl font-bold text-gray-800">
                        Edit Todo
                    </h1>

                    <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        ← Back to Todos
                    </Link>

                </div>

                <form
                    action={updateTodoAction}
                    className="space-y-4"
                >

                    <input
                        type="hidden"
                        name="id"
                        value={todo._id}
                    />

                    <div>

                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Todo Title
                        </label>

                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={todo.title}
                            placeholder="Enter your todo..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            maxLength={200}
                            autoFocus
                        />
                        <div>
                            <label
                                htmlFor="priority"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Priority
                            </label>

                            <select
                                id="priority"
                                name="priority"
                                defaultValue={todo.priority}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="low">🟢 Low</option>
                                <option value="medium">🟡 Medium</option>
                                <option value="high">🔴 High</option>
                            </select>
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                            Maximum 200 characters
                        </p>

                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">

                        <p className="text-sm text-gray-600">
                            <span className="font-medium">
                                Status:
                            </span>{" "}
                            {todo.completed
                                ? "Completed"
                                : "Pending"}
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">
                                Created:
                            </span>{" "}
                            {new Date(
                                todo.createdAt
                            ).toLocaleDateString()}
                        </p>

                        {todo.updatedAt && (
                            <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">
                                    Last updated:
                                </span>{" "}
                                {new Date(
                                    todo.updatedAt
                                ).toLocaleDateString()}
                            </p>
                        )}

                    </div>

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Update Todo
                        </button>

                        <Link
                            href="/"
                            className="px-4 py-2 border border-gray-300 text-black rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </Link>

                    </div>

                </form>
            </div>
        </main>
    );
}