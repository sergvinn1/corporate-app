import { db } from "../firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";

// Переконайтеся, що шлях до emailSender.js правильний
import sendEmail from "../../server/emailSender";

export const fetchRequests = async (filter) => {
  const q = filter === "all"
    ? query(collection(db, "requests"))
    : query(collection(db, "requests"), where("status", "==", filter));

  const querySnapshot = await getDocs(q);
  const requests = [];
  querySnapshot.forEach((doc) => {
    requests.push({ id: doc.id, ...doc.data() });
  });

  return requests;
};

export const approveRequest = async (id, email) => {
  const requestRef = doc(db, "requests", id);
  await updateDoc(requestRef, { status: "approved" });
  sendEmail(email, "Ваш запит підтверджено", "Ваш запит було підтверджено адміністратором.");
};

export const rejectRequest = async (id, email) => {
  const requestRef = doc(db, "requests", id);
  await updateDoc(requestRef, { status: "rejected" });
  sendEmail(email, "Ваш запит відхилено", "На жаль, ваш запит було відхилено.");
};