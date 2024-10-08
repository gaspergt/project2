import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NotaForm = () => {
  const [nota, setNota] = useState({
    estudiante: '',
    actividades: '',
    primerParcial: '',
    segundoParcial: '',
    examenFinal: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadNota();
    }
  }, [id]);

  const loadNota = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/notas/${id}`);
      setNota(result.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar la nota',
        text: 'Hubo un problema al obtener los datos de la nota.',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/notas/${id}`, nota);
        Swal.fire('Actualizado', 'La nota ha sido actualizada exitosamente', 'success');
      } else {
        await axios.post('http://localhost:8080/api/notas', nota);
        Swal.fire('Guardado', 'La nota ha sido guardada exitosamente', 'success');
      }
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.length > 0) {
        // Extraer los mensajes de error de validación desde el servidor y mostrarlos en SweetAlert
        const errorMsg = error.response.data
          .map(err => `${err.defaultMessage}`)
          .join(', ');
        Swal.fire({
          icon: 'error',
          title: 'Error de validación:',
          text: errorMsg,
        });
      } else if (error.request) {
        // Si no hay respuesta del servidor
        Swal.fire({
          icon: 'error',
          title: 'Error de red:',
          text: 'No se pudo conectar con el servidor.',
        });
      } else {
        // Otros errores
        Swal.fire({
          icon: 'error',
          title: 'Error desconocido:',
          text: error.message
        });
      }
    }
  };

  const handleInputChange = (e) => {
    setNota({ ...nota, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Nota' : 'Agregar Nota'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Estudiante</label>
          <input
            type="text"
            className="form-control"
            name="estudiante"
            value={nota.estudiante}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Actualizar Nota</button>
      </form>
    </div>
  );
};

export default NotaForm;
