import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Note} from '../features/notes/notesSlice';
import {useNavigate} from 'react-router-dom';

export interface NoteFormProps {
    initialNote?: Note;
    onSave: (updatedNote: Note) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({initialNote, onSave}) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: initialNote?.title || '',
            body: initialNote?.body || '',
        },
        validationSchema: yup.object().shape({
            title: yup.string().required('Введите заголовок заметки'),
            body: yup.string().required('Введите описание заметки'),
        }),
        onSubmit: (values) => {
            const updatedNote: Note = {
                id: initialNote?.id || Date.now(),
                title: values.title,
                body: values.body,
            };
            onSave(updatedNote);
            formik.resetForm(); // Сброс формы после сохранения
        },
    });


    const handleBack = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <div>
                <Typography variant="h4" gutterBottom>
                    {initialNote ? 'Редагувати' : 'Створити'} заметку
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="title"
                        name="title"
                        label="Заголовок"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="body"
                        name="body"
                        label="Опис"
                        value={formik.values.body}
                        onChange={formik.handleChange}
                        error={formik.touched.body && Boolean(formik.errors.body)}
                        helperText={formik.touched.body && formik.errors.body}
                        multiline
                        fullWidth
                        rows={4}
                        margin="normal"
                    />
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                        <Button type="submit" variant="contained" color="primary">
                            {initialNote ? 'Оновити' : 'Створити'}
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleBack}>
                            Назад
                        </Button>
                    </Box>
                </form>
            </div>
        </Box>
    );
};

export default NoteForm;
