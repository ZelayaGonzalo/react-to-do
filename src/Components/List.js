import React from 'react'
import './list.css'
import iconMoon from '../images/icon-moon.svg'
import iconSun from '../images/icon-sun.svg'
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';



const SortableContainer = sortableContainer(({children}) => {
  return <ul className="task-list">{children}</ul>;
});

function List(props){
    function checkTask(event){
        const checkbox = event.currentTarget.firstChild
        checkbox.checked = !checkbox.checked
        const target =  event.currentTarget.lastChild.innerHTML
        console.log(event.currentTarget.lastChild.innerHTML)
        props.setTasks((prev) =>{
            const newArray = prev;
            const index = newArray.findIndex(tasks=>tasks.task === target)
            console.log(index)
            newArray[index].completed = !prev[index].completed
            console.log(newArray)
            return newArray
            })
    }

    const SortableItem = sortableElement(({value}) => <li className="task helper" onClick={checkTask}>
    <input className="task-check" type="checkbox" checked={value.completed}/>
    <span className="custom-check"></span>
    <p>{value.task}</p>
    </li>);


  const onSortEnd = ({oldIndex, newIndex}) => {
    props.setTasks(prev => {
        const newArray =arrayMove(prev,oldIndex,newIndex)
        console.log(newArray)
        return newArray
    })
  };

    return(
        <div className="list-container">
            <div className="list-title">
                <h1>TODO</h1>
                <img className="theme-icon" src={iconSun} alt="icon"/>
            </div>
            <div className="search-bar">
                <span></span>
                <input className="search-bar-input" type="text" placeholder="Create a new task"/>
            </div>
            <SortableContainer onSortEnd={onSortEnd} pressDelay={200}>
            {props.tasks.map((value, index) => (
                <SortableItem key={`item-${value.task}`} index={index} value={value}/>
                    ))}
            </SortableContainer>
            <div className="bottom-list">
                    <div className="bottom-items">
                        <div className="items-left">items left</div>
                        <ul className="item-status">
                            <li>All</li>
                            <li>Active</li>
                            <li>Completed</li>
                        </ul>
                        <div className="item-clear">Clear Completed</div>
                    </div>
            </div>
            <p className="drag-message"> Drag and drop to reorder </p>
        
        </div>
    )
}
export default List