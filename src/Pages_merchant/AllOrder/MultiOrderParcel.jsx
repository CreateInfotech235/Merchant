import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { addMerchantParcelType, deleteMerchantParcelType, editMerchantParcelType, getMerchantParcelType } from '../../Components_merchant/Api/ParcelType';

function MultiOrderParcel() {
  const [parcelTypes, setParcelTypes] = useState([]);
  const [newParcel, setNewParcel] = useState({
    label: '',
    status: true
  });

  const [limit] = useState(10);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchParcelTypes();
  }, []);

  const fetchParcelTypes = async () => {
    try {
      const response = await getMerchantParcelType();
      if (response?.status && response?.data) {
        setParcelTypes(response.data);
      } else {
        setParcelTypes([]);
      }
    } catch (error) {
      setParcelTypes([]);
      toast.error('Error fetching parcel types');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newParcel,
        status: newParcel.status ? 'ENABLE' : 'DISABLE'
      };

      if (editMode && editId) {
        const response = await editMerchantParcelType(editId, payload);
        if (response?.status) {
          toast.success('Parcel type updated successfully');
          fetchParcelTypes();
        } else {
          toast.error('Failed to update parcel type');
        }
      } else {
        const response = await addMerchantParcelType(payload);
        if (response?.status) {
          fetchParcelTypes();
        } else {
          toast.error('Failed to create parcel type');
        }
      }

      setNewParcel({ label: '', status: true });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error('Invalid parcel ID');
      return;
    }
    try {
      const response = await deleteMerchantParcelType(id);
      if (response?.status) {
        toast.success('Parcel type deleted successfully');
        fetchParcelTypes();
      } else {
        toast.error('Failed to delete parcel type');
      }
    } catch (error) {
      toast.error('Error deleting parcel type');
    }
  };

  const handleEdit = (parcel) => {
    if (!parcel) return;
    setNewParcel({
      label: parcel.label || '',
      status: parcel.status === 'ENABLE'
    });
    setEditMode(true);
    setEditId(parcel.parcelTypeId);
  };

  const handleStatusChange = (e) => {
    setNewParcel(prev => ({
      ...prev,
      status: e.target.checked
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Parcel Types Management
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="Parcel Label"
          value={newParcel.label}
          onChange={(e) => setNewParcel({ ...newParcel, label: e.target.value })}
          required
          sx={{ mr: 2 }}
        />
        <Box sx={{ display: 'inline-flex', alignItems: 'center', mr: 2 }}>
          <Typography>Status:</Typography>
          <Switch
            checked={newParcel.status}
            onChange={handleStatusChange}
          />
        </Box>
        <Button type="submit" variant="contained">
          {editMode ? 'Update' : 'Create'} Parcel Type
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!parcelTypes || parcelTypes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              parcelTypes.map((parcel) => (
                <TableRow key={parcel?.parcelTypeId || Math.random()}>
                  <TableCell>{parcel?.label || 'N/A'}</TableCell>
                  <TableCell>{parcel?.status === 'ENABLE' ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>{parcel?.createdDate ? new Date(parcel.createdDate).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(parcel)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button 
                      onClick={() => handleDelete(parcel?.parcelTypeId)}
                      color="error"
                      disabled={!parcel?.parcelTypeId}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MultiOrderParcel;
