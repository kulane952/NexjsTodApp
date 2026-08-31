import Link from "next/link";
import { fetchTodos, searchTodos } from "./lib/todo";
import { toggleTodo } from "./actions/toggle";
import { deleteTodoAction } from "./actions/delete";

type HomeProps = {
    searchParams: Promise<{
        search?: string;
        status?: string;
    }>;
};

export default async function Home({
    searchParams,
}: HomeProps) {

    const params = await searchParams;

    const search = params.search ?? "";

    const status =
        params.status === "active" ||
        params.status === "completed"
            ? params.status
            : "all";

    const todos = await searchTodos(
        search,
        status
    );

    const time = new Date().toLocaleTimeString();

    return (
        <main className="max-w-4xl mx-auto mt-10 p-6">

            <div className="bg-white rounded-lg shadow-md p-6">

                {/* Header */}

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            📝 Todo App
                        </h1>

                        <p className="text-sm text-gray-500">
                            Last updated: {time}
                        </p>
                    </div>

                    <Link
                        href="/new"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        ➕ Add Todo
                    </Link>

                </div>

                {/* SEARCH */}

                <form
                    method="GET"
                    action="/"
                    className="mb-4"
                >

                    <input
                        type="text"
                        name="search"
                        defaultValue={search}
                        placeholder="🔍 Search todos..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Preserve status */}

                    <input
                        type="hidden"
                        name="status"
                        value={status}
                    />

                </form>

                {/* FILTER */}

                <div className="flex gap-2 mb-6">

                    <Link
                        href={`/?search=${encodeURIComponent(search)}&status=all`}
                        className={`px-4 py-2 rounded-md ${
                            status === "all"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        All
                    </Link>

                    <Link
                        href={`/?search=${encodeURIComponent(search)}&status=active`}
                        className={`px-4 py-2 rounded-md ${
                            status === "active"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        Active
                    </Link>

                    <Link
                        href={`/?search=${encodeURIComponent(search)}&status=completed`}
                        className={`px-4 py-2 rounded-md ${
                            status === "completed"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        Completed
                    </Link>

                </div>

                {/* TODO LIST */}

                {todos.length === 0 ? (

                    <div className="text-center py-10">

                        <p className="text-gray-500 text-lg">
                            No todos found.
                        </p>

                        {search && (
                            <p className="text-gray-400 text-sm mt-2">
                                No results for "{search}"
                            </p>
                        )}

                    </div>

                ) : (

                    <div className="space-y-3">

                        {todos.map((todo) => (

                            <div
                                key={todo._id}
                                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4"
                            >

                                {/* LEFT */}

                                <div className="flex items-center space-x-3">

                                    <form
                                        action={toggleTodo.bind(
                                            null,
                                            todo._id
                                        )}
                                    >

                                        <button
                                            type="submit"
                                            className="text-2xl hover:scale-110 transition-transform"
                                        >
                                            {todo.completed
                                                ? "✅"
                                                : "⬜"}
                                        </button>

                                    </form>

                                    <span
                                        className={`text-lg ${
                                            todo.completed
                                                ? "line-through text-gray-500"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        {todo.title}
                                    </span>

                                    {/* PRIORITY */}

                                    <span
                                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                            todo.priority === "high"
                                                ? "bg-red-100 text-red-700"
                                                : todo.priority === "medium"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {todo.priority}
                                    </span>

                                </div>

                                {/* RIGHT */}

                                <div className="flex items-center space-x-2">

                                    <Link
                                        href={`/edit/${todo._id}`}
                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                                    >
                                        ✏️
                                    </Link>

                                    <form
                                        action={deleteTodoAction.bind(
                                            null,
                                            todo._id
                                        )}
                                    >

                                        <button
                                            type="submit"
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                                        >
                                            🗑️
                                        </button>

                                    </form>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </main>
    );
}