import React from 'react'
import {TransitionMotion, spring, presets} from 'react-motion'
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

function View(props){

    const SortableContainer = sortableContainer(({children}) => {
        return <ul className={props.lightmode ? "task-list task-list-light" : "task-list"}>{children}</ul>;
      });

    const SortableItem = sortableElement(({value}) => <li className={props.lightmode ? "task helper task-light":"task helper"} onClick={props.checkTask}>
    <input className="task-check" type="checkbox" checked={value.completed} onChange={e => {}}/>
    <span className="custom-check"></span>
    <span className="delete-task" onClick={props.removeTask}></span>
    <p>{value.task}</p>
    </li>);


  const onSortEnd = ({oldIndex, newIndex}) => {
    props.setTasks(prev => {
        const newArray =arrayMove(prev,oldIndex,newIndex)
        return newArray
    })
  };

  
    if(props.show === "all"){
        return(
            <div className={props.lightmode ? "task-list-container task-list-container-light" : "task-list-container"}>
                <SortableContainer onSortEnd={onSortEnd} distance={5}>
                        {props.tasks.map((value, index) => (
                        <SortableItem className="sort-item" key={index} index={index} value={value}/>
                      ))}
                      
                </SortableContainer>
                <div className="bottom-list">
                    <div className="bottom-items">
                        <div className="items-left">{props.tasks.length} items left</div>
                        <ul className={props.lightmode ? "item-status item-status-light":"item-status"}>
                            <li id="all" onClick={props.changeShow}>All</li>
                            <li id="active" onClick={props.changeShow}>Active</li>
                            <li id="completed" onClick={props.changeShow}>Completed</li>
                        </ul>
                        <div className={props.lightmode ? "item-clear item-clear-light" :"item-clear"} onClick={props.clearCompleted}>Clear Completed</div>
                    </div>
            </div>     
            </div>
        )
    }
    if(props.show === "active"){
        return(
        <div className={props.lightmode ? "task-list-container task-list-container-light" : "task-list-container"}>
        <SortableContainer onSortEnd={onSortEnd} distance={5}>
            {props.tasks.filter(item=> item.completed === false).map((value,index)=>(
                <SortableItem className="sort-item" key={index} index={index} value={value}/>
            ))}
        </SortableContainer>
        <div className="bottom-list">
                    <div className="bottom-items">
                        <div className="items-left">{props.tasks.length} items left</div>
                        <ul className={props.lightmode ? "item-status item-status-light":"item-status"}>
                            <li id="all" onClick={props.changeShow}>All</li>
                            <li id="active" onClick={props.changeShow}>Active</li>
                            <li id="completed" onClick={props.changeShow}>Completed</li>
                        </ul>
                        <div className={props.lightmode ? "item-clear item-clear-light" :"item-clear"} onClick={props.clearCompleted}>Clear Completed</div>
                    </div>
            </div>     
        </div>
        )
    }
    if(props.show === "completed"){
        return(
            <div className={props.lightmode ? "task-list-container task-list-container-light" : "task-list-container"}>
            <SortableContainer onSortEnd={onSortEnd} distance={5}>
                {props.tasks.filter(item=> item.completed === true).map((value,index)=>(
                    <SortableItem className="sort-item" key={index} index={index} value={value}/>
                ))}
            </SortableContainer>
            <div className={props.lightmode ? "task-list-container task-list-container-light" : "task-list-container"}>
                    <div className="bottom-items">
                        <div className="items-left">{props.tasks.length} items left</div>
                        <ul className={props.lightmode ? "item-status item-status-light":"item-status"}>
                            <li id="all" onClick={props.changeShow}>All</li>
                            <li id="active" onClick={props.changeShow}>Active</li>
                            <li id="completed" onClick={props.changeShow}>Completed</li>
                        </ul>
                        <div className={props.lightmode ? "item-clear item-clear-light" :"item-clear"} onClick={props.clearCompleted}>Clear Completed</div>
                    </div>
            </div>
            </div>
            )
    }
    
}

export default View