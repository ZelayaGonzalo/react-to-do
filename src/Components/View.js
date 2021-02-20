import React from 'react'
import BottomList from './BottomList'
import { Droppable,Draggable } from 'react-beautiful-dnd'
import { useTransition , animated } from 'react-spring'


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
    const transitionsActive = useTransition(props.tasks.filter(task=>task.completed === false),
        d=>d.task,
        {
            from: { height: 0, opacity: 0 },
            leave: { height: 0, opacity: 0 },
            enter: {height:60,opacity:1},
        }
        )

    const transitionsCompleted =useTransition(props.tasks.filter(task=>task.completed === true),
    d=>d.task,
    {
        from: { height: 0, opacity: 0 },
        leave: { height: 0, opacity: 0 },
        enter: {height:60,opacity:1},
    }
    )

    const currentHeight =  window.innerHeight
    const currentWidth =window.innerWidth
    let maxHeight
    if(currentWidth > 600){
        maxHeight = currentHeight*50/100
    }
    else{
        maxHeight = currentHeight*60/100
    }

    const statusTransition =useTransition(props.show,props.show,{
        from:{maxHeight:0,height:0},
        leave:{maxHeight:0,height:0,opacity:0},
        enter:{maxHeight:maxHeight,height:'auto',opacity:1},
        reset:true,
    })

    function getActive(){
        switch(props.show){
            case "all": return transitions
            case "active": return transitionsActive
            case "completed": return transitionsCompleted
            default: return transitions
        }
    }
    //if(props.show === "all"){
        return(
            <div className={props.lightmode ? "task-list-container task-list-container-light" : "task-list-container"}>
                <Droppable droppableId="one">
                    {(provided)=>(
                    <div className={props.lightmode ? "task-list task-list-light" : "task-list"}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        {getActive().map(({item,props,key},index)=>
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

export default View