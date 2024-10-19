import { stageIds, taskPriority } from "@/constants";
import styles from "@/styles/Home.module.css";

const TaskList = ({
  searchVal,
  handleUpdatePriority,
  stage,
  tasks,
  handleOpenCreateEditTask,
  handleDeleteTask,
  handleMarkCompleteUncomplete
}) => {

  return (
    <div className={styles.taskList}>
      {tasks?.[stage.id]
        ?.filter(task =>
          `${task.title.toLowerCase()} ${task.description.toLowerCase()}`.includes(
            searchVal
          )
        )
        .sort((a, b)=> a.priority - b.priority)
        .map(task =>
          <div key={task.id} className={styles.task}>
            <div className={styles.taskCardActions}>
              <button onClick={() => handleOpenCreateEditTask(stage.id, task)}>
                Edit
              </button>
              <button onClick={() => handleDeleteTask(stage.id, task.id)}>
                Delete
              </button>
              <button
                onClick={() =>
                  handleMarkCompleteUncomplete(
                    stage.id,
                    task.id,
                    stageIds.pending === stage.id
                      ? stageIds.completed
                      : stageIds.pending
                  )}
              >
                {stageIds.pending === stage.id
                  ? "Mark Completed"
                  : "Mark Pending"}
              </button>
            </div>
            <select name="priority" value={task.priority} onChange={(e)=> handleUpdatePriority(stage.id, task.id, e.target.value)}>
              {
                Object.keys(taskPriority).map((taskKey)=> (
                  <option key={taskKey} value={taskPriority[taskKey]}>{taskKey}</option>
                ))
              }
            </select>
            <div className={styles.taskTitle}>
              {task.title}
            </div>
            <div className={styles.taskDescription}>
              {task.description}
            </div>
          </div>
        )}
    </div>
  );
};

export default TaskList;
