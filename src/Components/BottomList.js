
function BottomList(props){
    return(
        <div className="bottom-list">
                    <div className="bottom-items">
                        <div className="items-left">{props.tasks.length} items left</div>
                        <ul className={props.lightmode ? "item-status item-status-light":"item-status"}>
                            <li id="all" onClick={props.changeShow}>All</li>
                            <li id="active" onClick={props.changeShow}>Active</li>
                            <li id="completed" onClick={props.changeShow}>Completed</li>
                        </ul>
                        <div className={props.lightmode ? "item-clear item-clear-light" :"item-clear"} onClick={props.clearCompleted} >Clear Completed</div>
                    </div>
                </div>  
    )
}

export default BottomList