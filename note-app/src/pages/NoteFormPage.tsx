import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, createNote } from '../features/notes/notesSlice';
import NoteForm, { NoteFormProps } from '../components/NoteForm'; // Импортируем интерфейс NoteFormProps
import { RootState } from '../app/store';
import { Note } from '../features/notes/notesSlice';

const NoteFormPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Получаем параметр id из URL

    // Получаем список всех заметок из хранилища
    const notes = useSelector((state: RootState) => state.notes.notes);

    // Определяем существующую заметку по ID из URL
    const existingNote = notes.find((note) => note.id === Number(id));

    const handleSaveNote = (noteData: Omit<Note, 'id'>) => {
        if (!noteData.title.trim() || !noteData.body.trim()) {
            return; // Предотвращаем сохранение пустой заметки
        }

        if (existingNote) {
            // Если заметка существует, обновляем её
            dispatch(
                updateNote({
                    ...existingNote,
                    title: noteData.title,
                    body: noteData.body,
                })
            );
        } else {
            // Иначе создаем новую заметку с данными из формы
            // @ts-ignore
            dispatch(createNote({id: Date.now(), // Генерируем уникальный ID для новой заметки
                    title: noteData.title,
                    body: noteData.body,
                })
            );
        }

        navigate('/');
    };

    // Свойства, которые будут переданы в NoteForm
    const noteFormProps: NoteFormProps = {
        initialNote: existingNote,
        // @ts-ignore
        onSave: handleSaveNote,
    };

    return (
        <div>
            <NoteForm {...noteFormProps} />
        </div>
    );
};

export default NoteFormPage;

