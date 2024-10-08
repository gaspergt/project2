import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const NotaForm = () => {
  const [nota, setNota] = useState({
    estudiante: '',
    actividades: '',
    primerParcial: '',
    segundoParcial: '',
    examenFinal: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadNota();
    }
  }, [id]);

  const loadNota = async () => {
    const result = await axios.get(`http://localhost:8080/api/notas/${id}`);
    setNota(result.data);
  };

  const onInputChange = e => {
    setNota({ ...nota, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/notas/${id}`, nota);
      } else {
        await axios.post('http://localhost:8080/api/notas', nota);
      }
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data) {
        // Si hay un error de validación desde el backend
        const errorMessage = error.response.data.map(err => err.defaultMessage).join('\n');
        alert(`Error de validación:\n${errorMessage}`);
      } else {
        alert('Ocurrió un error inesperado.');
      }
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Editar Nota' : 'Agregar Nota'}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Estudiante</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del estudiante"
            name="estudiante"
            value={nota.estudiante}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Actividades</label>
          <input
            type="number"
            className="form-control"
            name="actividades"
            value={nota.actividades}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Primer Parcial</label>
          <input
            type="number"
            className="form-control"
            name="primerParcial"
            value={nota.primerParcial}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Segundo Parcial</label>
          <input
            type="number"
            className="form-control"
            name="segundoParcial"
            value={nota.segundoParcial}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Examen Final</label>
          <input
            type="number"
            className="form-control"
            name="examenFinal"
            value={nota.examenFinal}
            onChange={onInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Actualizar Nota' : 'Agregar Nota'}
        </button>
      </form>
    </div>
  );
};

export default NotaForm;
