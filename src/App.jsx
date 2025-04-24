// import React, { useState, useEffect } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [taskName, setTaskName] = useState("");
//   const [taskType, setTaskType] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [tasks, setTasks] = useState([]);

//   const statusOptions = ['Pending', 'Progress', 'Completed'];

//   const getTasks = async () => {
//     try {
//       const res = await axios.get('http://localhost:8001/api/todo/allTodo');
//       setTasks(res.data.Todo);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   useEffect(() => {
//     getTasks();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`http://localhost:8001/api/todo/updateStatus/${id}`, { status });
//       getTasks();
//     } catch (err) {
//       console.log('Status not updated', err);
//     }
//   };

//   const AddTask = async (e) => {
//     e.preventDefault();
//     if (!taskName || !taskType) return;
    
//     try {
//       const res = await axios.post('http://localhost:8001/api/todo/addTodo', { taskName, taskType });
//       setTaskName('');
//       setTaskType('');
//       setTasks([...tasks, res.data.Todo]);
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8001/api/todo/deleteTodo/${id}`);
//       setTasks(tasks.filter(task => task._id !== id));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleStatusSelect = (status) => {
//     setTaskType(status);
//     setShowDropdown(false);
//   };

//   return (
//     <div className="App">
//       <h1>Todo-List App</h1>

//       <div className="form">
//         <form className="flex items-center max-w-lg mx-auto" onSubmit={AddTask}>
//           <div className="flex flex-col justify-center items-center space-y-4 w-full">
//             <input
//               type="text"
//               placeholder="Enter your task..."
//               value={taskName}
//               onChange={(e) => setTaskName(e.target.value)}
//               required
//             />
            
//             {/* Custom Dropdown */}
//             <div className="dropdown-container">
//               <div 
//                 className="dropdown-header"
//                 onClick={() => setShowDropdown(!showDropdown)}
//               >
//                 {taskType || 'Select Task Status'}
//                 <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
//               </div>
              
//               {showDropdown && (
//                 <ul className="dropdown-options">
//                   {statusOptions.map((option, index) => (
//                     <li 
//                       key={index}
//                       className={`dropdown-option ${taskType === option ? 'selected' : ''}`}
//                       onClick={() => handleStatusSelect(option)}
//                     >
//                       {option}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <button type="submit">Add Task</button>
//           </div>
//         </form>
//       </div>

//       <div className="board">
//         {/* Pending Tasks */}
//         <div className="column">
//           <div className="column-header Pending">
//             <span>Pending Tasks</span>
//             <span className="task-count">
//               {tasks.filter(task => task.taskType === 'Pending').length}
//             </span>
//           </div>
//           <ul className="task-list">
//             {tasks.filter(task => task.taskType === 'Pending').length > 0 ? (
//               tasks.filter(task => task.taskType === 'Pending').map((task, index) => (
//                 <li className="task-card" key={index}>
//                   <div className="task-priority priority-high"></div>
//                   <h3>{task.taskName}</h3>
//                   <div className="task-footer">
//                     <div className="task-actions">
//                       <button onClick={() => deleteTask(task._id)}>Delete</button>
//                       <button 
//                         className="secondary"
//                         onClick={() => updateStatus(task._id, 'Progress')}
//                       >
//                         Start Progress
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <div className="empty-state">
//                 <p>No pending tasks. Add one above!</p>
//               </div>
//             )}
//           </ul>
//         </div>

//         {/* In Progress Tasks */}
//         <div className="column">
//           <div className="column-header Progress">
//             <span>In Progress</span>
//             <span className="task-count">
//               {tasks.filter(task => task.taskType === 'Progress').length}
//             </span>
//           </div>
//           <ul className="task-list">
//             {tasks.filter(task => task.taskType === 'Progress').length > 0 ? (
//               tasks.filter(task => task.taskType === 'Progress').map((task, index) => (
//                 <li className="task-card" key={index}>
//                   <div className="task-priority priority-medium"></div>
//                   <h3>{task.taskName}</h3>
//                   <div className="task-footer">
//                     <div className="task-actions">
//                       <button 
//                         className="secondary"
//                         onClick={() => updateStatus(task._id, 'Pending')}
//                       >
//                         Move Back
//                       </button>
//                       <button 
//                         onClick={() => updateStatus(task._id, 'Completed')}
//                       >
//                         Complete
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <div className="empty-state">
//                 <p>No tasks in progress</p>
//               </div>
//             )}
//           </ul>
//         </div>

//         {/* Completed Tasks */}
//         <div className="column">
//           <div className="column-header Completed">
//             <span>Completed</span>
//             <span className="task-count">
//               {tasks.filter(task => task.taskType === 'Completed').length}
//             </span>
//           </div>
//           <ul className="task-list">
//             {tasks.filter(task => task.taskType === 'Completed').length > 0 ? (
//               tasks.filter(task => task.taskType === 'Completed').map((task, index) => (
//                 <li className="task-card" key={index}>
//                   <div className="task-priority priority-low"></div>
//                   <h3>{task.taskName}</h3>
//                   <div className="task-footer">
//                     <div className="task-actions">
//                       <button 
//                         className="secondary"
//                         onClick={() => updateStatus(task._id, 'Progress')}
//                       >
//                         Reopen
//                       </button>
//                       <button onClick={() => deleteTask(task._id)}>
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <div className="empty-state">
//                 <p>No completed tasks yet</p>
//               </div>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskType, setEditTaskType] = useState('');

  const statusOptions = ['Pending', 'Progress', 'Completed'];

  const getTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/todo/allTodo');
      setTasks(res.data.Todo);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8001/api/todo/updateStatus/${id}`, { status });
      getTasks();
    } catch (err) {
      console.log('Status not updated', err);
    }
  };

  const AddTask = async (e) => {
    e.preventDefault();
    if (!taskName || !taskType) return;
    
    try {
      const res = await axios.post('http://localhost:8001/api/todo/addTodo', { taskName, taskType });
      setTaskName('');
      setTaskType('');
      setTasks([...tasks, res.data.Todo]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/todo/deleteTodo/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      if (editingTask && editingTask._id === id) {
        cancelEdit();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setEditTaskName(task.taskName);
    setEditTaskType(task.taskType);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTaskName("");
    setEditTaskType("");
  };

  const saveEdit = async () => {
    if (!editTaskName || !editTaskType) return;
    
    try {
      await axios.put(`http://localhost:8001/api/todo/updateTodo/${editingTask._id}`, {
        taskName: editTaskName,
        taskType: editTaskType
      });
      getTasks();
      cancelEdit();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleStatusSelect = (status) => {
    setTaskType(status);
    setShowDropdown(false);
  };

  const handleEditStatusSelect = (status) => {
    setEditTaskType(status);
  };

  return (
    <div className="App">
      <h1>Todo-List App</h1>

      <div className="form">
        <form className="flex items-center max-w-lg mx-auto" onSubmit={AddTask}>
          <div className="flex flex-col justify-center items-center space-y-4 w-full">
            <input
              type="text"
              placeholder="Enter your task..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            
            {/* Custom Dropdown */}
            <div className="dropdown-container">
              <div 
                className="dropdown-header"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {taskType || 'Select Task Status'}
                <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
              </div>
              
              {showDropdown && (
                <ul className="dropdown-options">
                  {statusOptions.map((option, index) => (
                    <li 
                      key={index}
                      className={`dropdown-option ${taskType === option ? 'selected' : ''}`}
                      onClick={() => handleStatusSelect(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button type="submit">Add Task</button>
          </div>
        </form>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Task</h2>
            <input
              type="text"
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
              className="modal-input"
            />
            
            <div className="dropdown-container">
              <div 
                className="dropdown-header"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {editTaskType || 'Select Task Status'}
                <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
              </div>
              
              {showDropdown && (
                <ul className="dropdown-options">
                  {statusOptions.map((option, index) => (
                    <li 
                      key={index}
                      className={`dropdown-option ${editTaskType === option ? 'selected' : ''}`}
                      onClick={() => handleEditStatusSelect(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="modal-buttons">
              <button onClick={saveEdit} className="save-btn">Save</button>
              <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="board">
        {/* Pending Tasks */}
        <div className="column">
          <div className="column-header Pending">
            <span>Pending Tasks</span>
            <span className="task-count">
              {tasks.filter(task => task.taskType === 'Pending').length}
            </span>
          </div>
          <ul className="task-list">
            {tasks.filter(task => task.taskType === 'Pending').length > 0 ? (
              tasks.filter(task => task.taskType === 'Pending').map((task, index) => (
                <li className="task-card" key={index}>
                  <div className="task-priority priority-high"></div>
                  <h3>{task.taskName}</h3>
                  <div className="task-footer">
                    <div className="task-actions">
                      <button onClick={() => startEdit(task)}>Edit</button>
                      <button onClick={() => deleteTask(task._id)}>Delete</button>
                      <button 
                        className="secondary"
                        onClick={() => updateStatus(task._id, 'Progress')}
                      >
                        Start Progress
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="empty-state">
                <p>No pending tasks. Add one above!</p>
              </div>
            )}
          </ul>
        </div>

        {/* In Progress Tasks */}
        <div className="column">
          <div className="column-header Progress">
            <span>In Progress</span>
            <span className="task-count">
              {tasks.filter(task => task.taskType === 'Progress').length}
            </span>
          </div>
          <ul className="task-list">
            {tasks.filter(task => task.taskType === 'Progress').length > 0 ? (
              tasks.filter(task => task.taskType === 'Progress').map((task, index) => (
                <li className="task-card" key={index}>
                  <div className="task-priority priority-medium"></div>
                  <h3>{task.taskName}</h3>
                  <div className="task-footer">
                    <div className="task-actions">
                      <button onClick={() => startEdit(task)}>Edit</button>
                      <button 
                        className="secondary"
                        onClick={() => updateStatus(task._id, 'Pending')}
                      >
                        Move Back
                      </button>
                      <button 
                        onClick={() => updateStatus(task._id, 'Completed')}
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="empty-state">
                <p>No tasks in progress</p>
              </div>
            )}
          </ul>
        </div>

        {/* Completed Tasks */}
        <div className="column">
          <div className="column-header Completed">
            <span>Completed</span>
            <span className="task-count">
              {tasks.filter(task => task.taskType === 'Completed').length}
            </span>
          </div>
          <ul className="task-list">
            {tasks.filter(task => task.taskType === 'Completed').length > 0 ? (
              tasks.filter(task => task.taskType === 'Completed').map((task, index) => (
                <li className="task-card" key={index}>
                  <div className="task-priority priority-low"></div>
                  <h3>{task.taskName}</h3>
                  <div className="task-footer">
                    <div className="task-actions">
                      <button onClick={() => startEdit(task)}>Edit</button>
                      <button 
                        className="secondary"
                        onClick={() => updateStatus(task._id, 'Progress')}
                      >
                        Reopen
                      </button>
                      <button onClick={() => deleteTask(task._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="empty-state">
                <p>No completed tasks yet</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

