const API_URL = "http://localhost:5000/requests"; // Змінити URL на ваш API, якщо потрібно

// Функція для отримання заявок
export const fetchRequests = async (filter) => {
  try {
    const response = await fetch(`${API_URL}?status=${filter}`);
    if (!response.ok) {
      throw new Error("Помилка при завантаженні заявок");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка у fetchRequests:", error);
    return [];
  }
};

// Функція для підтвердження заявки
export const approveRequest = async (id, email) => {
  try {
    const response = await fetch(`${API_URL}/${id}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Помилка при підтвердженні запиту");
    }
    console.log(`Запит із ID ${id} підтверджено, повідомлення надіслано на ${email}`);
  } catch (error) {
    console.error("Помилка у approveRequest:", error);
  }
};

// Функція для відхилення заявки
export const rejectRequest = async (id, email) => {
  try {
    const response = await fetch(`${API_URL}/${id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Помилка при відхиленні запиту");
    }
    console.log(`Запит із ID ${id} відхилено, повідомлення надіслано на ${email}`);
  } catch (error) {
    console.error("Помилка у rejectRequest:", error);
  }
};
