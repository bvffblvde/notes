import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import {createNoteOnServer, updateNoteOnServer, deleteNoteFromServer, fetchNotesFromApi} from './notesService';

export interface Note {
    id: number;
    title: string;
    body: string;
}

interface NotesState {
    notes: Note[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: NotesState = {
    notes: [],
    status: 'idle',
    error: null,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        getNotesStart(state) {
            state.status = 'loading';
        },
        getNotesSuccess(state, action: PayloadAction<Note[]>) {
            state.status = 'succeeded';
            state.notes = action.payload;
        },
        getNotesFailure(state, action: PayloadAction<string>) {
            state.status = 'failed';
            state.error = action.payload;
        },
        addNote(state, action: PayloadAction<Note>) {
            state.notes.push(action.payload);
        },
        updateNote(state, action: PayloadAction<Note>) {
            const updatedNote = action.payload;
            state.notes = state.notes.map((note) =>
                note.id === updatedNote.id ? { ...note, ...updatedNote } : note
            );
        },
        deleteNote(state, action: PayloadAction<number>) {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
    },
});

export const {
    getNotesStart,
    getNotesSuccess,
    getNotesFailure,
    addNote,
    updateNote,
    deleteNote,
} = notesSlice.actions;

export default notesSlice.reducer;

export const fetchNotes = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getNotesStart());
        const notes = await fetchNotesFromApi();
        dispatch(getNotesSuccess(notes));
    } catch (error) {
        // @ts-ignore
        dispatch(getNotesFailure(error.toString()));
    }
};


export const createNote = (noteData: Omit<Note, 'id'>): AppThunk => async (dispatch, getState) => {
    try {
        const state = getState() as RootState;
        const { notes } = state.notes;

        // Определяем максимальный существующий ID заметки
        const maxId = notes.reduce((max, note) => (note.id > max ? note.id : max), 0);

        const newNoteData = await createNoteOnServer(noteData);

        // Создаем новую заметку с увеличенным ID
        const newNote: Note = {
            ...newNoteData,
            id: maxId + 1,
        };

        dispatch(addNote(newNote)); // Добавляем новую заметку в хранилище
    } catch (error) {
        console.error('Failed to create note:', error);
    }
};

export const updateNoteById = (noteData: Note): AppThunk => async (dispatch) => {
    try {
        await updateNoteOnServer(noteData);
        dispatch(updateNote(noteData));
    } catch (error) {
        console.error('Failed to update note:', error);
    }
};

export const deleteNoteById = (noteId: number): AppThunk => async (dispatch) => {
    try {
        await deleteNoteFromServer(noteId);
        dispatch(deleteNote(noteId));
    } catch (error) {
        console.error('Failed to delete note:', error);
    }
};
