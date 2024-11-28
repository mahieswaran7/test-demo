import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Switch } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Autocomplete } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useGetCitiesQuery } from '../../services/api';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [localCities, setLocalCities] = useState(() => {
    const savedCities = localStorage.getItem('localCities');
    return savedCities ? JSON.parse(savedCities) : [];
  });
  const [selectedCity, setSelectedCity] = useState(null);
  const [editCity, setEditCity] = useState(null); // State for editing city
  const [deleteCityId, setDeleteCityId] = useState(null); // State for delete confirmation

  // Fetch cities based on search query
  const { data: fetchedCities = [], isLoading, isError, error } = useGetCitiesQuery(searchQuery, {
    skip: !searchQuery,
  });

  // Update suggestions when fetchedCities change
  useEffect(() => {
    if (fetchedCities.length > 0) {
      setSuggestions(fetchedCities);
    }
  }, [fetchedCities]);

  // Save local cities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('localCities', JSON.stringify(localCities));
  }, [localCities]);

  // Handle adding a selected city
  const handleAddSelectedCity = () => {
    if (selectedCity && !localCities.find((city) => city.name === selectedCity.name)) {
      setLocalCities((prev) => [...prev, { ...selectedCity, id: Date.now() }]);
      setSelectedCity(null);
      setSearchQuery('');
    }
  };

  // Handle deleting a city
  const handleDeleteCity = () => {
    setLocalCities((prev) => prev.filter((city) => city.id !== deleteCityId));
    setDeleteCityId(null); // Close the delete confirmation dialog
  };

  // Handle saving an edited city
  const handleSaveEdit = () => {
    setLocalCities((prev) =>
      prev.map((city) => (city.id === editCity.id ? { ...editCity } : city))
    );
    setEditCity(null); // Close the edit dialog
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'name', headerName: 'City Name', width: 150 },
    { field: 'latitude', headerName: 'Latitude', width: 150 },
    { field: 'longitude', headerName: 'Longitude', width: 150 },
    { field: 'country', headerName: 'Country', width: 100 },
    { field: 'population', headerName: 'Population', width: 150 },
    { field: 'is_capital', headerName: 'Is Capital', width: 100, renderCell: (params) => (params.value ? 'Yes' : 'No') },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => setEditCity(params.row)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => setDeleteCityId(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box padding={3}>
      <Typography variant="h5">City Dashboard</Typography>

      {/* Search Bar with Suggestions */}
      <Autocomplete
        options={suggestions}
        getOptionLabel={(option) => option.name || ''}
        value={selectedCity}
        onChange={(event, newValue) => setSelectedCity(newValue)}
        inputValue={searchQuery}
        onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search City"
            variant="outlined"
            fullWidth
            style={{ margin: '20px 0' }}
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddSelectedCity}
        style={{
          padding: '8px 16px',
          fontSize: '0.9rem',
          background: 'linear-gradient(to right, #4caf50, #66bb6a)',
          color: '#fff',
          borderRadius: '5px',
          textTransform: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          margin: '10px 0',
        }}
      >
        Add Selected City
      </Button>

      {/* Error Handling */}
      {isError && <Typography color="error">Error: {error.message}</Typography>}

      {/* Data Table */}
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={localCities.map((city, index) => ({ ...city, id: city.id || index }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteCityId} onClose={() => setDeleteCityId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this city?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteCityId(null)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteCity}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit City Dialog */}
      <Dialog open={!!editCity} onClose={() => setEditCity(null)}>
        <DialogTitle>Edit City</DialogTitle>
        <DialogContent>
          <TextField
            label="City Name"
            fullWidth
            margin="normal"
            value={editCity?.name || ''}
            onChange={(e) => setEditCity({ ...editCity, name: e.target.value })}
          />
          <TextField
            label="Latitude"
            fullWidth
            margin="normal"
            value={editCity?.latitude || ''}
            onChange={(e) => setEditCity({ ...editCity, latitude: e.target.value })}
          />
          <TextField
            label="Longitude"
            fullWidth
            margin="normal"
            value={editCity?.longitude || ''}
            onChange={(e) => setEditCity({ ...editCity, longitude: e.target.value })}
          />
          <TextField
            label="Country"
            fullWidth
            margin="normal"
            value={editCity?.country || ''}
            onChange={(e) => setEditCity({ ...editCity, country: e.target.value })}
          />
          <TextField
            label="Population"
            fullWidth
            margin="normal"
            value={editCity?.population || ''}
            onChange={(e) => setEditCity({ ...editCity, population: e.target.value })}
          />
          <FormControlLabel
            control={
              <Switch
                checked={editCity?.is_capital || false}
                onChange={(e) => setEditCity({ ...editCity, is_capital: e.target.checked })}
              />
            }
            label="Is Capital"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCity(null)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
