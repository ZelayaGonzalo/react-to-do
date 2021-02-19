import React from 'react'
import BottomList from './BottomList'
import { Droppable,Draggable } from 'react-beautiful-dnd'
import { useTransition, animated } from 'react-spring'

function View(props){

    function Task(value){
        return(
        <li className={props.lightmode ? "task helper task-light":"task helper"}>
            <input key={value.task} id={value.task} className="task-check" type="checkbox" onChange={props.handleCheck} checked={value.completed} />
            <span className="custom-check"></span>
            <span className="delete-task" onClick={props.removeTask}></span>
            <label htmlFor={value.task}>{value.task}</label>
        </li>
        )
    }
    
    const transitions = useTransition(props.tasks,
    d=>d.task,
    {
        from: { height: 0, opacity: 0 },
        leave: { height: 0, opacity: 0 },
        enter: {height:60,opacity:1},
    }
    )
  
    if(props.show === "all"){
        return(
            <div className={props.lightmode ? "task-list-container task-list-container-light" : "task-list-container"}>
                <Droppable droppableId="one">
                    {(provided)=>(
                    <div className={props.lightmode ? "task-list task-list-light" : "task-list"}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        {transitions.map(({item,props,key},index)=>
                        <animated.div key={key} style={props}>
                            <Draggable draggableId={item.task} index={index}>
                                {(provided)=><div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >{Task(item)}
                                </div>}
                            </Draggable>
                        </animated.div> 
                        )}
                        {provided.placeholder}
                    </div>)}
                </Droppable>
                <BottomList
                    tasks={props.tasks}
                    changeShow={props.changeShow}
                    lightmode={props.lightmode}
                    clearCompleted={props.clearCompleted}
                  /> 
            </div>
        )
    }
    if(props.show === "active"){
        return(
            <div className={props.lightmode ? "task-list-container task-list-container-light" : "task-list-container"}>
                <Droppable droppableId="one">
                    {(provided)=>(
                    <div className={props.lightmode ? "task-list task-list-light" : "task-list"}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        {transitions.filter(({item})=>item.completed === false).map(({item,props,key},index)=>
                        <animated.div key={key} style={props}>
                            <Draggable draggableId={item.task} index={index}>
                                {(provided)=><div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >{Task(item)}
                                </div>}
                            </Draggable>
                        </animated.div> 
                        )}
                        {provided.placeholder}
                    </div>)}
                </Droppable>
                <BottomList
                    tasks={props.tasks}
                    changeShow={props.changeShow}
                    lightmode={props.lightmode}
                    clearCompleted={props.clearCompleted}
                  /> 
            </div>
        )
    }
    if(props.show === "completed"){
        return(
            <div className={props.lightmode ? "task-list-container task-list-container-light" : "task-list-container"}>
                <ul className={props.lightmode ? "task-list task-list-light" : "task-list"}>
                        {transitions.filter(({item})=>item.completed === true).map(({item,props,key})=>
                        <animated.div key={key} style={props}>
                            {Task(item)}
                        </animated.div> 
                        )}
                </ul>
                <BottomList
                    tasks={props.tasks}
                    changeShow={props.changeShow}
                    lightmode={props.lightmode}
                    clearCompleted={props.clearCompleted}
                  /> 
            </div>
            )
    }
    
}




export default View