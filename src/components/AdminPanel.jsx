import React, { useState, useEffect } from "react";
import { approveRequest, rejectRequest, fetchRequests } from "../actions/requestActions";

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
    }
  };

  const handleApprove = async (id, email) => {
    try {
      await approveRequest(id, email);
      loadRequests();
    } catch (error) {
      console.error("Помилка при підтвердженні запиту:", error);
    }
  };

  const handleReject = async (id, email) => {
    try {
      await rejectRequest(id, email);
      loadRequests();
    } catch (error) {
      console.error("Помилка при відхиленні запиту:", error);
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
