import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { AppRoutes } from './route';

function App() {
  return (
    <BrowserRouter children={AppRoutes} basename={"/"} />        

  );
}

export default App;
