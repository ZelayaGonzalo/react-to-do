function Task(props){
    return(
    <li className={props.lightmode ? "task helper task-light":"task helper"} onClick={props.checkTask}>
        <input className="task-check" type="checkbox" defaultChecked={props.task.completed} onChange={e => {}}/>
        <span className="custom-check"></span>
        <span className="delete-task" onClick={props.removeTask}></span>
        <p>{props.task.task}</p>
    </li>
    )
}
export default Task