import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

function PerrosAceptados({ perrosAceptados, openDescripcionModal, arrepentirse, perrosRechazados }) {
  return (
    <div className="candidato-aceptado" style={{ overflowY: 'auto', maxHeight: '1000px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '10px' }}>
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
  );
}

export default PerrosAceptados;
