import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';

const InwardingModal = ({ open, onClose, onAddEntry }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoiceValue: '',
    material: '',
    typeCategory: '',
    quantityBrought: '',
    companyName: '',
    storeID: '', // Store ID to be selected
  });

  const [inventories, setInventories] = useState([]); // To hold the store list
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors
  const [storeMaterials, setStoreMaterials] = useState([]); // To hold the store materials list
  const [materialLoading, setMaterialLoading] = useState(false); // To track material loading state
  const [materialError, setMaterialError] = useState(null); // To handle errors in fetching materials

  // Fetch inventories when modal is opened
  useEffect(() => {
    if (open) {
      const fetchInventories = async () => {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:8080/store/storelist');
          if (response.ok) {
            const data = await response.json();
            console.log("the storelist obtained in inwarding are:", data);
            setInventories(data);
          } else {
            throw new Error('Failed to fetch store list');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchInventories();
    }
  }, [open]); // Only fetch when modal opens

 const handleChange = (e) => {
  const { name, value } = e.target;
  const updatedValue = name === 'invoiceValue' ? parseFloat(value) || '' : value;

  setFormData({
    ...formData,
    [name]: updatedValue,
  });

  // Log the selected value
  console.log(`${name} selected value: ${value}`);

  // If Store ID is changed, fetch materials for the selected store
  if (name === 'storeID') {
    fetchStoreMaterials(value); // Fetch materials for the selected store
  }

  // If material is selected, update the category field accordingly
  if (name === 'material') {
    const selectedMaterial = storeMaterials.find(item => item.assets === value);
    if (selectedMaterial) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        typeCategory: selectedMaterial.category, // Update category based on selected material
        materialId: selectedMaterial.id,
      }));

      // Use the `value` from the event to call `fetchStoreMaterialDetails`
      fetchStoreMaterialDetails(formData.storeID, selectedMaterial.id,formData.quantityBrought); // or directly `value` for material and storeId
    }
  }
  // // If quantityBrought is updated, call fetchStoreMaterialDetails with the latest quantityBrought
  // if (name === 'quantityBrought') {
  //   fetchStoreMaterialDetails(formData.storeID, formData.materialId, value); // Directly pass the value of quantityBrought
  // }
  };


  const fetchStoreMaterials = async (storeId) => {
    if (!storeId) return; // If no store ID, don't fetch materials

    setMaterialLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/storematerial/list/${storeId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setStoreMaterials(data);
      } else {
        throw new Error('Failed to fetch materials for the selected store');
      }
    } catch (err) {
      setMaterialError(err.message);
    } finally {
      setMaterialLoading(false);
    }
  };

  const handleSubmit = async () => {
    const { materialId, storeID, quantityBrought } = formData;
  
    if (!materialId) {
      alert('Please select a material');
      return;
    }
  
    const parsedInvoiceValue = formData.invoiceValue ? parseFloat(formData.invoiceValue) : 0;
  
    const dataToSend = {
      invoiceNumber: formData.invoiceNumber,
      value: parsedInvoiceValue,
      quantity: quantityBrought,
      materials: formData.material,
      category: formData.typeCategory,
      companyName: formData.companyName,
      storeId: storeID,
    };
  
    console.log("Submitting form data:", dataToSend);
  
    try {
      const response = await fetch('http://localhost:8080/inwarding/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Inwarding Entry Added:', result);
  
        // Now call the updateMaterialQuantity function
        console.log("Calling fetchMaterialDetails function...");
        console.log("StoreID, MaterialID and Quantity: ", storeID, materialId, quantityBrought);
  
       
    // Call the updateMaterialQuantity function here
    fetchStoreMaterialDetails(storeID, materialId, quantityBrought);

        // Call onAddEntry and close the modal
        onAddEntry(formData);
        onClose();
        // window.location.reload();
      } else {
        throw new Error('Failed to add inwarding entry');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  
  const fetchStoreMaterialDetails = async (storeId, materialId, quantityBrought) => {
    if (!storeId || !materialId || !quantityBrought) return; // Avoid making the API call if either store or material is not selected.
  
    try {
      const response = await fetch(`http://localhost:8080/storematerial/get/${storeId}/${materialId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Material details fetched:", data);
  
        // Assuming the response contains `currentQuantity` or similar, update it by adding the `quantityBrought`
        const currentQuantity = data.quantity || 0;  // Use 0 as a default if quantity is undefined or null
        const quantityToAdd = parseFloat(quantityBrought) || 0;  // Ensure that quantityBrought is a valid number
  
        const updatedQuantity = currentQuantity + quantityToAdd;
        console.log("Updated quantity that is going to be used:", updatedQuantity);
  
        // Now update the material quantity via the update API
        await updateMaterialQuantity(storeId, materialId, updatedQuantity, data);
  
      } else {
        throw new Error('Failed to fetch material details');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  

  const updateMaterialQuantity = async (storeId, materialId, updatedQuantity, materialDetails) => {
    // Create an object with all the material details, updating only the quantity field
    const updatedMaterial = {
      ...materialDetails, // Spread all existing details
      quantity: updatedQuantity, // Update the quantity with the new value
    };
  
    try {
      const response = await fetch(`http://localhost:8080/storematerial/update/${storeId}/${materialId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMaterial), // Send all details back with updated quantity
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Material quantity updated:', result);
      } else {
        throw new Error('Failed to update material quantity');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Inwarding Entry</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Invoice Number"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Invoice Value"
              name="invoiceValue"
              type="number"
              value={formData.invoiceValue}
              onChange={handleChange}
            />
          </Grid>
          {/* Store ID Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Store ID</InputLabel>
              <Select
                label="Store ID"
                name="storeID"
                value={formData.storeID}
                onChange={handleChange}
              >
                {loading ? (
                  <MenuItem value="">
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : error ? (
                  <MenuItem value="">
                    {`Error: ${error}`}
                  </MenuItem>
                ) : inventories.length > 0 ? (
                  inventories.map((store) => (
                    <MenuItem key={store.id} value={store.storeId}>
                      {store.storeId} {/* Assuming store has 'id' and 'storeId' properties */}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No stores available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          {/* Materials Dropdown based on selected Store */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Material</InputLabel>
              <Select
                label="Material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                disabled={materialLoading || !storeMaterials.length}
              >
                {materialLoading ? (
                  <MenuItem value="">
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : materialError ? (
                  <MenuItem value="">
                    {`Error: ${materialError}`}
                  </MenuItem>
                ) : storeMaterials.length > 0 ? (
                  storeMaterials.map((material) => (
                    <MenuItem key={material.id} value={material.assets}>
                      {material.assets} {/* Assuming each material has 'id' and 'assetName' */}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No materials available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Category"
              name="typeCategory"
              value={formData.typeCategory}
              onChange={handleChange}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Quantity Brought"
              name="quantityBrought"
              type="number"
              value={formData.quantityBrought}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary">
          Add Entry
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InwardingModal;
