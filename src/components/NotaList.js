import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const NotaList = () => {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    loadNotas();
  }, []);

  const loadNotas = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/notas');
      setNotas(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNota = async (id) => {
    const confirmResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/notas/${id}`);
        Swal.fire('Eliminado', 'La nota ha sido eliminada.', 'success');
        loadNotas();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Notas</h2>
      <Link to="/add" className="btn btn-success mb-3">Agregar Nota</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Estudiante</th>
            <th>Actividades</th>
            <th>Primer Parcial</th>
            <th>Segundo Parcial</th>
            <th>Examen Final</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => (
            <tr key={nota.id}>
              <td>{index + 1}</td>
              <td>{nota.estudiante}</td>
              <td>{nota.actividades}</td>
              <td>{nota.primerParcial}</td>
              <td>{nota.segundoParcial}</td>
              <td>{nota.examenFinal}</td>
              <td>{nota.total}</td>
              <td>
                <Link to={`/edit/${nota.id}`} className="btn btn-primary mr-2">Editar</Link>
                <button onClick={() => deleteNota(nota.id)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotaList;
