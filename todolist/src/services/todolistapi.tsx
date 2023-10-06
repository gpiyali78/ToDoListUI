import { TaskListRequest } from "../model/addtodolist";
import { TaskListResponse } from "../model/gettodolist";
import { LoginModel } from "../model/login";

const apiUrl = "https://fetchtodolistfunc.azurewebsites.net/";

let token="";
    const tokenString: string | null = localStorage.getItem('token');

    if (tokenString !== null) {
      // Token is not null, you can safely use it
      const tokenObject = JSON.parse(tokenString);
      token = tokenObject.token;
      console.log(token);  
    } else {
      // Handle the case where the token is null (e.g., not found in local storage)
      console.log("Token not found in local storage");
    }

//get to do list list
export async function GetToDoList(): Promise<TaskListResponse[]> {
  try { 
        const response = await fetch(apiUrl +"api/getall", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      console.log("Error: " + response.statusText);
      throw new Error(response.statusText);
    }
    console.log("response ", response);
    return await response.json();
  }
  catch (error: any) {
    console.log("error while calling the api ", error);
    throw new Error("API Call failed: " + error.message +"");
  }
}

 // Define a function to add a new task using the API
 export async function addTask(task:TaskListRequest): Promise<string> {
  try {
    // Make a POST request to the API with the task data
    const response = await fetch(apiUrl + "api/add-task", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(task)
    })

    if (!response.ok) {
      console.log("Error: " + response.statusText);
      throw new Error(response.statusText);
    }
    console.log("response ", response);
    return await response.json();
  }
  catch (error: any) {
    console.log("error while calling the api ", error);
    throw new Error("API Call failed: " + error.message +"");
  }
}

export async function completeTask(taskid:string): Promise<string> {
  try {
    // Make a POST request to the API with the task data
    const response = await fetch(apiUrl + "api/update-task/" + taskid , {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`
      }
    })

    if (!response.ok) {
      console.log("Error: " + response.statusText);
      throw new Error(response.statusText);
    }
    console.log("response ", response);
    return await response.json();
  }
  catch (error: any) {
    console.log("error while calling the api ", error);
    throw new Error("API Call failed: " + error.message +"");
  }
}

export async function DeleteTask(taskid:string): Promise<string> {
  try {
    // Make a POST request to the API with the task data
    const response = await fetch(apiUrl + "api/delete-product/" + taskid, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`
      }
    })

    if (!response.ok) {
      console.log("Error: " + response.statusText);
      throw new Error(response.statusText);
    }
    console.log("response ", response);
    return await response.json();
  }
  catch (error: any) {
    console.log("error while calling the api ", error);
    throw new Error("API Call failed: " + error.message +"");
  }
}

export async function Login(login:LoginModel) :Promise<string>{
  try {
    // Make a POST request to the API with the task data
    const response = await fetch("https://authenticationfunc.azurewebsites.net/api/auth?", {
      method: "POST",
      headers: {
        //"Access-Control-Allow-Origin": "*",
        //"Content-Type": "application/json",
        //  'Accept': 'application/json',
      },
      body: JSON.stringify(login)
    })

    if (!response.ok) {
      console.log("Error: " + response.statusText);
      throw new Error(response.statusText);
    }
    console.log("response ", response);
    return await response.json();
  }
  catch (error: any) {
    console.log("error while calling the api ", error);
    throw new Error("API Call failed: " + error.message +"");
  }
}