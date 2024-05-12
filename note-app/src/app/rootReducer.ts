import {Action, combineReducers, ThunkAction} from '@reduxjs/toolkit';
import notesReducer from '../features/notes/notesSlice';
import store from "./store";

const rootReducer = combineReducers({
    notes: notesReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Експортуйте тип RootState

export type AppThunk = ThunkAction<void, RootState, null, Action>;

export default rootReducer;
