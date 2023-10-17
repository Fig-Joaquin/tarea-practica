import React, { useState, useEffect } from 'react';

import './App.css';
import Candidato from './components/Candidato';
import PerrosAceptados from './components/PerrosAceptados';
import PerrosRechazados from './components/PerrosRechazados';
import DescripcionModal from './components/DescripcionModal';

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

function generarDescripcionAleatoria() {
  const descripciones = [
    'Un perro amigable y juguetón.',
    'Un compañero leal y cariñoso.',
    'Un perro enérgico y activo.',
    'Un canino inteligente y obediente.',
    'Un perro tranquilo y relajado.',
  ];
  const indice = Math.floor(Math.random() * descripciones.length);
  return descripciones[indice];
}

function App() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nombrePerroCandidato, setNombrePerroCandidato] = useState(generarNombreAleatorio());
  const [descripcionPerroCandidato, setDescripcionPerroCandidato] = useState('');
  const [perrosAceptados, setPerrosAceptados] = useState([]);
  const [perrosRechazados, setPerrosRechazados] = useState([]);
  const [openDescripcion, setOpenDescripcion] = useState(false);
  const [descripcionSeleccionada, setDescripcionSeleccionada] = useState('');

  useEffect(() => {
    cargarNuevoPerro();
  }, []);

  const cargarNuevoPerro = () => {
    setLoading(true);
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
        setDescripcionPerroCandidato(generarDescripcionAleatoria());
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API', error);
        setLoading(false);
      });
  };

  const aceptarPerro = () => {
    const nuevoPerroAceptado = {
      nombre: nombrePerroCandidato,
      imagen: apiData.message,
      descripcion: descripcionPerroCandidato,
    };
    setPerrosAceptados([nuevoPerroAceptado, ...perrosAceptados]);
    setApiData(null);
    cargarNuevoPerro();
  };

  const rechazarPerro = () => {
    const nuevoPerroRechazado = {
      nombre: nombrePerroCandidato,
      imagen: apiData.message,
      descripcion: descripcionPerroCandidato,
    };
    setPerrosRechazados([nuevoPerroRechazado, ...perrosRechazados]);
    setApiData(null);
    cargarNuevoPerro();
  };

  const openDescripcionModal = (descripcion) => {
    setDescripcionSeleccionada(descripcion);
    setOpenDescripcion(true);
  };

  const closeDescripcionModal = () => {
    setOpenDescripcion(false);
  };

  const arrepentirse = (perro, listaOrigen, listaDestino) => {
    const nuevoOrigen = listaOrigen.filter((p) => p !== perro);
    const nuevoDestino = [perro, ...listaDestino];
    if (listaOrigen === perrosAceptados) {
      setPerrosAceptados(nuevoOrigen);
      setPerrosRechazados(nuevoDestino);
    } else {
      setPerrosRechazados(nuevoOrigen);
      setPerrosAceptados(nuevoDestino);
    }
  };

  return (
    <div className="app-container">
      <Candidato
        apiData={apiData}
        loading={loading}
        nombrePerroCandidato={nombrePerroCandidato}
        descripcionPerroCandidato={descripcionPerroCandidato}
        aceptarPerro={aceptarPerro}
        rechazarPerro={rechazarPerro}
      />
      <PerrosAceptados
        perrosAceptados={perrosAceptados}
        openDescripcionModal={openDescripcionModal}
        arrepentirse={arrepentirse}
        perrosRechazados={perrosRechazados}
      />
      <PerrosRechazados
        perrosRechazados={perrosRechazados}
        openDescripcionModal={openDescripcionModal}
        arrepentirse={arrepentirse}
        perrosAceptados={perrosAceptados}
      />
      <DescripcionModal
        openDescripcion={openDescripcion}
        closeDescripcionModal={closeDescripcionModal}
        descripcionSeleccionada={descripcionSeleccionada}
      />
    </div>
  );
}

export default App;
