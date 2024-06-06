import React from 'react';
import Image from 'next/image';
import cross from "@/app/assets/images/cross.png"
import tick from "@/app/assets/images/tick.png"

const TaskItem = ({id, completed, text, handleToggleTask, handleDeleteTask}) => {
  // Component that shows each TaskItem
  return (
    <>
      <li className="flex justify-between items-center p-2 bg-gray-900 rounded mb-2">
        <div className="flex items-center">
          <button 
          className="w-6 h-6 my-auto mr-6"
          onClick={() => handleToggleTask(id)} 
          >
            <Image
                  src={completed ? cross : tick}
                  alt="Task status"
                  width={30}
                  height={30}
            />
          </button>
          <span className={`ml-2 ${completed ? 'line-through text-gray-500' : 'text-white'}`}>{text}</span>
        </div>
        <button onClick={() => handleDeleteTask(id)} className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </li>
    </>
  );
};

export default TaskItem;
