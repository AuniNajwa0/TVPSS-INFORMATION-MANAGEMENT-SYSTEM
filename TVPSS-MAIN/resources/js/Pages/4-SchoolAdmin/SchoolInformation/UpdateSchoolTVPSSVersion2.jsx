import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
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
        version: schoolVersion?.version || 0, 
        agency1_name: schoolVersion?.agency1_name || '',
        agency1Manager_name: schoolVersion?.agencyManager1_name || '',
        agency2_name: schoolVersion?.agency2_name || '',
        agency2Manager_name: schoolVersion?.agencyManager2_name || '',
        recordEquipment: schoolVersion?.recordEquipment || 'Ada',
        tvpssStudio: schoolVersion?.tvpssStudio || 'Ada',
        recInSchool: schoolVersion?.recInSchool || 'Ada',
        recInOutSchool: schoolVersion?.recInOutSchool || 'Ada',
        greenScreen: schoolVersion?.greenScreen || 'Ada',
        tvpssLogo: null,
    });

    const [tvpssLogoPreview, setTVPSSLogoPreview] = useState(null);

    useEffect(() => {
        if (schoolVersion?.tvpssLogo) {
            setTVPSSLogoPreview(`${window.location.origin}/${schoolVersion.tvpssLogo}`);
        }
    }, [schoolVersion]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('tvpssLogo', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTVPSSLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'version' ? parseInt(value, 10) : value; // Parse version as integer
        setData(name, parsedValue);
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
                                    className="relative w-48 h-48 mx-auto bg-gray-100 border-4 border-solid border-blue-500 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
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
                                    label="Agensi 1"
                                    name="agency1_name"
                                    value={data.agency1_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!errors.agency1_name}
                                    helperText={errors.agency1_name}
                                />
                                <TextField
                                    label="Pengurus Agensi 1"
                                    name="agency1Manager_name"
                                    value={data.agency1Manager_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!errors.agency1Manager_name}
                                    helperText={errors.agency1Manager_name}
                                />
                                <TextField
                                    label="Agensi 2"
                                    name="agency2_name"
                                    value={data.agency2_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!errors.agency2_name}
                                    helperText={errors.agency2_name}
                                />
                                <TextField
                                    label="Pengurus Agensi 2"
                                    name="agency2Manager_name"
                                    value={data.agency2Manager_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!errors.agency2Manager_name}
                                    helperText={errors.agency2Manager_name}
                                />
                            </Box>

                            {/* Additional Details */}
                            <Box className="grid grid-cols-2 gap-6 mb-6">
                                {[
                                    { label: 'Peralatan Rakaman', name: 'recordEquipment' },
                                    { label: 'Studio TVPSS', name: 'tvpssStudio' },
                                    { label: 'Rakaman Dalam Sekolah', name: 'recInSchool' },
                                    { label: 'Rakaman Luar Sekolah', name: 'recInOutSchool' },
                                    { label: "'Green Screen' Technology", name: 'greenScreen' },
                                ].map(({ label, name }) => (
                                    <FormControl fullWidth key={name}>
                                        <InputLabel>{label}</InputLabel>
                                        <Select
                                            name={name}
                                            value={data[name]}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="Ada">Ada</MenuItem>
                                            <MenuItem value="Tiada">Tiada</MenuItem>
                                        </Select>
                                        {errors[name] && <div className="text-red-500">{errors[name]}</div>}
                                    </FormControl>
                                ))}
                            </Box>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    href={route('tvpss1')}
                                >
                                    Kembali
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={errors.processing}
                                >
                                    Hantar Informasi TVPSS
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
