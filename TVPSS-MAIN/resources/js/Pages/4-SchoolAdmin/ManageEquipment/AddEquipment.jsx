import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import React, { useState, useEffect } from 'react';
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
    Box,
    Typography,
} from '@mui/material';

export default function AddEquipment() {
    const [formData, setFormData] = useState({
        equipName: '',
        equipType: '',
        otherType: '', 
        location: '',
        acquired_date: '',
        status: '',
    });

    const [statusOptions, setStatusOptions] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchStatusOptions = async () => {
            try {
                const response = await fetch('/status-options');
                const data = await response.json();
                setStatusOptions(data.status);
            } catch (error) {
                console.error('Error fetching status options:', error);
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await fetch('/locations'); // Endpoint to fetch locations
                const data = await response.json();
                setLocations(data.locations);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchStatusOptions();
        fetchLocations();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let acquired_date = formData.acquired_date;
        if (acquired_date) {
            acquired_date = new Date(acquired_date).toISOString().split('T')[0];
        }
    
        const updatedFormData = {
            ...formData,
            acquired_date,
        };
    
        console.log("Form Data:", updatedFormData); // Debugging log
    
        Inertia.post('/equipment', updatedFormData);
    };      
    

    const handleCancel = () => {
        Inertia.get('/listEquipment');
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tambah Barang</h2>}
        >
            <Head title="TVPSS | Tambah Barang" />
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/6 p-8 text-white min-h-screen">
                    <SchoolAdminSideBar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200"
                    >
                        <Typography variant="h5" gutterBottom>
                            Tambah Barang
                        </Typography>

                        {/* Nama Barang */}
                        <TextField
                            fullWidth
                            margin="normal"
                            id="equipName"
                            name="equipName"
                            label="Nama Barang"
                            value={formData.equipName}
                            onChange={handleInputChange}
                        />

                        {/* Jenis (Type) */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="type-label">Jenis</InputLabel>
                            <Select
                                labelId="type-label"
                                id="equipType"
                                name="equipType"
                                value={formData.equipType}
                                onChange={handleInputChange}
                                label="Jenis"
                            >
                                <MenuItem value="">Pilih Jenis</MenuItem>
                                <MenuItem value="Phone">Phone</MenuItem>
                                <MenuItem value="Tablet">Tablet</MenuItem>
                                <MenuItem value="Laptop">Laptop</MenuItem>
                                <MenuItem value="PC">PC</MenuItem>
                                <MenuItem value="Microphone">Mic</MenuItem>
                                <MenuItem value="Barang Sukan">Barang Sukan</MenuItem>
                                <MenuItem value="Perabot">Perabot</MenuItem>
                                <MenuItem value="Kenderaan">Kenderaan</MenuItem>
                                <MenuItem value="other">Other (Please Specify)</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Show the additional "Other" field if "Other" is selected */}
                        {formData.equipType === 'other' && (
                            <TextField
                                fullWidth
                                margin="normal"
                                id="otherType"
                                name="otherType"
                                label="Jenis Peralatan Lain"
                                value={formData.otherType}
                                onChange={handleInputChange}
                            />
                        )}

                        {/* Lokasi */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="location-label">Lokasi</InputLabel>
                            <Select
                                labelId="location-label"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                label="Lokasi"
                            >
                                <MenuItem value="">Pilih Lokasi</MenuItem>
                                {locations.map((location) => (
                                    <MenuItem key={location.id} value={location.eqLocName}>
                                        {location.eqLocName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Tarikh Diperolehi */}
                        <TextField
                            fullWidth
                            margin="normal"
                            id="acquired_date"
                            name="acquired_date"
                            label="Tarikh Diperolehi"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formData.acquired_date}
                            onChange={handleInputChange}
                        />

                        {/* Status */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                label="Status"
                            >
                                <MenuItem value="">Pilih Status</MenuItem>
                                {statusOptions.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-6 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
                                onClick={handleCancel}
                            >
                                Batal
                            </button>
                            <button 
                                className="px-6 py-2 bg-[#455185] text-white rounded-md shadow-md hover:bg-[#3d4674] focus:outline-none focus:ring-2 focus:ring-[#455185] transition"
                                type="submit">
                                Hantar
                            </button>
                        </div>
                    </Box>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
