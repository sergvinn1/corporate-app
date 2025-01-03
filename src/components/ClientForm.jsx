// src/components/ClientForm.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "requests"), { ...formData, status: "pending" });
      toast.success("Ваш запит успішно надіслано!");
    } catch (error) {
      toast.error("Сталася помилка. Спробуйте ще раз.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Ваше ім'я" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Ваш Email" onChange={handleChange} required />
      <input name="date" type="date" onChange={handleChange} required />
      <input name="time" type="time" onChange={handleChange} required />
      <button type="submit">Записатися</button>
    </form>
  );
};

export default ClientForm;
