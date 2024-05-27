import React from 'react'
function Todo({ userid, title, completed }) {
    return (
        <div className={`border-slate-300 border-2 my-3 shadow-lg shadow-slate-500 h-25 ${completed ? "bg-green-300" : ""} overflow-hidden p-5`}>
            <sub className='float-right'> Id : {userid}</sub>
            < b className={`${completed ? "line-through" : ""}`} > {title}</b >
            <p className=''>completed:{Number(completed) ? "true" : "false"}</p>
        </div >
    )
}
export default Todo