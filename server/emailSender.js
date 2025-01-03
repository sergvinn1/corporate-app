// server/emailSender.js

const sendEmail = async (to, subject, text) => {
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, text }),
      });
  
      if (!response.ok) {
        throw new Error("Не вдалося надіслати лист");
      }
  
      console.log("Лист успішно надіслано");
    } catch (error) {
      console.error("Помилка надсилання листа:", error);
    }
  };
  
  export default sendEmail;