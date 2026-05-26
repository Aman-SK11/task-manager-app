import { useState, useEffect } from "react";  // ← useEffect add kiya

// ─────────────────────────────────────────────
//  FAKE "DATABASE" stored in React state
//  In a real app you'd use a backend + database
// ─────────────────────────────────────────────
const SAMPLE_TASKS = [
  { id: 1, title: "Read project requirements", description: "Go through the internship brief carefully", status: "complete", priority: "high", createdAt: "2024-06-01" },
  { id: 2, title: "Set up GitHub repo", description: "Create repo and push first commit", status: "incomplete", priority: "high", createdAt: "2024-06-02" },
  { id: 3, title: "Build the UI", description: "Design and code the frontend interface", status: "incomplete", priority: "medium", createdAt: "2024-06-03" },
];

// ─────────────────────────────────────────────
//  HELPER: generate a simple unique ID
// ─────────────────────────────────────────────
const makeId = () => Date.now();

// ════════════════════════════════════════════════════════
//  MAIN APP  –  decides which "page" to show
// ════════════════════════════════════════════════════════
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: "Demo User", email: "demo@email.com", password: "demo123" },
  ]);
  const [authScreen, setAuthScreen] = useState("login");

  const handleSignup = ({ name, email, password }) => {
    const already = users.find((u) => u.email === email);
    if (already) return "Email already registered!";
    const newUser = { id: makeId(), name, email, password };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return null;
  };

  const handleLogin = ({ email, password }) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return "Wrong email or password!";
    setCurrentUser(user);
    return null;
  };

  const handleLogout = () => setCurrentUser(null);

  if (!currentUser) {
    return authScreen === "login" ? (
      <LoginPage onLogin={handleLogin} onSwitch={() => setAuthScreen("signup")} />
    ) : (
      <SignupPage onSignup={handleSignup} onSwitch={() => setAuthScreen("login")} />
    );
  }

  return <TasksPage user={currentUser} onLogout={handleLogout} />;
}

