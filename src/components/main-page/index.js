import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate, useNavigation } from 'react-router';

const MainPage = () => {
  const navigate = useNavigate();

  const handleOpenToDoList = () => {
    navigate('/talha');
  };

  return (
    <div>
      <h1 onClick={handleOpenToDoList}>Open ToDoList</h1>
    </div>
  );
};

export default MainPage;
