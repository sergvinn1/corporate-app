// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Імпортуємо маршрутизацію
import { ToastContainer } from "react-toastify";  // Імпортуємо контейнер для повідомлень
import ClientForm from "./components/ClientForm";  // Ваш компонент форми клієнта
import AdminPanel from "./components/AdminPanel";  // Ваш компонент панелі адміністратора

const App = () => {
  return (
    <Router>  {/* Огортаємо все в Router для підтримки маршрутизації */}
      <div>
        <ToastContainer />  {/* Контейнер для відображення сповіщень */}
        
        {/* Налаштування маршрутів */}
        <Routes>
          <Route path="/" element={<ClientForm />} />  {/* Основна сторінка */}
          <Route path="/admin" element={<AdminPanel />} />  {/* Панель адміністратора */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
