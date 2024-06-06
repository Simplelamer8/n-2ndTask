'use client'
import Image from 'next/image';
import TaskList from './components/TaskList';
import { useEffect, useState } from 'react';

export default function Home() {
  // const tasks = [{id: 0, completed: false, text: "Some random task"}, {id: 1, completed: false, text: "Another random task"}]; // rewrite using states
  const filter = 'all'; // rewrite using states
  const [tasks, setTasks] = useState([]);
  const [inputField, setInputField] = useState("");
  const [historyOfTasks, setHistoryOfTasks] = useState(0);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    const obtainedTasks = localStorage.getItem("tasks");
    if(obtainedTasks !== "")
    {
      setTasks(JSON.parse(obtainedTasks)); 
    }
  }, [])

  useEffect(() => {
    

    const handleBeforeUnload = (event) => {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
  }, [tasks]);

  const handleAddTask = () => {
    setTasks([...tasks, {id: tasks.length === undefined ? 0 : historyOfTasks, completed: false, text: inputField}]);
    setInputField("");
    setHistoryOfTasks((prev) => prev + 1);
  };

  const handleToggleTask = (ID) => {
      // Implement toggle completed/uncompleted task logic here
      setTasks(tasks.map((task) => {
        task.completed = task.id === ID ? !task.completed : task.completed;
        return task;
    }));
  };

  const handleDeleteTask = (ID) => {
    setTasks(tasks.filter((task) => task.id !== ID));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => task.completed !== true));
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
          value={inputField}
          onChange={(e) => setInputField(e.target.value)}
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}
        <TaskList tasks={tasks} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask} tab={tab} />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> {tasks === undefined ? 0 : tasks.length} {tasks.length === 1 ? "item" : "items"} left</span>  {/* show how many uncompleted items left */}
          <div>
            <button onClick={() => setTab("all")} className={`mr-2 ${tab === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setTab("active")} className={`mr-2 ${tab === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setTab("completed")} className={`${tab === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={() => clearCompleted()}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
