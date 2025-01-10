import React, { useState, useEffect } from "react";
import { TextField, Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";

// Helper function to generate a sequential asset code
const generateAssetCode = (lastCode) => {
  let newCode = 1;
  if (lastCode) {
    newCode = parseInt(lastCode.replace("ASSET-", "")) + 1;
  }
  return `ASSET-${newCode.toString().padStart(4, "0")}`;
};

const AssetModal = ({ onClose }) => {
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("");
  const [assetCode, setAssetCode] = useState("");
  const [error, setError] = useState("");
  const [lastAssetCode, setLastAssetCode] = useState(null); // Initially null to indicate fetching

  // Fetch the last asset code from the API when the modal opens
  useEffect(() => {
    const fetchLastAssetCode = async () => {
      try {
        const response = await fetch("http://localhost:8080/materiallisting/lastMaterialCode");
        
        // Using response.text() to handle plain text
        const lastCode = await response.text();
        console.log("the last asset code i am getting is ",lastCode);
        
        // Now lastCode is the plain text like "ASSET-0001"
        if (lastCode) {
          setLastAssetCode(lastCode); // Set the last asset code from response
        } else {
          setLastAssetCode("ASSET-0000"); // If no asset code is found, start from "ASSET-0000"
        }
      } catch (error) {
        console.error("Error fetching last asset code:", error);
      }
    };

    fetchLastAssetCode();
  }, []); // Runs only once when the modal is opened

  // Update asset code when the last asset code is fetched/updated
  useEffect(() => {
    if (lastAssetCode) {
      const generatedCode = generateAssetCode(lastAssetCode);
      setAssetCode(generatedCode); // Set the generated code as the default value for assetCode
    }
  }, [lastAssetCode]); // Only run when lastAssetCode changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!assetName || !category || !assetCode) {
      setError("All fields are required.");
      return;
    }

    const assetData = { assetName, category, assetCode };

    try {
      const response = await fetch("http://localhost:8080/assetlisting/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assetData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Asset added successfully:", data);
        window.location.reload(); // Refresh the page
      } else {
        console.error("Error adding asset:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }

    // Update lastAssetCode after adding the new asset
    setLastAssetCode(assetCode);

    // Reset error and close modal
    setError("");
    onClose();
  };
  
  return (
    <div>
      <DialogTitle>Add New Asset</DialogTitle>
      <DialogContent>
        <TextField
          label="Asset Name"
          fullWidth
          margin="normal"
          required
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          error={!!error && !assetName}
          helperText={error && !assetName ? "Asset Name is required" : ""}
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          error={!!error && !category}
          helperText={error && !category ? "Category is required" : ""}
        />
        <TextField
          label="Code"
          fullWidth
          margin="normal"
          required
          value={assetCode}
          error={!!error && !assetCode}
          helperText={error && !assetCode ? "Asset Code is required" : ""}
          inputProps={{ readOnly: true }} // Make the asset code field read-only
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add Asset</Button>
      </DialogActions>
    </div>
  );
};

export default AssetModal;
