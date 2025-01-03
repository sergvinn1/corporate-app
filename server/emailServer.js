const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// Налаштування Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sergvinn2008@gmail.com", // Ваш Gmail
    pass: "dwrv fypk lrst hglr",   // Пароль програми
  },
});

// Тимчасовий масив заявок для тестування
let requests = [
  { id: 1, email: "client1@example.com", status: "pending" },
  { id: 2, email: "client2@example.com", status: "approved" },
  { id: 3, email: "client3@example.com", status: "rejected" },
];

// Обробка запиту на отримання заявок
app.get("/requests", (req, res) => {
  const status = req.query.status;

  if (status === "all") {
    res.json(requests); // Повертаємо всі заявки
  } else {
    const filteredRequests = requests.filter((request) => request.status === status);
    res.json(filteredRequests); // Повертаємо заявки із вказаним статусом
  }
});

// Обробка запиту на відправлення email
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to,
      subject,
      text,
    });
    res.status(200).send("Лист успішно надіслано");
  } catch (error) {
    console.error("Помилка відправлення листа:", error);
    res.status(500).send("Не вдалося надіслати лист");
  }
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
