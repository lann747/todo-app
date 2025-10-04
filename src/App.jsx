// src/App.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import TodoItem from "./components/TodoItem";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all | active | completed

  // Load dari localStorage saat awal
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Simpan ke localStorage saat todos berubah
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Tambah todo baru
  const addTodo = useCallback(() => {
    if (!task.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    setTask("");
  }, [task]);

  // Toggle status selesai
  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Hapus todo
  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // Hapus semua
  const clearTodos = useCallback(() => {
    if (window.confirm("Apakah kamu yakin ingin menghapus semua tugas?")) {
      setTodos([]);
    }
  }, []);

  // Hapus yang sudah selesai
  const clearCompleted = useCallback(() => {
    setTodos((prev) => {
      const completed = prev.filter((todo) => todo.completed);
      if (
        completed.length > 0 &&
        window.confirm(`Hapus ${completed.length} tugas yang sudah selesai?`)
      ) {
        return prev.filter((todo) => !todo.completed);
      }
      return prev;
    });
  }, []);

  // Filtered todos pakai useMemo
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });
  }, [todos, filter]);

  // Statistik
  const { activeCount, completedCount } = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    return {
      completedCount: completed,
      activeCount: todos.length - completed,
    };
  }, [todos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-6 transition-all duration-300 hover:shadow-blue-200/50">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl text-white">📋</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">Kelola tugas Anda dengan efisien</p>
        </div>

        {/* Input Section */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Apa yang perlu dilakukan?"
              className="flex-1 border border-blue-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            />
            <button
              onClick={addTodo}
              disabled={!task.trim()}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              Tambah
            </button>
          </div>

          <div className="flex justify-between text-sm text-blue-700">
            <span>
              Aktif: <strong>{activeCount}</strong>
            </span>
            <span>
              Selesai: <strong>{completedCount}</strong>
            </span>
            <span>
              Total: <strong>{todos.length}</strong>
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        {todos.length > 0 && (
          <div className="flex bg-blue-100 rounded-lg p-1 mb-4">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-blue-700 hover:text-blue-800"
                }`}
              >
                {f === "all" && "Semua"}
                {f === "active" && "Aktif"}
                {f === "completed" && "Selesai"}
              </button>
            ))}
          </div>
        )}

        {/* Todo List */}
        <div className="mb-6 max-h-96 overflow-y-auto">
          {filteredTodos.length > 0 ? (
            <ul className="space-y-3">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📝</div>
              <p className="text-gray-500 text-lg">
                {filter === "all"
                  ? "Belum ada tugas, yuk tambahkan yang pertama!"
                  : filter === "active"
                  ? "Tidak ada tugas aktif"
                  : "Belum ada tugas yang selesai"}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {todos.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={clearCompleted}
              disabled={completedCount === 0}
              className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 disabled:bg-orange-200 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md"
            >
              Hapus Selesai
            </button>
            <button
              onClick={clearTodos}
              className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold shadow-md"
            >
              Hapus Semua
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            {todos.length === 0
              ? "Mulai produktif hari ini! ✨"
              : `Kamu memiliki ${activeCount} tugas yang perlu diselesaikan`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
