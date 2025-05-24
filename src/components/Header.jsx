import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div className="border-2 border-gray-500 flex flex-row justify-between items-center px-8 py-6">
            <h1 className="text-3xl font-bold text-blue-500">TASK TRACER APP</h1>
            <nav className="space-x-8">
                <NavLink to={""} className="text-lg text-blue-30- hover:text-blue-600 cursor-pointer">Home</NavLink>
                <NavLink to={"/tasks"} className="text-lg text-blue-30- hover:text-blue-600 cursor-pointer">Task</NavLink>
            </nav>
        </div>
    )
}

export default Header