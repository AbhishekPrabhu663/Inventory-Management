import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import WarningIcon from '@mui/icons-material/Warning';

const StockRegisterTable = () => {
  const [search, setSearch] = useState('');
  const [storeList, setStoreList] = useState([]);
  const [error, setError] = useState('');
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [storeMaterialData, setStoreMaterialData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch store list for dropdown
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('http://localhost:8080/store/storelist');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched store list:', data);
          setDropdownData(data);  // Assuming data is an array of store objects
        } else {
          setError('Failed to fetch store list');
        }
      } catch (err) {
        setError(`Error fetching store list: ${err.message}`);
      }
    };

    fetchStores();
  }, []);

  // Fetch store material data when a storeId is selected
  useEffect(() => {
    if (selectedStoreId) {
      const fetchStoreMaterialData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/storematerial/list/${selectedStoreId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched store material data:', data);
            setStoreMaterialData(data);  // Assuming data is an array of materials
          } else {
            setError('Failed to fetch store material data');
          }
        } catch (err) {
          setError(`Error fetching store material data: ${err.message}`);
        }
      };

      fetchStoreMaterialData();
    }
  }, [selectedStoreId]);

  // Handle changes in search field
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle changes in dropdown selection
  const handleStoreSelection = (e) => {
    setSelectedStoreId(e.target.value);
  };

  // Handle caution icon click to show popup
  const handleCautionClick = (item) => {
    setSelectedItem(item);
    setOpenPopup(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  // Filter storeMaterialData based on the search input
  const filteredStock = storeMaterialData.filter(
    (item) =>
      item.storeName.toLowerCase().includes(search.toLowerCase()) ||
      item.area.toLowerCase().includes(search.toLowerCase()) ||
      item.assets.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Search Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search"
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <Search />,
              }}
              sx={{ maxWidth: 300 }}
            />
          </Grid>

          {/* Dropdown for Store List */}
          <Grid item xs={12} md={6} container justifyContent="flex-end">
            <FormControl fullWidth variant="outlined">
              <InputLabel>StoreList</InputLabel>
              <Select
                value={selectedStoreId}  // Set the selected store ID
                onChange={handleStoreSelection}
                label="StoreList"
                sx={{ maxWidth: 300 }}
              >
                {/* Dynamically populate the dropdown with store names */}
                {dropdownData.map((store, index) => (
                  <MenuItem key={index} value={store.storeId}>
                    {store.storeId}-{store.storeName} {/* Assuming storeName is the name you want to display */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Stock Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1E3A8A' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>S.NO</TableCell>
              <TableCell sx={{ color: 'white' }}>Store Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Store ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Area</TableCell>
              <TableCell sx={{ color: 'white' }}>Assets</TableCell>
              <TableCell sx={{ color: 'white' }}>Quantity Available</TableCell>
              <TableCell sx={{ color: 'white' }}>Max Quantity </TableCell>
              <TableCell sx={{ color: 'white' }}>Quantity Dispatched</TableCell>
              <TableCell sx={{ color: 'white' }}>Reorder Level</TableCell>
              <TableCell sx={{ color: 'white' }}></TableCell> {/* Empty for the Caution Icon */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStock.length > 0 ? (
              filteredStock.map((item, index) => (
                <TableRow key={item.id} sx={{ alignItems: 'center' }}>
  <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
  <TableCell sx={{ textAlign: 'center' }}>{item.storeName}</TableCell>
  <TableCell sx={{ textAlign: 'center' }}>{item.storeId}</TableCell>
  <TableCell sx={{ textAlign: 'center' }}>{item.area}</TableCell>
  <TableCell sx={{ textAlign: 'center' }}>{item.assets}</TableCell>
  <TableCell sx={{ textAlign: 'center' }}>{item.quantity}</TableCell>
  <TableCell sx={{ textAlign: 'center' }}>{item.maxQuantity}</TableCell>
  <TableCell sx={{ textAlign: 'center' }}>{item.quantityDispatched}</TableCell>
  <TableCell sx={{ textAlign: 'center' }}>{item.reorderLevel}</TableCell>
  {item.quantity < item.reorderLevel && (
    <TableCell sx={{ textAlign: 'center' }}>
      <IconButton onClick={() => handleCautionClick(item)} color="warning">
        <WarningIcon />
      </IconButton>
    </TableCell>
  )}
</TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  {error || 'No data available'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup Dialog */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Reorder Alert</DialogTitle>
        <DialogContent>
          <p>
          The item <strong>{selectedItem?.assets}</strong> in store <strong>{selectedItem?.storeName}</strong> needs to be reordered. The quantity is below the reorder level. Please proceed to the Reorder module to reorder the item.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StockRegisterTable;
