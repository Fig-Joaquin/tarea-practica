import { useState, useEffect } from 'react';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, CircularProgress } from '@mui/material';

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

export default function App() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nombrePerroCandidato, setNombrePerroCandidato] = useState(generarNombreAleatorio());
  const [descripcionPerroCandidato, setDescripcionPerroCandidato] = useState(''); // Inicializa la descripción en blanco
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
    listaOrigen === perrosAceptados
      ? setPerrosAceptados(nuevoOrigen)
      : setPerrosRechazados(nuevoOrigen);
    listaOrigen === perrosAceptados
      ? setPerrosRechazados(nuevoDestino)
      : setPerrosAceptados(nuevoDestino);
  };

  return (
    <div className="app-container">
      <div id="perroCandidato">
        <div className="candidato-container" style={{ width: '250px' }}>
          <Typography variant="h5" gutterBottom>
            Perro Candidato
          </Typography>
          {apiData ? (
            <img src={apiData.message} alt="Perro" className="candidato-imagen" />
          ) : (
            <Typography>{loading ? <CircularProgress size={55} color="info" /> : 'Error al cargar la imagen'}</Typography>
          )}
          <Typography gutterBottom>Nombre: {nombrePerroCandidato}</Typography>
          <Typography gutterBottom> {descripcionPerroCandidato}</Typography>
          <Button
            variant="contained"
            color="success"
            onClick={aceptarPerro}
            disabled={loading}
            style={{ margin: '10px 0' }}
          >
            Aceptar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={rechazarPerro}
            disabled={loading}
            style={{ margin: '10px 0' }}
          >
            Rechazar
          </Button>
        </div>
      </div>
      <div className="column" id="perrosAceptados">
        <div className="candidato-aceptado">
          <Typography variant="h4" gutterBottom>
            Perros Aceptados
          </Typography>
          <ul>
            {perrosAceptados.map((perro, index) => (
              <Card key={index} className="card" style={{ marginBottom: '20px' }}>
                <CardContent className="card-content">
                  <Typography>{perro.nombre}</Typography>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => openDescripcionModal(perro.descripcion)}
                    style={{ margin: '10px 0' }}
                  >
                    Ver Descripción
                  </Button>
                  <img src={perro.imagen} alt={perro.nombre} style={{ margin: '10px 0', width: '100%', height: 'auto' }} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => arrepentirse(perro, perrosAceptados, perrosRechazados)}
                  >
                    Arrepentirse
                  </Button>
                </CardContent>
              </Card>
            ))}
          </ul>
        </div>
      </div>
      <div className="column" id="perrosRechazados">
        <div className="candidato-rechazado">
          <Typography variant="h4" gutterBottom>
            Perros Rechazados
          </Typography>
          <ul>
            {perrosRechazados.map((perro, index) => (
              <Card key={index} className="card" style={{ marginBottom: '20px' }}>
                <CardContent className="card-content">
                  <Typography>{perro.nombre}</Typography>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => openDescripcionModal(perro.descripcion)}
                    style={{ margin: '10px 0' }}
                  >
                    Ver Descripción
                  </Button>
                  <img src={perro.imagen} alt={perro.nombre} style={{ margin: '10px 0', width: '100%', height: 'auto' }} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => arrepentirse(perro, perrosRechazados, perrosAceptados)}
                  >
                    Arrepentirse
                  </Button>
                </CardContent>
              </Card>
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={openDescripcion} onClose={closeDescripcionModal}>
        <DialogTitle>Descripción del Perro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {descripcionSeleccionada}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDescripcionModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
