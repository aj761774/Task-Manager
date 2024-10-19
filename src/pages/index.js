import CreateEditTask from "@/components/CreateEditTask";
import TaskList from "@/components/TaskList";
import { initialTaskData, stages, taskPriority } from "@/constants";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home({ tasksData }) {
  const [createEditTask, setCreateEditTaskData] = useState({open: false, stageId: "", data: {id: "", title: "", description: "", priority: taskPriority.Low}});
  const [tasks, setTasks] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const debounceTimeoutId = useRef(null);

  useEffect(()=> {
    if(!tasks){
      const data = localStorage.getItem("tasks");
      setTasks(data ? JSON.parse(data) : tasksData);
      if(!data){
        localStorage.setItem("tasks", JSON.stringify(tasksData))
      }
    }else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleOpenCreateEditTask = (stageId, taskData = {})=> {
    setCreateEditTaskData({
      open: true,
      stageId,
      data: {
        id: taskData?.id || "",
        title: taskData?.title || "",
        description: taskData?.description || "",
        priority: taskData?.priority || taskPriority.Low,
      }
    })
  }

  const handleChange = (e)=> {
    setCreateEditTaskData((prev)=> ({
      ...prev,
      data: {
        ...prev.data,
        [e.target.name]: e.target.value
      }
    }))
  }

  const handleCloseCreateEditTask = ()=> {
    setCreateEditTaskData({
      open: false,
      stageId: "",
      data: {
        id: "",
        title: "",
        description: "",
        priority: taskPriority.Low
      }
    })
  }

  const handleUpdatePriority = (stageId, taskId, priority)=> {
    console.log("qwsdefr", priority)
    setTasks((prev)=> ({
      ...prev,
      [stageId]: prev[stageId].map((item)=> (item.id === taskId ? {...item, priority} : item))
     }));
  }

  const handleSubmit = ()=> {
    if(!createEditTask.data.title.trim() || !createEditTask.data.description.trim()){
      toast.error("Title And Description are mandatory!");
      return;
    }
    if(createEditTask.data.id){
       setTasks((prev)=> ({
        ...prev,
        [createEditTask.stageId]: prev[createEditTask.stageId].map((item)=> (item.id === createEditTask.data.id ? createEditTask.data : item))
       }));
       toast.success("Task updated successfully!");
    }else {
      setTasks((prev)=> ({
        ...prev,
        [createEditTask.stageId]: [...prev[createEditTask.stageId], {...createEditTask.data, id: new Date().getTime()}]
       }))
       toast.success("Task created successfully!");
    }
    handleCloseCreateEditTask()
  }

  const handleDeleteTask = (stageId, taskId)=> {
    setTasks((prev)=> ({
      ...prev,
      [stageId]: prev[stageId].filter((item)=> (item.id !== taskId))
     }));
  }

  const handleMarkCompleteUncomplete = (stageId, taskId, targetStageId)=> {
    const data = tasks[stageId].find((item)=> (item.id === taskId));
    if(!data){
      return;
    }
    setTasks((prev)=> ({
      ...prev,
      [stageId]: prev[stageId].filter((item)=> (item.id !== taskId)),
      [targetStageId]: [...prev[targetStageId],data]
     }));
  }

  const handleSearch = (e)=> {
   if(debounceTimeoutId.current){
    clearTimeout(debounceTimeoutId.current);
   }
   debounceTimeoutId.current = setTimeout(()=> {
    setSearchVal(e.target.value);
   }, 400);
  }

  return (
    <>
    <div className={styles.wrapper}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search task by title, description"
        onChange={handleSearch}
      />
      <div className={`${styles.taskContainer}`}>
        {stages.map(stage => {
          return (
            <div key={stage.id} className={styles.stageContainer}>
              <div className={styles.stageName}>
                {stage.name}
                <button onClick={() => handleOpenCreateEditTask(stage.id)}>Add Task</button>
              </div>
              <TaskList 
                stage={stage} 
                tasks={tasks} 
                handleDeleteTask={handleDeleteTask} 
                handleMarkCompleteUncomplete={handleMarkCompleteUncomplete} 
                handleOpenCreateEditTask={handleOpenCreateEditTask}
                searchVal={searchVal}
                handleUpdatePriority={handleUpdatePriority}
              />
            </div>
          );
        })}
      </div>
    </div>
    {
      createEditTask.open
      &&
      <CreateEditTask 
        data={createEditTask.data} 
        handleCloseCreateEditTask={handleCloseCreateEditTask} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        handleUpdatePriority={handleUpdatePriority}
      />
    }
    <ToastContainer/>
    </>
  );
}

export const getServerSideProps = () => {
  return {
    props: {
      tasksData: initialTaskData
    }
  };
};
