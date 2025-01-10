import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid
} from "@mui/material";

const MaterialEditModal = ({ open, onClose, assetId }) => {
  const [asset, setAsset] = useState({});

  // Fetch asset data by ID
  useEffect(() => {
    if (assetId) {
      console.log("Fetching data for assetId:", assetId);
      fetch(`http://localhost:8080/materiallisting/list/${assetId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Asset Data:", data);
          setAsset(data[0]);  // If the response is an array, take the first element
        })
        .catch((error) => console.error("Error fetching asset data:", error));
    }
  }, [assetId]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAsset((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (Update API call)
  const handleSubmit = () => {
    fetch(`http://localhost:8080/materiallisting/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(asset)
    })
      .then((response) => {
        if (response.ok) {
          alert("Asset updated successfully");
          onClose();
          window.location.reload();  // Refresh the page
        } else {
          alert("Failed to update asset");
        }
      })
      .catch((error) => console.error("Error updating asset:", error));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Asset</DialogTitle>
      <DialogContent sx={{ padding: 3, overflow: 'visible' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Asset Name"
              fullWidth
              name="assetName"
              value={asset.assetName || ''}  // Ensure value is not undefined
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category"
              fullWidth
              name="category"
              value={asset.category || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Asset Code"
              fullWidth
              name="assetCode"
              value={asset.assetCode || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaterialEditModal;
