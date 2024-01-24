import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');
  const [droppableId, setDroppableId] = useState('hello');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tasks.length) {
      setDroppableId('tasks');
    }
  }, [tasks.length]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now().toString(),
        name: newTask,
        dateAdded: new Date().toLocaleString(),
        status: 'Incomplete',
      };

      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: task.status === 'Incomplete' ? 'Completed' : 'Incomplete' };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  const incompleteTasks = tasks.filter((task) => task.status === 'Incomplete');
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  const renderTasks = (taskList) => {
    return (
      <ul>
        {taskList.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="flex items-center justify-between p-2 mb-2 bg-white rounded hover:bg-gray-100 shadow-md"
              >
                <span className="flex-1">
                  {task.status === 'Incomplete' ? (
                    <CheckCircleOutlineIcon
                      onClick={() => toggleCompletion(task.id)}
                      className={`text-red-500 cursor-pointer mr-2`}
                    />
                  ) : (
                    <CheckCircleIcon
                      onClick={() => toggleCompletion(task.id)}
                      className={`text-green-500 cursor-pointer mr-2 ${
                        task.status === 'Completed' && 'text-opacity-50'
                      }`}
                    />
                  )}
                  <span className="font-semibold text-lg mr-4">{task.name}</span>
                <span className="text-sm text-gray-500">{task.dateAdded}</span>
             
                </span>
                <DeleteIcon onClick={() => deleteTask(task.id)} className="text-red-500 cursor-pointer" />
              </li>
            )}
          </Draggable>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="w-full md:w-3/4 bg-cyan-300 p-4 md:p-8 rounded-md shadow-md mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Task List</h2>
        <div className="mb-4">
          <label className="mr-2">Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2">
            <option value="All">All</option>
            <option value="Incomplete">Incomplete</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mb-4">
          <div className="flex flex-col md:flex-row items-stretch">
            <input
              type="text"
              placeholder="Add new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded focus:outline-none"
            />
            <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Add Task
            </button>
          </div>
        </form>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col md:flex-row">
            {/* Incomplete Tasks */}
            {filter === 'Incomplete' || filter === 'All' ? (
              <Droppable droppableId={droppableId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 bg-red-500 p-4 rounded-lg mb-4 md:mr-4 md:mb-0"
                  >
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Incomplete</h3>
                    {renderTasks(incompleteTasks)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ) : null}

            {/* Completed Tasks */}
            {filter === 'Completed' || filter === 'All' ? (
              <Droppable droppableId={droppableId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 bg-green-500 p-4 rounded-lg"
                  >
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Completed</h3>
                    {renderTasks(completedTasks)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ) : null}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskList;
