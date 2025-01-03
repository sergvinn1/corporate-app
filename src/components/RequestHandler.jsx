// src/components/RequestHandler.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import sendEmail from "../email/emailSender";

const RequestHandler = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "requests"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (id, email) => {
    const requestRef = doc(db, "requests", id);
    await updateDoc(requestRef, { status: "approved" });
    sendEmail(email, "Ваш запит підтверджено", "Ваш запит було підтверджено адміністратором.");
  };

  const handleReject = async (id, email) => {
    const requestRef = doc(db, "requests", id);
    await updateDoc(requestRef, { status: "rejected" });
    sendEmail(email, "Ваш запит відхилено", "На жаль, ваш запит було відхилено.");
  };

  return (
    <div>
      {requests.map((request) => (
        <div key={request.id}>
          <p>{request.name}</p>
          <p>{request.email}</p>
          <p>{request.date}</p>
          <p>{request.time}</p>
          <button onClick={() => handleApprove(request.id, request.email)}>Підтвердити</button>
          <button onClick={() => handleReject(request.id, request.email)}>Відхилити</button>
        </div>
      ))}
    </div>
  );
};

export default RequestHandler;
