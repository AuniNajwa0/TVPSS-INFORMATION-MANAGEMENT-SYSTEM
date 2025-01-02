import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { 
    Package, 
    Tag, 
    MapPin, 
    Calendar, 
    Activity,
    AlertCircle,
    Upload,
    X
} from 'lucide-react';

// Import necessary Material UI components
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';

export default function AddEquipment() {
    const [formData, setFormData] = useState({
        equipName: '',
        equipType: '',
        otherType: '',
        location: '',
        acquired_date: '',
        status: '',
        followUpUpdateSchool: '',
        uploadBrEq: [],
    });

    const [statusOptions, setStatusOptions] = useState([]);
    const [locations, setLocations] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);

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
                const response = await fetch('/locations');
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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 2);
        setFormData((prevData) => ({
            ...prevData,
            uploadBrEq: files,
        }));

        const previews = files.map((file) => URL.createObjectURL(file));
        setFilePreviews(previews);
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
        <AuthenticatedLayout>
            <Head title="TVPSS | Tambah Barang" />
            <div className="flex bg-white">
                {/* Sidebar */}
                <div className="w-1/6 p-8 text-white min-h-screen">
                    <SchoolAdminSideBar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 bg-white">
                    {/* Breadcrumb Section */}
                    <div className="w-full p-6">
                        <div className="flex items-center text-left">
                            <nav className="mb-8">
                                <ol className="flex items-center space-x-2 text-gray-600">
                                    <li>
                                        <a href="/listEquipment" className="text-[#4158A6] hover:text-blue-800 font-medium">
                                            Pengurusan Peralatan
                                        </a>
                                    </li>
                                    <li className="text-gray-500">/</li>
                                    <li className="text-gray-900 font-medium">
                                        Tambah Barang
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    {/* Main Form */}
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

                        {/* Show additional "Other" input if "Other" is selected */}
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

                        {/* File Upload Section for "Tidak Berfungsi" */}
                        {formData.status === 'Tidak Berfungsi' && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <AlertCircle className="absolute top-3 left-3 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        id="followUpUpdateSchool"
                                        name="followUpUpdateSchool"
                                        value={formData.followUpUpdateSchool}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#455185] focus:border-transparent"
                                        placeholder="Maklumat Kerosakan Barang"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="flex items-center space-x-2">
                                        <Upload className="text-gray-400" size={20} />
                                        <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                                            <span className="text-sm text-gray-600">Upload Images</span>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-4">
                                        {filePreviews.map((preview, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center px-6 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition-colors duration-200"
                            >
                                <X className="mr-2" size={20} />
                                Batal
                            </button>
                            <button 
                                type="submit"
                                className="flex items-center px-6 py-2 bg-[#455185] text-white rounded-md shadow-md hover:bg-[#3d4674] focus:outline-none focus:ring-2 focus:ring-[#455185] transition-colors duration-200"
                            >
                                <Upload className="mr-2" size={20} />
                                Hantar
                            </button>
                        </div>
                    </Box>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
