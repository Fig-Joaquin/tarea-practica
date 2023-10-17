// DescripcionModal.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import '../App.css';
function DescripcionModal({ openDescripcion, closeDescripcionModal, descripcionSeleccionada }) {
  return (
    <Dialog open={openDescripcion} onClose={closeDescripcionModal}>
      <DialogTitle>Descripción del Perro</DialogTitle>
      <DialogContent>
        <DialogContentText>{descripcionSeleccionada}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDescripcionModal} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DescripcionModal;
