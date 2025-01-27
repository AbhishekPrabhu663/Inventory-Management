import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { Search, Add, Delete } from '@mui/icons-material';
import InwardingModal from './InwardingAddModal';

const Inwarding = () => {
  const [inwardData, setInwardData] = useState([]);
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoiceValue: '',
    inventoryID: '',
    assetName: '',
    typeCategory: '',
    quantityBrought: '',
    companyName: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors from API call

  // Fetch inward data from API on component mount
  const fetchInwardData = async () => {
    try {
      const response = await fetch('http://localhost:8080/inwarding/list');
      
      if (!response.ok) {
        throw new Error('Failed to fetch inward data');
      }
      const data = await response.json();
      setInwardData(data);
      console.log("the inward data obtained is ", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInwardData(); // Fetch the inward data on component mount
  }, []); // Empty dependency array ensures it runs only once when component mounts

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle delete dialog
  const handleDeleteIcon = (id) => {
    setDeleteItem(id);
    setOpenDeleteDialog(true);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    console.log(deleteItem);
    if (!deleteItem) return;

    try {
      // Send DELETE request to API
      const response = await fetch(`http://localhost:8080/inwarding/delete/${deleteItem}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete inward data');
      }

      // Optimistically remove the deleted item from the list
      setInwardData(inwardData.filter((item) => item.sno !== deleteItem));

      // Close the dialog
      setOpenDeleteDialog(false);
      setDeleteItem(null);
      window.location.reload();
    } catch (err) {
      setError(err.message); // Display error if delete fails
      setOpenDeleteDialog(false);
      setDeleteItem(null);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setDeleteItem(null);
  };

  // Filter inwarding data based on search term
  const filteredInwardData = inwardData.filter((item) => {
    return (
      item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Add inward entry and re-fetch inward data
  const handleAddEntry = async (newEntry) => {
    // Add the new entry optimistically
    setInwardData((prevData) => [
      ...prevData,
      { ...newEntry, sno: prevData.length + 1 }
    ]);

    // Re-fetch the data from the server to ensure consistency
    await fetchInwardData(); // Re-fetch the inward data after adding
  };

  // Pagination Logic
  const paginatedInwardData = filteredInwardData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div style={{ padding: 20 }}>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Inwarded Data"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <Search />,
              }}
              sx={{ maxWidth: 300 }}
            />
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1E3A8A',
                color: 'white',
                minHeight: '36px',
                padding: '4px 16px',
                fontSize: '0.875rem',
                borderRadius: '8px',
                boxShadow: 'none',
              }}
              onClick={() => setOpenModal(true)}
            >
              Add Entry
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1E3A8A', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>S.NO</TableCell>
              <TableCell sx={{ color: 'white' }}>Invoice Number</TableCell>
              <TableCell sx={{ color: 'white' }}>Invoice Value</TableCell>
              <TableCell sx={{ color: 'white' }}>Store ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Materials</TableCell>
              <TableCell sx={{ color: 'white' }}>Category</TableCell>
              <TableCell sx={{ color: 'white' }}>Quantity Brought</TableCell>
              <TableCell sx={{ color: 'white' }}>Company Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : paginatedInwardData.length > 0 ? (
              paginatedInwardData.map((item, index) => (
                <TableRow key={item.sno}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.invoiceNumber}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.storeId}</TableCell>
                  <TableCell>{item.materials}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteIcon(item.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No inwarded data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredInwardData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Inwarding Modal */}
      <InwardingModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddEntry={handleAddEntry} // Pass the method to handle adding new entry
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this inwarded entry?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Inwarding;
