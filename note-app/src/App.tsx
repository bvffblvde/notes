import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NotesListPage from './pages/NotesListPage';
import NoteFormPage from './pages/NoteFormPage';
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" Component={NotesListPage}/>
                    <Route path="/notes/:id" Component={NoteFormPage}/>
                    <Route path="/new" Component={NoteFormPage}/>
                </Routes>
            </ErrorBoundary>
        </Router>
    );
};

export default App;
