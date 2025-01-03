// src/components/AdminPanel.jsx

import React, { useState, useEffect } from "react";
import { approveRequest, rejectRequest, fetchRequests } from "../actions/requestActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadRequests();
  }, [filter]);

  const loadRequests = async () => {
    try {
      const data = await fetchRequests(filter);
      setRequests(data);
    } catch (error) {
      console.error("Помилка при завантаженні заявок:", error);
      toast.error("Не вдалося завантажити заявки.");
    }
  };

  const handleApprove = async (id, email) => {
    try {
      await approveRequest(id, email);
      toast.success("Запит підтверджено.");
      loadRequests();
    } catch (error) {
      console.error("Помилка при підтвердженні запиту:", error);
      toast.error("Не вдалося підтвердити запит.");
    }
  };

  const handleReject = async (id, email) => {
    try {
      await rejectRequest(id, email);
      toast.success("Запит відхилено.");
      loadRequests();
    } catch (error) {
      console.error("Помилка при відхиленні запиту:", error);
      toast.error("Не вдалося відхилити запит.");
    }
  };

  return (
    <div>
      <h1>Панель адміністратора</h1>
      <div>
        <button onClick={() => setFilter("all")}>Усі</button>
        <button onClick={() => setFilter("pending")}>Очікують</button>
        <button onClick={() => setFilter("approved")}>Підтверджені</button>
        <button onClick={() => setFilter("rejected")}>Відхилені</button>
      </div>

      <ul>
        {requests.length === 0 ? (
          <p>Немає заявок для відображення</p>
        ) : (
          requests.map((request) => (
            <li key={request.id}>
              <p>Ім'я: {request.name}</p>
              <p>Email: {request.email}</p>
              <p>Статус: {request.status}</p>
              <button onClick={() => handleApprove(request.id, request.email)}>Підтвердити</button>
              <button onClick={() => handleReject(request.id, request.email)}>Відхилити</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminPanel;