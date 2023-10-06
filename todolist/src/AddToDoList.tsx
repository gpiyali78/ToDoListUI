import { FC, useState } from "react";
import { TaskListRequest } from "./model/addtodolist";
import { addTask } from "./services/todolistapi";

interface AddToDoListFormProps {
    onInsert: (data: string) => void;
    onCancel: () => void; 
}

export const AddToDoList: FC<AddToDoListFormProps> = ({onInsert, onCancel }) => {
    //States
    const [taskName, settaskName] = useState("");
    const [description, setdescription] = useState("");
    const [taskStartDate, settaskStartDate] = useState("");
    const [taskEndDate, settaskEndDate] = useState("");
    const [totalEffortRequired, settotalEffortRequired] = useState("");

    const clearForm = () => {
        settaskName("");
        setdescription("");
        settaskStartDate("");   
        settaskEndDate("");
        settotalEffortRequired("");
    }

    const clearAndCloseInsertForm = () => {
        clearForm();
        onCancel();
    }

    const inserttasks = () => {
     const taskModel: TaskListRequest = {
      taskName: taskName,
      description: description,
      taskStartDate: new Date(taskStartDate),
      taskEndDate: new Date(taskEndDate),
      totalEffortRequired: totalEffortRequired
    };
      addTask(taskModel)
      .then((response) => {
        console.info(response);
        onInsert("");
      })
      .finally(() => {
      });
      };
        
    //Render
    return(

<div>
        <div className="form-container">            
            <table>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Task Start Date</th>
                        <th>Task End Date</th>
                        <th>Total Effort Required</th>
                        </tr>
                </thead>
                <tbody>
                                         
                    <tr>
                        <td>                            
                        <input type="text"                                 
                                value={taskName}
                                placeholder="Task Name"  
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>settaskName(e.currentTarget.value)}>                                    
                            </input>                                                           
                        </td>
                        <td>
                            <input type="text"                                 
                                value={description}
                                placeholder="Description" 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setdescription(e.currentTarget.value)}>                                    
                            </input>
                        </td>
                        <td>
                            <input type="text" 
                             value={taskStartDate}
                             placeholder="Task Start Date" 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>settaskStartDate(e.currentTarget.value)}>                                    
                            </input>
                        </td>
                        <td>
                            <input type="text" 
                             value={taskEndDate}
                             placeholder="Task End Date" 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>settaskEndDate(e.currentTarget.value)}>                                    
                            </input>
                        </td>
                        <td>
                            <input type="text" 
                             value={totalEffortRequired}
                             placeholder="Total Effort Required" 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>settotalEffortRequired(e.currentTarget.value)}>                                    
                            </input>
                        </td>
                    </tr>
                </tbody>
            </table>                    
        </div>
        <div className="formfooter">
        <button
          id="btnCancel"
          slot="trigger"
          onClick={() => clearAndCloseInsertForm()}
        >
          Cancel
        </button>
        <button
          onClick={() => inserttasks()}
        >
          Save
        </button>
      </div>
      </div>
    )
}