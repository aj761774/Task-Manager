export const stageIds = {
  pending: "pending",
  completed: "completed"
};

export const stages = [
  {
    id: stageIds.pending,
    name: "pending"
  },
  {
    id: stageIds.completed,
    name: "completed"
  }
];

export const initialTaskData = {
  pending: [
    {
      id: 1,
      title: "Pending task 1",
      description: "this is pending task 1",
      priority: 1
    },
    {
      id: 2,
      title: "Pending task 2",
      description: "this is pending task 2",
      priority: 2
    }
  ],
  completed: [
    {
      id: 3,
      title: "Completed task 1",
      description: "this is completed task 1",
      priority: 1
    },
    {
      id: 4,
      title: "Completed task 2",
      description: "this is completed task 2",
      priority: 1
    }
  ]
};

export const taskPriority = {
  High: 1,
  Medium: 2,
  Low: 3
};
