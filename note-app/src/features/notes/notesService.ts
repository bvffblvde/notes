// notesService.ts

import axios from 'axios';
import { Note } from './notesSlice';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// Функція для отримання всіх заміток з сервера
export const fetchNotesFromApi = async () => {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
};


// Функція для створення нової замітки на сервері
export const createNoteOnServer = async (noteData: Omit<Note, "id">) => {
    const response = await axios.post(`${BASE_URL}`, noteData);
    return response.data;
};

// Функція для оновлення існуючої замітки на сервері
export const updateNoteOnServer = async (noteData: Note) => {
    const response = await axios.put(`${BASE_URL}/${noteData.id}`, noteData);
    return response.data;
};

export const deleteNoteFromServer = async (noteId: number) => {
    const response = await axios.delete(`${BASE_URL}/${noteId}`);
    return response.data;
};

