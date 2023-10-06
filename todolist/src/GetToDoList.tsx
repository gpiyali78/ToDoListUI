import { useEffect, useState } from "react";
import { AddToDoList } from "./AddToDoList";
import { TaskListResponse } from "./model/gettodolist";
import React from "react";
import { GetToDoList } from "./services/todolistapi";
import Modal from 'react-modal';
import './GetToDoList.css';

export  default function GetToDoListClass()
{
    const [todolist, settodolist] = useState<TaskListResponse[]>([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
  
    function closeModal() {
      setIsOpen(false);
    }
    const onInsertHandler = (data: string) => {
      console.info("rule inserted: " + data);
      //setNumRules(numRules - 1);
      closeModal();
      fetchtodolist();
  };
  
  const onCancelHandler = () => {
    //console.info("rule deleted: " + data);
    //setNumRules(numRules - 1);
    closeModal();
  };
  
  useEffect(() => {
    fetchtodolist();
  }, []);
  
  async function fetchtodolist() {
    try {
      const response = await GetToDoList();
      settodolist(response);
    } catch (error) {
      console.error(error);
    }
  }
    
  async function callCompleteTask(taskId: string) {
    try { 
      fetchtodolist();          
  }
  catch (e: any) {
      //setADGroup("not authorized");
      console.log("error " + e);
  }
  }
  
  async function callDeleteTask(taskId: string) {
    try {
      fetchtodolist();          
  }
  catch (e: any) {
      //setADGroup("not authorized");
      console.log("error " + e);
  }
  }
  
    const tableData = todolist.map((row) => ({
          "TaskId": row.taskId,
          "TaskName": row.taskName,
          "Description": row.description,
          "TaskStartDate": new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }).format(new Date(row.taskStartDate)),
          "TaskEndDate": new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            }).format(new Date(row.taskEndDate)),
          "TaskStatus": row.taskStatus,
          "TotalEffortRequired": row.totalEffortRequired
        }));
  
        const columnHeaders = [
          "Task ID",
          "Task Name",
          "Description",
          "Task Start Date",
          "Task End Date",
          "TaskStatus",
          "TotalEffortRequired",
          "",
          ""
        ];
    const renderTable=(<table className='tableStyle'>
        <thead>
          <tr key="header">
          {
              columnHeaders.map((row,index) => (
                  <td key={index} className="header-cell">{row}</td>                                             
              ))
          }
         </tr>
        </thead>
        <tbody>
            {
              tableData.length ===0 ? <tr><td colSpan={9}>No data found</td></tr>:
                tableData.map((row, index) => (
                <tr key={index}>
                    <td>{row.TaskId}</td>
                    <td>{row.TaskName}</td>
                    <td>{row.Description}</td>
                    <td>{row.TaskStartDate}</td>
                    <td>{row.TaskEndDate}</td>
                    <td>{row.TaskStatus}</td>                            
                    <td>{row.TotalEffortRequired}</td> 
                    <td><button className="button" onClick={()=>callCompleteTask(row.TaskId)}>Complete</button></td>
                    <td><button className="button" onClick={()=>callDeleteTask(row.TaskId)}>Delete</button></td>                
                </tr>))
            }                                           
        </tbody>
    </table>);
  
    return (
      <div className="container">
        <div className="item1">
          <div className="Titlebar">
                <header className="header">
            <h1 className="HeaderClass">TO DO List</h1>
            <a href="/login" style={{ paddingLeft: '500px' }}>Logout</a>
                </header>
            </div>
            </div>
          <div className="item3">
            <button className="button" onClick={openModal}>Add Task</button>
            </div>
          <div className="item2">
        {renderTable}
        </div>
        <Modal
        id="modal"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add New Task"
          style={{ content: { height: '200px',width:'1000px' } }}
        >
          <AddToDoList
          onInsert = {(data: string) => onInsertHandler(data) }
          onCancel={ () => onCancelHandler() } />
        </Modal>  
      </div>
    );
}