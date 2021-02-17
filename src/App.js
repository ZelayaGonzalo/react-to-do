import './App.css'
import {useState, useEffect} from 'react'
import List from './Components/List'

function createTask(task) {
  return{
    task,
    completed:true,
  }
}

function App() {
  const [tasks,setTasks] = useState([])

  useEffect(()=>{
    setTasks(()=>{return [createTask("task1"),createTask("task2"),createTask("task3"),createTask("task4"),createTask("task5"),createTask("task6")]})
  },[])
  //setTasks(()=>{return ["task1","task2","task2"]})

  return (
    <div className="App">
      <div className="top"></div>
      <List tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

export default App;
