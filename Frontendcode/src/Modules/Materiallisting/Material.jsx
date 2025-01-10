import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Button,
  TextField,
  Grid,
  IconButton,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@mui/material";
import { Search, Add, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AssetModal from "./MaterialModal";
import MaterialEditModal from "./MaterialEditModal";

const AssetListing1 = () => {
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteItem, setDeleteItem] = useState(null);

  // States for modals
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // Fetch assets on component mount
  useEffect(() => {
    fetch('http://localhost:8080/materiallisting/list')
      .then((response) => response.json())
      .then((data) => setAssets(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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

  // Handle edit icon click
  const handleEditIcon = (id) => {
    console.log("Editing asset with ID:", id);
    setSelectedAssetId(id);
    setEditModalOpen(true);  // Open the edit modal
  };

  const handleDeleteIcon = (id) => {
    setDeleteItem(id);  // Set the item to be deleted
    setOpenDeleteDialog(true);  // Open the delete confirmation dialog
    
  };

  // Close the edit modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedAssetId(null);
  };


  // Handle delete action (Yes)
  const handleDeleteConfirm = () => {
    if (!deleteItem) return;
    console.log(`Deleting asset with ID:`,deleteItem);
    // Here you would call the API to delete the asset
    fetch(`http://localhost:8080/materiallisting/delete/${deleteItem}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // After successful deletion, refresh the asset list
          setAssets(assets.filter((asset) => asset.id !== deleteItem));
          setOpenDeleteDialog(false);  // Close the delete dialog
        } else {
          console.error("Error deleting asset:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting asset:", error));
  };

  // Handle cancel delete action (No)
  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);  // Close the delete dialog
    setDeleteItem(null);  // Clear the delete item
  };

  // Filter assets based on search term
  const filteredAssets = assets.filter((asset) => {
    return (
      asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination Logic
  const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
<div style={{ padding: 20 }}>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Assets"
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
                minHeight: '36px',  // Adjust height to make it compact
                padding: '4px 16px',  // Adjust padding for a smaller look
                fontSize: '0.875rem',  // Slightly smaller text
                borderRadius: '8px',  // Optional: Softer button edges
                boxShadow: 'none'    }}
              onClick={() => setOpenModal(true)}
            >
              Add Material 
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1E3A8A', color: 'white' }}>
            <TableRow>
              <TableCell  sx={{  color: 'white' }}>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => setOrderBy("id")}
                >
                  Material ID
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{  color: 'white' }}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => setOrderBy("name")}
                  sx={{
                    color: 'white !important', // Enforce white color
                    '& .MuiTableSortLabel-icon': {
                      color: 'white !important', // Enforce white color for the sort icon
                    },
                    '&:hover': {
                      color: 'white !important', // Ensure it remains white when hovered
                    },
                  }}
                >
                  Material Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{  color: 'white' }}>Category</TableCell>
              <TableCell sx={{  color: 'white' }}>Material Code</TableCell>
              <TableCell sx={{  color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAssets.length > 0 ? (
              paginatedAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.id}</TableCell>
                  <TableCell>{asset.assetName}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.assetCode}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditIcon(asset.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteIcon (asset.id)}>
                      <Delete color="error"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No assets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAssets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Edit Asset Modal */}
      <MaterialEditModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        assetId={selectedAssetId}
      />

      {/* Add Asset Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent>
          <AssetModal onClose={() => setOpenModal(false)} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this asset?
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

export default AssetListing1;