// ════════════════════════════════════════════════════════
//  LOGIN PAGE
// ════════════════════════════════════════════════════════
function LoginPage({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    const err = onLogin({ email, password });
    if (err) setError(err);
  };

  return (
    <div style={styles.pageCenter}>
      <div style={styles.authCard}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={styles.logo}>✅</div>
          <h1 style={styles.appTitle}>TaskFlow</h1>
          <p style={styles.subtitle}>Your personal task manager</p>
        </div>

        <h2 style={styles.authHeading}>Welcome back 👋</h2>

        {error && <div style={styles.errorBox}>{error}</div>}

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
        />

        <label style={styles.label}>Password</label>
        <div style={{ position: "relative" }}>
          <input
            style={{ ...styles.input, paddingRight: 44 }}
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button style={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>

        <button style={styles.primaryBtn} onClick={handleSubmit}>Log In</button>

        <p style={styles.switchText}>
          Don't have an account?{" "}
          <span style={styles.link} onClick={onSwitch}>Sign up free</span>
        </p>

        <div style={styles.hintBox}>
          <strong>🧪 Try the demo:</strong><br />
          Email: <code>demo@email.com</code><br />
          Password: <code>demo123</code>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  SIGN-UP PAGE
// ════════════════════════════════════════════════════════
function SignupPage({ onSignup, onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const err = onSignup({ name, email, password });
    if (err) setError(err);
  };

  return (
    <div style={styles.pageCenter}>
      <div style={styles.authCard}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={styles.logo}>✅</div>
          <h1 style={styles.appTitle}>TaskFlow</h1>
          <p style={styles.subtitle}>Your personal task manager</p>
        </div>

        <h2 style={styles.authHeading}>Create your account</h2>

        {error && <div style={styles.errorBox}>{error}</div>}

        <label style={styles.label}>Full Name</label>
        <input
          style={styles.input}
          placeholder="Riya Sharma"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }}
        />

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
        />

        <label style={styles.label}>Password <span style={{ color: "#999", fontSize: 12 }}>(min 6 chars)</span></label>
        <input
          style={styles.input}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <button style={styles.primaryBtn} onClick={handleSubmit}>Create Account</button>

        <p style={styles.switchText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={onSwitch}>Log in</span>
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  TASKS PAGE  –  the main dashboard after login
// ════════════════════════════════════════════════════════
function TasksPage({ user, onLogout }) {

  // ✅ FIX 1 — Browser se saved tasks lo, nahi to sample tasks use karo
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("taskflow-tasks");
    return saved ? JSON.parse(saved) : SAMPLE_TASKS;
  });

  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ FIX 2 — Jab bhi tasks badlein, browser mein save karo
  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]); // tasks badle tab hi run hoga

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "complete").length;
  const pending = total - done;

  const visibleTasks = tasks
    .filter((t) => filter === "all" || t.status === filter)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (taskData) => {
    const newTask = {
      id: makeId(),
      ...taskData,
      status: "incomplete",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks((prev) => [newTask, ...prev]);
    setShowForm(false);
  };

  const handleUpdate = (taskData) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
    );
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "complete" ? "incomplete" : "complete" }
          : t
      )
    );
  };

  return (
    <div style={styles.appShell}>
      <header style={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>✅</span>
          <span style={{ fontWeight: 700, fontSize: 20, color: "#fff" }}>TaskFlow</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ color: "#c7d2fe", fontSize: 14 }}>👋 Hi, {user.name.split(" ")[0]}!</span>
          <button style={styles.logoutBtn} onClick={onLogout}>Log Out</button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.statsRow}>
          <StatCard label="Total Tasks" value={total} color="#6366f1" emoji="📋" />
          <StatCard label="Completed" value={done} color="#10b981" emoji="✅" />
          <StatCard label="Pending" value={pending} color="#f59e0b" emoji="⏳" />
        </div>

        <div style={styles.toolbar}>
          <input
            style={{ ...styles.input, flex: 1, margin: 0 }}
            placeholder="🔍  Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            style={styles.addBtn}
            onClick={() => { setShowForm(true); setEditingTask(null); }}
          >
            + Add Task
          </button>
        </div>

        <div style={styles.filterRow}>
          {["all", "incomplete", "complete"].map((f) => (
            <button
              key={f}
              style={{ ...styles.filterTab, ...(filter === f ? styles.filterTabActive : {}) }}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "📋 All" : f === "incomplete" ? "⏳ Pending" : "✅ Done"}
              <span style={styles.filterBadge}>
                {f === "all" ? total : f === "complete" ? done : pending}
              </span>
            </button>
          ))}
        </div>

        {(showForm || editingTask) && (
          <TaskForm
            initial={editingTask}
            onSubmit={editingTask ? handleUpdate : handleAdd}
            onCancel={() => { setShowForm(false); setEditingTask(null); }}
          />
        )}

        {visibleTasks.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={{ fontSize: 48 }}>📭</div>
            <p style={{ color: "#94a3b8", marginTop: 8 }}>No tasks found. Add one above!</p>
          </div>
        ) : (
          <div style={styles.taskList}>
            {visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => handleToggle(task.id)}
                onEdit={() => { setEditingTask(task); setShowForm(false); }}
                onDelete={() => handleDelete(task.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  TASK FORM
// ════════════════════════════════════════════════════════
function TaskForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [priority, setPriority] = useState(initial?.priority || "medium");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) { setError("Task title is required!"); return; }
    onSubmit({ title: title.trim(), description: description.trim(), priority });
  };

  return (
    <div style={styles.formCard}>
      <h3 style={{ margin: "0 0 16px", color: "#1e293b", fontSize: 17 }}>
        {initial ? "✏️ Edit Task" : "➕ New Task"}
      </h3>

      {error && <div style={styles.errorBox}>{error}</div>}

      <label style={styles.label}>Task Title *</label>
      <input
        style={styles.input}
        placeholder="e.g. Complete the homepage design"
        value={title}
        onChange={(e) => { setTitle(e.target.value); setError(""); }}
      />

      <label style={styles.label}>Description <span style={{ color: "#999", fontSize: 12 }}>(optional)</span></label>
      <textarea
        style={{ ...styles.input, height: 80, resize: "vertical" }}
        placeholder="Add more details about this task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label style={styles.label}>Priority</label>
      <select
        style={styles.input}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>

      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        <button style={styles.primaryBtn} onClick={handleSubmit}>
          {initial ? "Save Changes" : "Add Task"}
        </button>
        <button style={styles.cancelBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  TASK CARD
// ════════════════════════════════════════════════════════
function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isDone = task.status === "complete";

  const priorityBadge = {
    high:   { bg: "#fee2e2", color: "#b91c1c", label: "🔴 High" },
    medium: { bg: "#fef9c3", color: "#92400e", label: "🟡 Medium" },
    low:    { bg: "#dcfce7", color: "#166534", label: "🟢 Low" },
  }[task.priority] || { bg: "#f1f5f9", color: "#475569", label: task.priority };

  return (
    <div style={{ ...styles.taskCard, opacity: isDone ? 0.75 : 1 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <button
          style={{
            ...styles.checkbox,
            background: isDone ? "#6366f1" : "#fff",
            borderColor: isDone ? "#6366f1" : "#cbd5e1",
          }}
          onClick={onToggle}
          title={isDone ? "Mark incomplete" : "Mark complete"}
        >
          {isDone && <span style={{ color: "#fff", fontSize: 13 }}>✓</span>}
        </button>

        <div style={{ flex: 1 }}>
          <p style={{
            margin: 0,
            fontWeight: 600,
            fontSize: 15,
            color: isDone ? "#94a3b8" : "#1e293b",
            textDecoration: isDone ? "line-through" : "none",
          }}>
            {task.title}
          </p>
          {task.description && (
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
              {task.description}
            </p>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ ...styles.badge, background: priorityBadge.bg, color: priorityBadge.color }}>
              {priorityBadge.label}
            </span>
            <span style={{ ...styles.badge, background: isDone ? "#d1fae5" : "#e0e7ff", color: isDone ? "#065f46" : "#3730a3" }}>
              {isDone ? "✅ Complete" : "⏳ Pending"}
            </span>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>📅 {task.createdAt}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <button style={styles.iconBtn} onClick={onEdit} title="Edit task">✏️</button>
          <button style={{ ...styles.iconBtn, background: "#fee2e2" }} onClick={onDelete} title="Delete task">🗑️</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  STAT CARD
// ════════════════════════════════════════════════════════
function StatCard({ label, value, color, emoji }) {
  return (
    <div style={{ ...styles.statCard, borderTop: `4px solid ${color}` }}>
      <div style={{ fontSize: 28 }}>{emoji}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  STYLES
// ════════════════════════════════════════════════════════
const styles = {
  pageCenter: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  authCard: {
    background: "#fff",
    borderRadius: 20,
    padding: "36px 32px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  logo: { fontSize: 44, textAlign: "center" },
  appTitle: { margin: "8px 0 4px", fontSize: 26, fontWeight: 800, color: "#1e293b", textAlign: "center" },
  subtitle: { margin: 0, color: "#64748b", fontSize: 14, textAlign: "center" },
  authHeading: { fontSize: 20, fontWeight: 700, color: "#1e293b", margin: "0 0 20px" },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5 },
  input: {
    display: "block",
    width: "100%",
    padding: "10px 14px",
    fontSize: 14,
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    marginBottom: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "#f8fafc",
    color: "#1e293b",
  },
  errorBox: {
    background: "#fee2e2",
    color: "#b91c1c",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    marginBottom: 14,
    fontWeight: 500,
  },
  hintBox: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    color: "#166534",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 13,
    marginTop: 16,
    lineHeight: 1.8,
  },
  primaryBtn: {
    display: "block",
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 4,
    marginBottom: 14,
    fontFamily: "inherit",
  },
  cancelBtn: {
    flex: 1,
    padding: "11px",
    background: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  switchText: { textAlign: "center", fontSize: 13, color: "#64748b", margin: "4px 0 0" },
  link: { color: "#6366f1", fontWeight: 600, cursor: "pointer" },
  eyeBtn: {
    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 0,
  },
  appShell: { minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', sans-serif" },
  navbar: {
    background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    padding: "14px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(99,102,241,0.3)",
  },
  logoutBtn: {
    padding: "7px 16px",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: 8,
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 600,
    fontFamily: "inherit",
  },
  main: { maxWidth: 720, margin: "0 auto", padding: "28px 16px 60px" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 },
  statCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "18px 16px",
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
  },
  toolbar: { display: "flex", gap: 10, marginBottom: 14, alignItems: "center" },
  addBtn: {
    padding: "10px 20px",
    background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
  },
  filterRow: { display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" },
  filterTab: {
    padding: "8px 16px",
    background: "#fff",
    border: "1.5px solid #e2e8f0",
    borderRadius: 30,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 7,
    color: "#475569",
    fontFamily: "inherit",
  },
  filterTabActive: {
    background: "#6366f1",
    border: "1.5px solid #6366f1",
    color: "#fff",
  },
  filterBadge: {
    background: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    padding: "1px 8px",
    fontSize: 12,
  },
  formCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "22px 20px",
    marginBottom: 20,
    boxShadow: "0 4px 20px rgba(99,102,241,0.12)",
    border: "2px solid #e0e7ff",
  },
  taskList: { display: "flex", flexDirection: "column", gap: 12 },
  taskCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "16px 18px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.2s",
  },
  checkbox: {
    width: 24, height: 24,
    border: "2px solid",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    background: "#fff",
    transition: "all 0.15s",
    padding: 0,
    fontFamily: "inherit",
  },
  badge: { padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  iconBtn: {
    background: "#f1f5f9",
    border: "none",
    borderRadius: 8,
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: 15,
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
};
