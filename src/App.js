import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotaList from './components/NotaList';
import NotaForm from './components/NotaForm';

function App() {
  return (
    <div className="container">
      <h1 className="text-center mt-4">Gestión de Notas</h1>
      <Routes>  {}
        <Route path="/" element={<NotaList />} />
        <Route path="/add" element={<NotaForm />} />
        <Route path="/edit/:id" element={<NotaForm />} />
      </Routes>
    </div>
  );
}

export default App;
