import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

const TaskDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {data: task, loading: isLoading} = useFetch(`http://localhost:3001/tasks/${id}`);

    // const [task, setTask] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     const doFetch = async () => {
    //         setIsLoading(true);
    //         await fetch(`http://localhost:3001/tasks/${id}`)
    //             .then(res => res.json())
    //             .then(rawData => setTask(rawData))
    //             .catch((err) => console.error(err));
    //         setIsLoading(false)
    //     }
    //     doFetch();
    // }, [id])

    if (isLoading) return <p>Loanding....</p>


    return (
        <div className='bg-blue-300 border-2 border-gray-100 rounded-lg px-1 py-2'>
            {!isLoading && task && <>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <p>{task.dueDate}</p>
                <div className='flex flex-row justify-center items-center mt-5'>
                    <button
                        onClick={() => navigate(-1)}
                        className='w-1/3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-2 m-4'>Quay lai </button>
                    <button
                        onClick={() => navigate(`/tasks/${task.id}/edit`)}
                        className='w-1/3 rounded-lg bg-red-500 hover:bg-red-600 text-white py-2'>Sua</button>
                </div>
            </>}
        </div>
    )
}

export default TaskDetailsPage