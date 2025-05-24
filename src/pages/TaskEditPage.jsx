import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, updateTask } from "../features/taskSlice"
import useFetch from '../hooks/useFetch';
import useTask from '../hooks/useTask';


const TaskEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const {editTask} = useTask();



    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "",
        dueDate: "",
    });

    //hook
    const { data, loading: isLoading } = useFetch(`http://localhost:3001/tasks/${id}`);
    useEffect(() => {
        if (data) setForm(data);
    }, [data])

    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     const doFetch = async () => {
    //         setIsLoading(true);
    //         await fetch(`http://localhost:3001/tasks/${id}`)
    //             .then(res => res.json())
    //             .then(rawData => setForm(rawData))
    //             .catch((err) => console.error(err));
    //         setIsLoading(false)
    //     }
    //     doFetch();
    // }, [id])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    console.log(form);

    const handleSubmit = () => {
        // dispatch(updateTask({ id, task: form }));
        editTask({ id, task: form });
        navigate(`/tasks/${id}`);
    };



    if (isLoading) return <p>Loanding....</p>

    return (
        <div className='w-1/3 mx-auto border-2 p-4 border-gray-300'>
            <div >
                <label htmlFor="">Tiêu đề</label>
                <input type="text" name="title" className="border-2 border-gray-300 w-full" onChange={handleChange} defaultValue={form.title} />
            </div>

            <div>
                <label htmlFor="">Nội dung</label>
                <input type="text" name="description" className="border-2 border-gray-300 w-full" onChange={handleChange} defaultValue={form.description} />
            </div>

            <div>
                <label htmlFor="">Trạng thái</label>
                <input type="text" name="status" className="border-2 border-gray-300 w-full" onChange={handleChange} defaultValue={form.status} />
            </div>

            <div>
                <label htmlFor="">Hạn chót </label>
                <input type="text" name="dueDate" className="border-2 border-gray-300 w-full" onChange={handleChange} defaultValue={form.dueDate} />
            </div>

            <div>
                <button
                    onClick={handleSubmit}
                    className='w-full py-2 text-center bg-blue-500 text-white hover:bg-blue-600'>
                    Sửa công viêc
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className='w-full py-2 text-center bg-red-500 text-white hover:bg-red-600'>Quay lai </button>
            </div>

        </div>
    )
}

export default TaskEditPage