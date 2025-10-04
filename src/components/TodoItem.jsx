import PropTypes from "prop-types";
import "../App.css";

/**
 * Komponen TodoItem
 * Menampilkan 1 tugas dengan fitur:
 * - Toggle status (selesai/belum)
 * - Hapus tugas
 */
function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const handleToggle = () => toggleTodo(todo.id);
  const handleDelete = () => deleteTodo(todo.id);

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {/* Indikator status */}
      <div
        className="status-indicator"
        onClick={handleToggle}
        role="button"
        aria-label={todo.completed ? "Tandai belum selesai" : "Tandai selesai"}
      >
        <div className={`status-circle ${todo.completed ? "completed" : ""}`}>
          {todo.completed && "✓"}
        </div>
      </div>

      {/* Teks tugas */}
      <span
        className="todo-text"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleToggle()}
      >
        {todo.text}
      </span>

      {/* Tombol hapus */}
      <button
        className="delete-btn"
        onClick={handleDelete}
        aria-label="Hapus tugas"
        title="Hapus tugas"
      >
        🗑️
      </button>
    </li>
  );
}

// 🔹 Validasi props
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
