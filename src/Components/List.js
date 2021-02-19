import React from 'react'
import './list.css'
import './list-light.css'
import './mobile.css'
import iconMoon from '../images/icon-moon.svg'
import iconSun from '../images/icon-sun.svg'
import View from './View'
import { DragDropContext } from 'react-beautiful-dnd'
import arrayMove from'array-move'


function List(props){
    
    function changeShow(event){
        const id =event.target.id
        props.setShow(id)
    }
    function onDragEnd(result){
        const {destination,source,draggableId} =result
        if(!destination){
            return
        }
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return
        }
        const newTask ={
            task: props.tasks[source.index].task,
            completed: props.tasks[source.index].completed
        }
        const newArray = arrayMove(props.tasks,source.index,destination.index)
        console.log(newArray)
        props.setTasks(newArray)

    }

    return(
        <div className={props.lightmode ? "list-container list-container-light" : "list-container"}>
            <div className="list-title">
                <h1>TODO</h1>
                <img className="theme-icon" src={props.lightmode? iconMoon:iconSun} alt="icon" onClick={props.changeMode}/>
            </div>
            <form className={props.lightmode ? "search-bar search-bar-light" : "search-bar"} onSubmit={props.addTask}>
                <input id="search" value={props.searchValue} onChange={props.handleSearch} className="search-bar-input" type="text" placeholder="Create a new task"/>
                <span></span>
                <button type="submit" className="b-hide"></button>
            </form>
            <DragDropContext
            onDragEnd={onDragEnd}
            >
                <View 
                show={props.show}
                tasks={props.tasks} 
                setTasks={props.setTasks} 
                removeTask={props.removeTask} 
                lightmode={props.lightmode}
                changeShow={changeShow}
                clearCompleted={props.clearCompleted}
                handleCheck={props.handleCheck}
            />
            </DragDropContext>
            <p className="drag-message"> Drag and drop to reorder</p>
               
        </div>
        
    )
}


export default List