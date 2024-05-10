import React from 'react';
import {Note} from '../features/notes/notesSlice';
import {Link} from 'react-router-dom';
import {Grid, Card, CardContent, Typography, Button, Box} from '@mui/material';
import {DeleteOutline, EditOutlined} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {deleteNoteById} from '../features/notes/notesSlice';

interface NoteListProps {
    notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({notes}) => {
    const dispatch = useDispatch();

    const handleDeleteNote = (noteId: number) => {
        // @ts-ignore
        dispatch(deleteNoteById(noteId));
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {notes.map((note) => (
                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%'
                            }}>
                                <Box>
                                    <Link to={`/notes/${note.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                        <Typography variant="h6" sx={{ '&:hover': { color: 'cornflowerblue' } }}>
                                            {note.title}
                                        </Typography>
                                    </Link>
                                    <Typography variant="body2">{note.body}</Typography>
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        component={Link}
                                        startIcon={<EditOutlined/>}
                                        to={`/notes/${note.id}`}
                                        style={{marginTop: '10px'}}
                                    >
                                        Редагувати
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteNote(note.id)}
                                        startIcon={<DeleteOutline/>}
                                        style={{marginTop: '10px'}}
                                    >
                                        Видалити
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default NoteList;

