import { useState, useEffect } from 'react';

import './App.css';

function generarNombreAleatorio() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const longitudNombre = 6;
  let nombreAleatorio = '';

  for (let i = 0; i < longitudNombre; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    nombreAleatorio += caracteres.charAt(indice);
  }

  return nombreAleatorio;
}

function App() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const [nombrePerroCandidato, setNombrePerroCandidato] = useState(generarNombreAleatorio());
  const [perrosAceptados, setPerrosAceptados] = useState([]);
  const [perrosRechazados, setPerrosRechazados] = useState([]);

  useEffect(() => {
    cargarNuevoPerro();
  }, []);

  const cargarNuevoPerro = () => {
    setLoading(true); // Habilitar el indicador de carga
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo completar la solicitud.');
        }
        return response.json();
      })
      .then((data) => {
        setApiData(data);
        setNombrePerroCandidato(generarNombreAleatorio());
        setLoading(false); // Deshabilitar el indicador de carga
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API', error);
        setLoading(false); // Asegúrate de deshabilitar el indicador en caso de error
      });
  };

  const aceptarPerro = () => {
    const nuevoPerroAceptado = { nombre: nombrePerroCandidato, imagen: apiData.message };
    setPerrosAceptados([...perrosAceptados, nuevoPerroAceptado]);
    setApiData(null);
    cargarNuevoPerro();
  };

  const rechazarPerro = () => {
    const nuevoPerroRechazado = { nombre: nombrePerroCandidato, imagen: apiData.message };
    setPerrosRechazados([...perrosRechazados, nuevoPerroRechazado]);
    setApiData(null);
    cargarNuevoPerro();
  };

  const arrepentirse = (perro, listaOrigen, listaDestino) => {
    const nuevoOrigen = listaOrigen.filter((p) => p !== perro);
    const nuevoDestino = [...listaDestino, perro];
    listaOrigen === perrosAceptados ? setPerrosAceptados(nuevoOrigen) : setPerrosRechazados(nuevoOrigen);
    listaOrigen === perrosAceptados ? setPerrosRechazados(nuevoDestino) : setPerrosAceptados(nuevoDestino);
  };

  return (
    <div className="app-container">
      <div className="column" id="perroCandidato">
        <div className="candidato-container">
          <h2 className="read-the-docs">Perro Candidato</h2>
          <p>Nombre del perro candidato: {nombrePerroCandidato}</p>
          {apiData ? (
            <img src={apiData.message} alt="Perro" className="logo react" />
          ) : (
            <p>{loading ? 'Cargando...' : 'Error al cargar la imagen'}</p>
          )}
          <button onClick={aceptarPerro} disabled={loading}>
            Aceptar
          </button>
          <button onClick={rechazarPerro} disabled={loading}>
            Rechazar
          </button>
        </div>
      </div>
      <div className="candidato-aceptado" id="perrosAceptados">
        <h2 className="read-the-docs">Perros Aceptados</h2>
        <ul>
          {perrosAceptados.map((perro, index) => (
            <li className="card" key={index}>
              <p>{perro.nombre}</p>
              <img src={perro.imagen} alt={perro.nombre} />
              <button onClick={() => arrepentirse(perro, perrosAceptados, perrosRechazados)}>Arrepentirse</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="candidato-rechazado" id="perrosRechazados">
        <h2 className="read-the-docs">Perros Rechazados</h2>
        <ul>
          {perrosRechazados.map((perro, index) => (
            <li className="card" key={index}>
              <p>{perro.nombre}</p>
              <img src={perro.imagen} alt={perro.nombre} />
              <button onClick={() => arrepentirse(perro, perrosRechazados, perrosAceptados)}>Arrepentirse</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
