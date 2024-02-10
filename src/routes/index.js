import {
  Route,
  Routes
} from 'react-router-dom';
import ToDoList from '../components/to-do-list';
import MainPage from '../components/main-page';

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/talha" element={<ToDoList />} />
  </Routes>
);

export default AuthRoutes;
