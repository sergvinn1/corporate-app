import React, { useState } from "react";
import { db } from "../firebase"; // Переконайтеся, що у вас є правильна конфігурація Firebase
import { collection, addDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
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
      setFormData({ name: "", email: "", date: "", time: "" }); // Очистити форму після успішного відправлення
    } catch (error) {
      toast.error("Сталася помилка. Спробуйте ще раз.");
      console.error("Помилка надсилання запиту:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          name="name" 
          placeholder="Ваше ім'я" 
          value={formData.name}
          onChange={handleChange} 
          required 
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Ваш Email" 
          value={formData.email}
          onChange={handleChange} 
          required 
        />
        <input 
          name="date" 
          type="date" 
          value={formData.date}
          onChange={handleChange} 
          required 
        />
        <input 
          name="time" 
          type="time" 
          value={formData.time}
          onChange={handleChange} 
          required 
        />
        <button type="submit">Записатися</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ClientForm;