import { useEffect, useState } from 'react'

const STORAGE_KEY = 'study-internship-tasks-v1'
const PRIORITIES = ['High', 'Medium', 'Low']
const FILTERS = ['All', 'Active', 'Completed']

const STARTER_TASKS = [
  { id: 1, title: 'Finish this week’s coursework reading', priority: 'High', completed: false },
  { id: 2, title: 'Update resume with internship projects', priority: 'Medium', completed: false },
]

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    // Ignore unreadable storage and fall back to starter tasks.
  }
  return STARTER_TASKS
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // Storage may be full or blocked; the app still works for this session.
    }
  }, [tasks])

  const activeCount = tasks.filter((t) => !t.completed).length
  const completedCount = tasks.length - activeCount

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'Active') return !t.completed
    if (filter === 'Completed') return t.completed
    return true
  })

  function addTask(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    setTasks((prev) => [
      { id: Date.now(), title: trimmed, priority, completed: false },
      ...prev,
    ])
    setTitle('')
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }

  const emptyMessage = {
    All: 'No tasks yet. Add your first one above.',
    Active: 'Nothing left to do. Nice work.',
    Completed: 'No completed tasks yet.',
  }[filter]

  return (
    <main className="app">
      <header className="header">
        <h1>Study &amp; Internship Task Tracker</h1>
        <p className="counter" aria-live="polite">
          <strong>{activeCount}</strong> {activeCount === 1 ? 'task' : 'tasks'} left
          <span className="counter-sub"> · {completedCount} done</span>
        </p>
      </header>

      <form className="add-form" onSubmit={addTask}>
        <label className="sr-only" htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          type="text"
          placeholder="What do you need to get done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          autoComplete="off"
        />
        <label className="sr-only" htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary" disabled={!title.trim()}>
          Add task
        </button>
      </form>

      <div className="toolbar">
        <div className="tabs" role="tablist" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`tab ${filter === f ? 'tab-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          className="btn btn-ghost"
          onClick={clearCompleted}
          disabled={completedCount === 0}
        >
          Clear completed
        </button>
      </div>

      {visibleTasks.length === 0 ? (
        <p className="empty">{emptyMessage}</p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li key={task.id} className={`task priority-${task.priority.toLowerCase()}`}>
              <button
                className="task-main"
                onClick={() => toggleTask(task.id)}
                aria-pressed={task.completed}
                title={task.completed ? 'Mark as not done' : 'Mark as done'}
              >
                <span className={`check ${task.completed ? 'check-on' : ''}`} aria-hidden="true">
                  {task.completed ? '✓' : ''}
                </span>
                <span className={`task-title ${task.completed ? 'task-done' : ''}`}>
                  {task.title}
                </span>
              </button>
              <span className={`badge badge-${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <button
                className="delete"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete task: ${task.title}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
