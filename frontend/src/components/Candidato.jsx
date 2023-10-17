import React from 'react';
import { Typography, Button, CircularProgress } from '@mui/material';
import '../App.css';


function Candidato({ apiData, loading, nombrePerroCandidato, descripcionPerroCandidato, aceptarPerro, rechazarPerro }) {
    return (
    <div className="candidato-container" style={{ maxHeight: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Perro Candidato
      </Typography>
      {apiData ? (
        <img src={apiData.message} alt="Perro" className="candidato-imagen" />
      ) : (
        <Typography>
          {loading ? <CircularProgress size={55} color="info" /> : 'Error al cargar la imagen'}
        </Typography>
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
  );
}

export default Candidato;
