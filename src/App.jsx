import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';
import './Style.css';

export default function App() {
  // Load saved tasks when the app starts
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Could not load tasks:', error);
      return [];
    }
  });

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (updatedTask, index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? updatedTask : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, i) => i !== index)
    );
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <header>
        <h1 className="title">TaskBuddy</h1>
        <p className="tagline">Your friendly Task Manager</p>
      </header>

      <TaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />

      <ProgressTracker tasks={tasks} />

      {tasks.length > 0 && (
        <button className="clear-btn" onClick={clearTasks}>
          Clear All Tasks
        </button>
      )}
    </div>
  );
}
