import { db } from '../services/firebaseConfig';

export const fetchQuestions = async () => {
  const snapshot = await db.collection('questions').get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const saveScore = async (name, score, attempted) => {
  await db.collection('scores').add({
    name,
    score,
    attempted,
    createdAt: new Date(),
  });
};
