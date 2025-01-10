import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";


// Helper function to generate a sequential store ID
const generateStoreId = (lastId) => {
  let newId = 1;
  if (lastId) {
    newId = parseInt(lastId.replace("STORE-", "")) + 1;
  }
  return `STORE-${newId.toString().padStart(4, "0")}`;
};

const StoreModal = ({ open, onClose }) => {
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [area, setArea] = useState(""); // Selected area
  const [areas, setAreas] = useState([]); // List of areas fetched from API
  const [additionalField, setAdditionalField] = useState(""); // Additional field (areaId)
  const [error, setError] = useState("");


  // Fetch last store ID and generate next store ID
  useEffect(() => {
    const fetchLastStoreId = async () => {
      try {
        const response = await fetch("http://localhost:8080/store/lastStoreId");
        const lastStoreId = await response.text();
        console.log("Last Store ID fetched:", lastStoreId);

        // Generate new store ID by incrementing the last store ID
        const nextStoreId = generateStoreId(lastStoreId);
        setStoreId(nextStoreId); // Set the generated store ID
      } catch (error) {
        console.error("Error fetching last store ID:", error);
        setStoreId(generateStoreId(null)); // Fallback if no last store ID is found
      }
    };

    fetchLastStoreId();
  }, []); // Run only when the modal opens

  // Fetching areas for the dropdown
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("http://localhost:8080/area/list"); // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setAreas(data); // Set the fetched areas
        } else {
          throw new Error("Failed to fetch areas");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAreas();
    const generatedId = generateStoreId(null); // Assuming no last store ID for now
    setStoreId(generatedId);
  }, []);

  const handleAreaChange = (event) => {
    const selectedArea = event.target.value;
    setArea(selectedArea);

    // Find the areaId for the selected area
    const selectedAreaData = areas.find((areaItem) => areaItem.area === selectedArea);
    
    if (selectedAreaData) {
      setAdditionalField(selectedAreaData.areaId); // Set the areaId in the additional field
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const additionalFieldValue = parseInt(additionalField, 10); // Convert to integer
    if (!storeName || !storeId || !area || !additionalFieldValue) {
      setError("All fields are required.");
      return;
    }

    const storeData = { storeId, storeName, area, additionalFieldValue };
    console.log(storeData);

    try {
      const response = await fetch("http://localhost:8080/store/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storeData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Store added successfully:", data);
        window.location.reload(); // Refresh the page
        onClose(); // Close modal after successful submission
      } else {
        console.error("Error adding store:", response.statusText);
        setError("Error adding store. Please try again.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setError("Error sending request. Please try again.");
    }
    
    setError("");
  };

  const isFormValid = storeName && storeId && area && additionalField;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Store</DialogTitle>
      <DialogContent>
        {/* Store Name (text field) */}
        <TextField
          label="Store Name"
          fullWidth
          margin="normal"
          required
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          error={!!error && !storeName}
          helperText={error && !storeName ? "Store Name is required" : ""}
        />

        {/* Readonly Store ID (text field) */}
        <TextField
          label="Store ID"
          fullWidth
          margin="normal"
          required
          value={storeId}
          error={!!error && !storeId}
          helperText={error && !storeId ? "Store ID is required" : ""}
          inputProps={{ readOnly: true }}
        />

        {/* Dropdown for Area */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Area</InputLabel>
          <Select
            value={area}
            onChange={handleAreaChange}
            label="Area"
            error={!!error && !area}
          >
            {areas.length > 0 ? (
              areas.map((areaItem) => (
                <MenuItem key={areaItem.areaId} value={areaItem.area}>
                  {areaItem.area}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">
                <em>No areas available</em>
              </MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Additional Field (text field) for areaId */}
        <TextField
          label="Additional Field (areaId)"
          fullWidth
          margin="normal"
          required
          value={additionalField}
          onChange={(e) => setAdditionalField(e.target.value)}
          error={!!error && !additionalField}
          helperText={error && !additionalField ? "This field is required" : ""}
          inputProps={{ readOnly: true }} // Make it read-only
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!isFormValid} // Disable if form is not valid
         
        >
          Add Store
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreModal;
