import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography
} from '@mui/material';

const StoreMaterialsModal = ({ open, onClose, storeId }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!storeId) return;
      
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/storematerial/list/${storeId}`);
        if (!response.ok) {
          const errorText = await response.text(); // Get the response text for more details
          throw new Error(`Failed to fetch materials: ${errorText}`);
        }
        const data = await response.json();
        console.log(storeId);
        console.log(data);
        setMaterials(data);
      } catch (err) {
        console.error("Error fetching materials:", err); // Log detailed error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    if (open) {
      fetchMaterials();
    }
  }, [storeId, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Materials in the Store {storeId}</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : materials.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1E3A8A' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Materials</TableCell>
                  {/* <TableCell sx={{ color: 'white' }}>Material Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Quantity</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>{material.assets}</TableCell>
                    {/* <TableCell>{material.name}</TableCell>
                    <TableCell>{material.quantity}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No materials found for this store.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreMaterialsModal;
