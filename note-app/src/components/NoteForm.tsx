import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Note} from '../features/notes/notesSlice';

export interface NoteFormProps {
    initialNote?: Note; // Начальная заметка для редактирования
    onSave: (updatedNote: Note) => void; // Функция сохранения обновленной заметки
}

const NoteForm: React.FC<NoteFormProps> = ({initialNote, onSave}) => {
    const [title, setTitle] = useState(initialNote?.title || '');
    const [body, setBody] = useState(initialNote?.body || '');
    const navigate = useNavigate();

    // Обновление полей формы при изменении начальной заметки
    useEffect(() => {
        if (initialNote) {
            setTitle(initialNote.title);
            setBody(initialNote.body);
        }
    }, [initialNote]);

    const handleSave = () => {
        if (!title.trim() || !body.trim()) {
            return; // Предотвращаем сохранение пустой заметки
        }

        const updatedNote: Note = {
            id: initialNote?.id || Date.now(), // Используем существующий ID или временный ID для новой заметки
            title,
            body,
        };

        onSave(updatedNote); // Вызываем функцию onSave для сохранения обновленной заметки

        // Очищаем поля после сохранения
        setTitle('');
        setBody('');
    };

    const handleBack = () => {
        navigate('/');
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh', // Центрирование по вертикали
                padding: '20px',
            }}
        >
            <div>
                <Typography variant="h4" gutterBottom>{initialNote ? 'Редагувати' : 'Створити'} замітку</Typography>
                <TextField
                    label="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Опис"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    multiline
                    fullWidth
                    rows={4}
                    margin="normal"
                />
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        {initialNote ? 'Оновити' : 'Створити'}
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleBack}>
                        Повернутися до списку
                    </Button>
                </Box>
            </div>
        </Box>
    );
};

export default NoteForm;

