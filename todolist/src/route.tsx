import { Route, Routes } from "react-router-dom";
import LoginPage from "./Login";
import PrivateRoute from "./auth/PrivateRoute";
import GetToDoListClass from "./GetToDoList";
import { Login } from "./services/todolistapi";

export const AppRoutes = (
    <>
         <Routes>
         <Route path="/" element={<PrivateRoute component={GetToDoListClass} path={undefined} />} />
         <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<PrivateRoute component={GetToDoListClass} path={undefined} />} />
           </Routes>
    </>
    );
