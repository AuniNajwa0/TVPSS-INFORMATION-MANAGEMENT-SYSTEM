import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function UpdateSchoolVersionInfo2({ schoolInfo, schoolVersion }) {
    const { data, setData, post, errors } = useForm({
        agency1_name: '',
        agency1Manager_name: '',
        agency2_name: '',
        agency2Manager_name: '',
        noPhone: 'Ada',
        recordEquipment: 'Ada',
        greenScreen: 'Ada',
        tvpssLogo: null, // TVPSS logo only
    });

    const [tvpssLogoPreview, setTVPSSLogoPreview] = useState(null);

    useEffect(() => {
        if (schoolInfo && schoolVersion) {
            setData({
                agency1_name: schoolInfo.agency1_name || '',
                agency1Manager_name: schoolInfo.agency1Manager_name || '',
                agency2_name: schoolInfo.agency2_name || '',
                agency2Manager_name: schoolInfo.agency2Manager_name || '',
                noPhone: schoolInfo.noPhone || 'Ada',
                recordEquipment: schoolInfo.recordEquipment || 'Ada',
                greenScreen: schoolInfo.greenScreen || 'Ada',
                tvpssLogo: '', // Initialize tvpssLogo
            });

            if (schoolVersion.tvpssLogo) {
                setTVPSSLogoPreview(`${window.location.origin}/${schoolVersion.tvpssLogo}`);
            }
        }
    }, [schoolInfo, schoolVersion]);

    const handleFileChange = (e) => {
        const { files } = e.target;
        setData('tvpssLogo', files[0]);

        if (files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTVPSSLogoPreview(reader.result);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tvpss2Edit'), {
            onSuccess: () => {
                console.log('School TVPSS Version updated successfully!');
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Informasi Versi TVPSS Sekolah
                </h2>
            }
        >
            <Head title="TVPSS | Kemaskini Versi TVPSS" />
            <div className="flex min-h-screen bg-gray-100">
                <SchoolAdminSideBar />
                <div className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg border border-gray-300 p-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Maklumat TVPSS
                        </h3>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            {/* TVPSS Logo */}
                            <Box className="mb-6 text-center">
                                <input
                                    type="file"
                                    name="tvpssLogo"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="tvpssLogoUpload"
                                />
                                <div
                                    className="relative w-48 h-48 mx-auto bg-gray-100 border-4 border-solid border-blue-00 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                                    onClick={() => document.getElementById('tvpssLogoUpload').click()}
                                >
                                    {tvpssLogoPreview ? (
                                        <img
                                            src={tvpssLogoPreview}
                                            alt="TVPSS Logo Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
                                            Klik untuk Muat Naik Logo TVPSS
                                        </div>
                                    )}
                                </div>
                                {errors.tvpssLogo && (
                                    <div className="text-red-500 mt-2">{errors.tvpssLogo}</div>
                                )}
                            </Box>

                            {/* Agency Details */}
                            <Box className="grid grid-cols-2 gap-6 mb-6">
                                <TextField
                                    label="Syarikat Kolaborasi Agensi I"
                                    name="agency1_name"
                                    value={data.agency1_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!errors.agency1_name}
                                    helperText={errors.agency1_name}
                                />
                                <TextField
                                    label="Pengurus Syarikat Agensi I"
                                    name="agency1Manager_name"
                                    value={data.agency1Manager_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!errors.agency1Manager_name}
                                    helperText={errors.agency1Manager_name}
                                />
                                <TextField
                                    label="Syarikat Kolaborasi Agensi II"
                                    name="agency2_name"
                                    value={data.agency2_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!errors.agency2_name}
                                    helperText={errors.agency2_name}
                                />
                                <TextField
                                    label="Pengurus Syarikat Agensi II"
                                    name="agency2Manager_name"
                                    value={data.agency2Manager_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!errors.agency2Manager_name}
                                    helperText={errors.agency2Manager_name}
                                />
                            </Box>

                            {/* Additional Details */}
                            <Box className="grid grid-cols-3 gap-6 mb-6">
                                <FormControl fullWidth>
                                    <InputLabel>No Telefon</InputLabel>
                                    <Select
                                        name="noPhone"
                                        value={data.noPhone}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Ada">Ada</MenuItem>
                                        <MenuItem value="Tiada">Tiada</MenuItem>
                                    </Select>
                                    {errors.noPhone && (
                                        <div className="text-red-500">{errors.noPhone}</div>
                                    )}
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel>Peralatan Rakaman</InputLabel>
                                    <Select
                                        name="recordEquipment"
                                        value={data.recordEquipment}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Ada">Ada</MenuItem>
                                        <MenuItem value="Tiada">Tiada</MenuItem>
                                    </Select>
                                    {errors.recordEquipment && (
                                        <div className="text-red-500">{errors.recordEquipment}</div>
                                    )}
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel>Penggunaan Teknologi 'Green Screen'</InputLabel>
                                    <Select
                                        name="greenScreen"
                                        value={data.greenScreen}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Ada">Ada</MenuItem>
                                        <MenuItem value="Tiada">Tiada</MenuItem>
                                    </Select>
                                    {errors.greenScreen && (
                                        <div className="text-red-500">{errors.greenScreen}</div>
                                    )}
                                </FormControl>
                            </Box>

                            {/* Buttons */}
                            <div className="flex justify-between">
                                <Link
                                    href="/updateSchoolTVPSSVersion"
                                    className="px-6 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600"
                                >
                                    Kembali
                                </Link>
                                <button
                                    className="px-6 py-2 bg-[#455185] text-white rounded-md shadow-md hover:bg-[#3d4674] focus:outline-none focus:ring-2 focus:ring-[#455185] transition"
                                    type="submit"
                                    disabled={errors.processing}
                                >
                                    Hantar Informasi TVPSS
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
