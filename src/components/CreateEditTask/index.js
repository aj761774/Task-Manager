import styles from "@/styles/Home.module.css";

const CreateEditTask = ({
  handleCloseCreateEditTask,
  data,
  handleChange,
  handleSubmit
}) => {
  return (
    <div className={styles.createEditTaskWrapper}>
      <div className={styles.createEditTaskForm}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={data.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Enter Description"
          value={data.description}
          onChange={handleChange}
        />
        <div className={styles.createEditTaskActions}>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleCloseCreateEditTask}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateEditTask;
