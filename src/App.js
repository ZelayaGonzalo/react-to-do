import './App.css'
import {useState, useEffect} from 'react'
import List from './Components/List'

function createTask(task) {
  return{
    task,
    completed:false,
  }
}

function App() {
  const [tasks,setTasks] = useState([])
  const [searchValue,setSearchValue]=useState("")
  const [show,setShow]=useState("all")
  const [lightmode,setLightmode]=useState(false)
  useEffect(()=>{
    setTasks(()=>{return [createTask("task1"),createTask("task2"),createTask("task3"),createTask("task4")]})
  },[])
  function handleSearch(event){
    const value = event.target.value
    setSearchValue(value)
  }
  function addTask(event){
    event.preventDefault()
    const value = event.target.firstChild.value
    const newTask = createTask(value)
    console.log(value)
    setTasks((prev)=>[...prev, newTask])
    setSearchValue('')
  }
  function removeTask(event){
    event.preventDefault()
    event.stopPropagation();
    const target = event.target.nextSibling.innerHTML
    console.log(target)
    setTasks(prev=> prev.filter(item => item.task !== target))
  }

  function changeMode(event) {
    setLightmode(!lightmode)
  }

  function checkTask(event){
    const checkbox = event.currentTarget.firstChild
    const target =  event.currentTarget.lastChild.innerHTML
    console.log(event.currentTarget.lastChild.innerHTML)
    setTasks((prev) =>{
        const newArray = prev
        const index = newArray.findIndex(tasks=>tasks.task === target)
        console.log(prev[index].completed)
        newArray[index]={
          task:target,
          completed:!prev[index].completed
        }
        checkbox.checked = newArray[index].completed
        console.log(newArray[index])
        return newArray
        })
  }
  function clearCompleted(event){
    setTasks(prev=>prev.filter(item =>item.completed === false))
  }

  return (
    <div className={lightmode ? "App app-light":"App"}>
      <div className={lightmode ? "top top-light":"top"} ></div>
      <List 
      tasks={tasks} 
      setTasks={setTasks} 
      handleSearch={handleSearch}
      searchValue={searchValue}
      addTask={addTask}
      removeTask={removeTask}
      show={show}
      setShow={setShow}
      checkTask={checkTask}
      clearCompleted={clearCompleted}
      lightmode={lightmode}
      changeMode={changeMode}
      />
    </div>
  );
}

export default App;
