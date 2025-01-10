import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box
} from '@mui/material';
import { Visibility, DeleteForever,PlaylistAdd } from '@mui/icons-material';
import { Add, Search } from '@mui/icons-material';
import StoreCreationModal from './StoreCreationModal';
import StockKeepingTable from '../StockKeeping/StockKeeping';
import AddItemsPage from './StoreMaterial';
import { useNavigate } from 'react-router-dom';
import StoreMaterialsModal from './StoreMaterialModal';
import { Tooltip } from '@mui/material';
import StockRegisterTable from '../StockRegister/StockRegister';

const MaterialTracking = () => {
  const [inventories, setInventories] = useState([]);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [deleteStore, setDeleteStore] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);  // New state for delete dialog
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventories = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/store/storelist');
        if (response.ok) {
          const data = await response.json();
          console.log("The store list obtained is:", data);
          setInventories(data);
        } else {
          throw new Error('Failed to fetch inventories');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  const handleAddItemClick = (data) => {
    setSelectedStoreId(data.storeId);
    navigate(`/asset-tracking/add-items/${data.storeId}/${data.id}`);
  };

  const handleViewClick = (storeId) => {
    console.log("viewicon:",storeId)
    setSelectedStoreId(storeId);
    setViewModalOpen(true);
  };

  const handleDeleteIcon = (id) => {
    console.log("ID to delete:", id);
    setDeleteStore(id);
    setOpenDeleteDialog(true);  // Open delete dialog
  };

  const handleDeleteConfirm = async () => {
    if (!deleteStore) return;
  
    try {
      const response = await fetch(`http://localhost:8080/store/delete/${deleteStore}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        console.log("Store deleted successfully.");
        // Refetch the updated store list to ensure data consistency
        const updatedResponse = await fetch('http://localhost:8080/store/storelist');
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setInventories(updatedData);
        }
      } else {
        console.error("Failed to delete the store.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setOpenDeleteDialog(false);
      setDeleteStore("");
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setDeleteStore("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePlusButtonOpen = () => {
    setOpenModal(true);
  };

  const handlePlusButtonClose = () => {
    setOpenModal(false);
  };

  const filteredInventories = inventories.filter((inventory) =>
    inventory.storeName.toLowerCase().includes(search.toLowerCase()) ||
    inventory.storeId.toLowerCase().includes(search.toLowerCase()) ||
    inventory.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inventory-tracking" style={{ padding: 20 }}>
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search"
              value={search}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <Search />,
              }}
              sx={{ maxWidth: 300 }}
            />
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1E3A8A', color: 'white' }}
              startIcon={<Add />}
              onClick={handlePlusButtonOpen}
            >
              Add Store
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1E3A8A', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>S.NO</TableCell>
              <TableCell sx={{ color: 'white' }}>Store Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Store ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Area</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventories.map((inventory) => (
              <TableRow key={inventory.id}>
                <TableCell>{inventory.id}</TableCell>
                <TableCell>{inventory.storeName}</TableCell>
                <TableCell>{inventory.storeId}</TableCell>
                <TableCell>{inventory.area}</TableCell>
                <TableCell align="center">
                <Tooltip title="Add Item">
                  <Button  onClick={() => handleAddItemClick(inventory)}>
                    <PlaylistAdd/>
                  </Button>
                  </Tooltip>
                  <Tooltip title="View Materials">
                  <IconButton onClick={() => handleViewClick(inventory.storeId)}>
                    <Visibility />
                  </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Store">
                   <IconButton color="error" onClick={() => handleDeleteIcon(inventory.id)}>
                    <DeleteForever />
                  </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this store?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <StoreMaterialsModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        storeId={selectedStoreId}
      />

 {viewModalOpen && (
        <StockKeepingTable storeId={selectedStoreId} />
      )}
      
      {viewModalOpen && (
        <StockRegisterTable storeId={selectedStoreId} />
      )}
      <StoreCreationModal open={openModal} onClose={handlePlusButtonClose} />
    </div>
  );
};

export default MaterialTracking;
