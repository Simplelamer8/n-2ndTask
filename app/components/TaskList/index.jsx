import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({tasks, handleToggleTask, handleDeleteTask, tab}) => {
  // Render TaskItems using TaskItem component
  // Filter tasks by status here
  return (
    <>
      <ul>
          {
            tab === "all" && 
            tasks.map((task) => (
              <TaskItem {...task} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask} />  
            ))
          }
          {
            tab === "active" && 
            tasks.map((task) => {
              return task.completed === false ? <TaskItem {...task} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask} /> : false
            })
          }
          {
            tab === "completed" && 
            tasks.map((task) => {
              return task.completed === true ?  <TaskItem {...task} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask} /> : false
            })
          }
          
      </ul>
    </>
  );
};

export default TaskList;
