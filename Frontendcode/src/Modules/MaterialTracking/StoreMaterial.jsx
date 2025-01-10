import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';import {
  Container,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const AddItemsPage = ({ handleAddItemClick}) => {
  const { storeId,id } = useParams(); // Get storeId from URL
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [items, setItems] = useState([createNewItem()]);
  const [initialized, setInitialized] = useState(false);  // Track if component is initialized
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [storeDetails, setStoreDetails] = useState(null);  // State to store fetched store details
 

  // Initialize items when storeId or storeDetails change
useEffect(() => {
  if (storeId) {
    setItems([createNewItem(storeDetails || {})]);  // Ensure storeDetails fallback
    setInitialized(true); 
  } else {
    setError('Store ID is missing.');
  }
}, [storeId, storeDetails]);  // Depend on storeId and storeDetails
console.log("Store Details:", storeDetails);
// Fetch categories
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/category/list');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  fetchCategories();
}, []);  // Run only once on mount

  const fetchMaterialsByCategory = async (category, index) => {
    console.log("the category selected is ",category);
    try {
      const response = await fetch(
        `http://localhost:8080/assetlisting/byCategory/${category}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const updatedItems = [...items];
        updatedItems[index].materials = data;
        setItems(updatedItems);
      }
    } catch (err) {
      setError('Failed to fetch materials');
    }
  };

 
  // Function to fetch details for each store using store.id
  useEffect(() => {
    const fetchStoreDetails = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/store/store/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("The list obtained from id of storeID IS", data);
          setStoreDetails(data);  // Update state with store details
        } else {
          setError(`Failed to fetch details for store ${id}`);
        }
      } catch (err) {
        setError(`Error fetching store details for ${id}: ${err.message}`);
      }
    };

    if (id) {
      fetchStoreDetails(id);  // Trigger API call
    }
  }, [id]);  // Re-run effect when 'id' changes

  function createNewItem(storeDetails = {}) {
    return {
      storeId,
    storeName: storeDetails.storeName || '',
    area: storeDetails.area || '',
    area_id: storeDetails.areaId || '',
    category: '',
    material: '',
    quantity: '',
    maxQuantity: 0,  // Ensure default is 0, not empty
    minQuantity: 0,  // Default to avoid null error
    reorder: 0,      // Default reorder level
    materials: [],
    };
  }

  const handleAddItemRow = () => {
    setItems([...items, createNewItem()]);
  };

  const handleRemoveItemRow = (index) => {
    if (index === 0) {
      setError('Parent row cannot be removed.');
      return; // Stop the removal action
    }
  
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    console.log("the updated items are",updatedItems);
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = async () => {
    // Validate that required fields are filled out
    const isValid = items.every(item => item.category && item.material && item.quantity > 0);
    if (!isValid) {
      setError("Please ensure all required fields are filled out properly.");
      return;
    }
  
   const requestData = items.map((item) => ({   storeId: storeId,
       storeName: storeDetails.storeName || '',  
        area: storeDetails.area || '',  
         areaId: parseInt(storeDetails.areaId, 10) || '', 
           assets: item.material,  
            quantity: parseInt(item.quantity, 10) || 0,  
             quantityAvailable: parseInt(item.quantityAvailable, 10) || 0,  
              quantityDispatched: parseInt(item.quantityDispatched, 10) || 0,  
               quantityInwarded: parseInt(item.quantityInwarded, 10) || 0,   
               reorderLevel: parseInt(item.minQuantity, 10) || 0,  
                maxQuantity: parseInt(item.maxQuantity, 10) || 0,   
                minQuantity: parseInt(item.minQuantity, 10) || 0,
                 category: item.category, }));
    console.log("Request Data to be sent:", requestData);  // Check the request data in the console
  
    try {
      const response = await fetch('http://localhost:8080/storematerial/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        console.log('Items added successfully');
        navigate('/asset-tracking');
        
      } else {
        const errorText = await response.text();
        setError(`Failed to add items: ${errorText}`);
        console.error('Error response:', errorText);  // Log the full error response from the backend
      }
    } catch (err) {
      setError('Error submitting data');
      console.error('Submission error:', err);  // Log error for better debugging
    }
  };
  
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add Items to Store {storeId}
      </Typography>

      {items.map((item, index) => (
        <Paper elevation={3} key={index} sx={{ padding: 3, marginBottom: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={item.category}
                  onChange={(e) => {
                    handleItemChange(index, 'category', e.target.value);
                    fetchMaterialsByCategory(e.target.value, index);
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.category_id} value={category.category}>
                      {category.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel>Material</InputLabel>
                <Select
                  value={item.material}
                  onChange={(e) =>
                    handleItemChange(index, 'material', e.target.value)
                  }
                >
                  {item.materials.map((material) => (
                    <MenuItem key={material.assetName} value={material.assetName}>
                      {material.assetName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, 'quantity', e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                label="Max Quantity"
                type="number"
                fullWidth
                value={item.maxQuantity}
                onChange={(e) =>
                  handleItemChange(index, 'maxQuantity', e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                label="Min Quantity"
                type="number"
                fullWidth
                value={item.minQuantity}
                onChange={(e) =>
                  handleItemChange(index, 'minQuantity', e.target.value)
                }
              />
            </Grid>

            
            <Grid item xs={12} sm={2}>
              <TextField
                label="Reorder"
                type="number"
                fullWidth
                value={item.minQuantity}
                onChange={(e) =>
                  handleItemChange(index, 'reorder', e.target.value)
                }
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={1} display="flex" alignItems="center">
              <IconButton onClick={() => handleRemoveItemRow(index)}>
                <Remove />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}

<Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
  <Grid item xs={6}>
    <Button startIcon={<Add />} onClick={handleAddItemRow}>
      Add More
    </Button>
  </Grid>
  <Grid item xs={6} display="flex" justifyContent="flex-end">
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit}
    >
      Submit
    </Button>
  </Grid>
</Grid>
    </Container>
  );
};

export default AddItemsPage;
