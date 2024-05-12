import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchNotes, Note } from '../features/notes/notesSlice';
import NoteList from '../components/NoteList';
import { Backdrop, Box, Button, CircularProgress, Typography, Select, MenuItem, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NotesListPage: React.FC = () => {
    const dispatch = useDispatch();
    const { notes, status } = useSelector((state: RootState) => state.notes);
    const [visibleNotes, setVisibleNotes] = useState<Note[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortBy, setSortBy] = useState<'titleAsc' | 'titleDesc' | 'idOld' | 'idNew'>('titleAsc');

    useEffect(() => {
        if (status === 'idle') {
            // @ts-ignore
            dispatch(fetchNotes());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (notes) {
            let updatedVisibleNotes = [...notes];

            switch (sortBy) {
                case 'titleAsc':
                    updatedVisibleNotes.sort((a, b) => (sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
                    break;
                case 'titleDesc':
                    updatedVisibleNotes.sort((a, b) => (sortOrder === 'asc' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)));
                    break;
                case 'idOld':
                    updatedVisibleNotes.sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));
                    break;
                case 'idNew':
                    updatedVisibleNotes.sort((a, b) => (sortOrder === 'asc' ? b.id - a.id : a.id - b.id));
                    break;
                default:
                    break;
            }

            setVisibleNotes(updatedVisibleNotes);
        }
    }, [notes, sortOrder, sortBy]);

    const handleSort = (value: string) => {
        setSortBy(value as 'titleAsc' | 'titleDesc' | 'idOld' | 'idNew');
        setSortOrder('asc');
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Список заміток
            </Typography>
            <Grid container spacing={2} alignItems="flex-end" justifyContent="space-between" marginBottom="20px">
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" component="span" sx={{ marginRight: '10px' }}>Сортувати:</Typography>
                    <Select
                        value={sortBy}
                        onChange={(e) => handleSort(e.target.value as string)}
                        variant="outlined"
                        fullWidth
                    >
                        <MenuItem value="titleAsc">За алфавітом (А-Я)</MenuItem>
                        <MenuItem value="titleDesc">За алфавітом (Я-А)</MenuItem>
                        <MenuItem value="idOld">По ID (старі)</MenuItem>
                        <MenuItem value="idNew">По ID (нові)</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'right' }}>
                    <Button variant="outlined" color="secondary" component={Link} to="/new">
                        <Add />
                        Додати замітку
                    </Button>
                </Grid>
            </Grid>
            {status === 'loading' && (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            {status === 'failed' && <p>Помилка при завантаженні заміток.</p>}
            <div>
                <NoteList notes={visibleNotes} />
            </div>
        </Box>
    );
};

export default NotesListPage;

