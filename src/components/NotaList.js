import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NotaList() {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    loadNotas();
  }, []);

  const loadNotas = async () => {
    const result = await axios.get("http://localhost:8080/api/notas");
    setNotas(result.data);
  };

  const deleteNota = async (id) => {
    await axios.delete(`http://localhost:8080/api/notas/${id}`);
    loadNotas();
  };

  return (
    <div className="mt-4">
      <Link to="/add" className="btn btn-primary mb-3">Agregar Nota</Link>
      <table className="table table-bordered">
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
                <Link to={`/edit/${nota.id}`} className="btn btn-warning mr-2">Editar</Link>
                <button onClick={() => deleteNota(nota.id)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NotaList;
