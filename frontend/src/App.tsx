import { Button, Container, Fab, List } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";

import { createTask, findAllTasks, removeTask, updateTask } from "./api";
import { TaskDto } from "./api/dto/task.dto";
import { CreateTaskDto } from "./api/dto/create-task.dto";
import { UpdateTaskDto } from "./api/dto/update-task.dto";

import Task from "./components/Task";
import CreateTaskModal from "./components/CreateTaskModal";
import EditTaskModal from "./components/EditTaskModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";

function App() {
  const [taskList, setTaskList] = useState<TaskDto[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskDto>({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    status: false,
    createdAt: "",
    updatedAt: "",
  });

  const [filter, setFilter] = useState<"done" | "todo" | "today" | "all">(
    "all"
  );

  useEffect(() => {
    (async () => {
      const tasks = await findAllTasks();
      setTaskList(tasks);
    })();
  }, []);

  const handleChangeStatus = async (id: string, status: boolean) => {
    await updateTask(id, { status });
    setTaskList((taskList) =>
      taskList.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const handleUpdate = async (id: string, data: UpdateTaskDto) => {
    const task = await updateTask(id, data);

    const _taskList = [...taskList];
    const index = _taskList.findIndex((_task) => _task.id === task.id);

    _taskList[index] = task;

    setTaskList(_taskList);
    setIsUpdateModalOpen(false);
  };

  const handleCreate = async (data: CreateTaskDto) => {
    const createdTask = await createTask(data);
    setTaskList((taskList) => [createdTask, ...taskList]);
    setIsCreateModalOpen(false);
  };

  const handleRemove = async (id: string) => {
    await removeTask(id);
    setTaskList((taskList) => taskList.filter((task) => task.id !== id));
  };

  const handleOpenUpdateModal = (task: TaskDto) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };

  const isToday = (date: string) => {
    const today = new Date();
    const parsedDate = new Date(date);

    if (today.toDateString() === parsedDate.toDateString()) {
      return true;
    }

    return false;
  };

  const filterTasks = (tasks: TaskDto[]) => {
    switch (filter) {
      case "todo":
        return tasks.filter((task) => task.status === false);

      case "done":
        return tasks.filter((task) => task.status === true);

      case "today":
        return tasks.filter((task) => isToday(task.dueDate));

      case "all":
        return tasks;
    }
  };

  return (
    <>
      <ToastContainer
        autoClose={3000}
        position="top-right"
        style={{ top: 75 }}
      />
      <Container maxWidth="xs" style={{ position: "relative", padding: "0px" }}>
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          save={handleCreate}
          close={() => setIsCreateModalOpen(false)}
        />
        <EditTaskModal
          isOpen={isUpdateModalOpen}
          task={selectedTask}
          update={handleUpdate}
          close={() => setIsUpdateModalOpen(false)}
        />
        {/* <Typography variant="h5">Todo List</Typography> */}
        <div
          style={{
            height: "100vh",
            position: "relative",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          <List
            dense={false}
            style={{
              maxHeight: "calc(100% - 100px)",
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {filterTasks(taskList).map((task) => (
              <Task
                item={task}
                remove={handleRemove}
                update={handleOpenUpdateModal}
                changeStatus={handleChangeStatus}
              />
            ))}
          </List>
        </div>
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="10px"
          width="100%"
          // width="100%"
          bottom="10px"
          style={{
            borderTop: "1px solid #efefef",
            padding: "10px 0px",
            boxSizing: "border-box",
          }}
        >
          <Button
            onClick={() => setFilter("all")}
            variant="contained"
            size="small"
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("todo")}
            variant="contained"
            size="small"
          >
            To Do
          </Button>
          <Button
            onClick={() => setFilter("done")}
            variant="contained"
            size="small"
          >
            Done
          </Button>
          <Button
            onClick={() => setFilter("today")}
            variant="contained"
            size="small"
          >
            Today
          </Button>
          <Fab
            color="secondary"
            aria-label="add"
            size="small"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Container>
    </>
  );
}

export default App;
