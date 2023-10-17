import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

function PerrosRechazados({ perrosRechazados, openDescripcionModal, arrepentirse, perrosAceptados }) {
  return (
    <div className="candidato-rechazado" style={{ overflowY: 'auto', maxHeight: '1000px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '10px' }}>
        Perros Rechazados
      </Typography>
      <ul>
        {perrosRechazados.map((perro, index) => (
          <Card key={index} className="card" style={{ marginBottom: '25px' }}>
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
              <img src={perro.imagen} alt={perro.nombre} style={{ margin: '10px 0', width: '80%', height: 'auto' }} />
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
  );
}

export default PerrosRechazados;
