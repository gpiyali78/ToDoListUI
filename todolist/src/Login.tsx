import { useState } from 'react';
import { LoginModel } from './model/login';
import { Login, } from './services/todolistapi';
import GetToDoListClass from './GetToDoList';
import React from 'react';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    //event.preventDefault();
    // TODO: handle login logic
    const userCred: LoginModel = {
        user: username,
        password: password
      };
    const res=await Login(userCred);
    //res="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE2NzQ4NzgsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTEzMiIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTEzMiJ9.qhhpHSLPn-xSUTbiPd2iRvLcKg-d1QmKcFH2JRPFk_k"    "
    const tokenString = JSON.stringify(res); // Convert to a string if needed
    localStorage.setItem('token', tokenString);
    <GetToDoListClass/>;
    navigate('/home');
   //history.push('/'); // redirect to the GetToDoListClass component
  }

  return (
    <div>
      <h1>Login Page</h1>
        <label>
          UserName:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>Login</button>
    </div>
  );
}