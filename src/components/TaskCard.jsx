import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../features/taskSlice';
import {useNavigate} from  "react-router-dom"
import useTask from '../hooks/useTask';

const TaskCard = ({ task }) => {
    // const dispatch = useDispatch();
    const {removeTask} = useTask(); 
    const navigate = useNavigate(); 


    return (
        <div className='bg-blue-300 border-2 border-gray-100 rounded-lg px-1 py-2'>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>{task.dueDate}</p>
            <div className='flex flex-row justify-center items-center mt-5'>
                <button 
                onClick = {()=> navigate(`/tasks/${task.id}`)}
                className='w-1/3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-2 m-4'>Xem chi tiết</button>
                <button
                    onClick={() => removeTask(task.id)}
                    className='w-1/3 rounded-lg bg-red-500 hover:bg-red-600 text-white py-2'>
                    Xóa
                </button>
            </div>
        </div>
    )
}

export default TaskCard