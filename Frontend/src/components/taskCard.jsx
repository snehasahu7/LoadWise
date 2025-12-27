import React from "react";

const taskCard = ({task, onComplete})=>{
    return(
    <div style={{border: "1px solid #ddd", margin:"10px", padding:"10px"}}>
        <h4>{task.title}</h4>
        <p>Difficulty: {task.difficulty}</p>
        <p>Status: {task.status}</p>

        {task.status!=="completed" && (
            <button onClick={()=>onComplete(task._id)}>Mark Completed</button>
        )}
    </div>
    )

};

export default taskCard;