import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'; // Import for dropdown
import Button from '@mui/material/Button';

export default function UpdateSchoolTVPSSVersion({ schoolInfo }) {
    const malaysianStates = [
        "Johor",
        "Kedah",
        "Kelantan",
        "Melaka",
        "Negeri Sembilan",
        "Pahang",
        "Pulau Pinang",
        "Perak",
        "Perlis",
        "Sabah",
        "Sarawak",
        "Selangor",
        "Terengganu",
        "Wilayah Persekutuan Kuala Lumpur",
        "Wilayah Persekutuan Labuan",
        "Wilayah Persekutuan Putrajaya",
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        schoolCode: schoolInfo?.schoolCode || "", 
        schoolName: schoolInfo?.schoolName || "",
        schoolAddress1: schoolInfo?.schoolAddress1 || "",
        schoolAddress2: schoolInfo?.schoolAddress2 || "",
        postcode: schoolInfo?.postcode || "",
        state: schoolInfo?.state || "",
        noPhone: schoolInfo?.noPhone || "",
        schoolEmail: schoolInfo?.schoolEmail || "",
        noFax: schoolInfo?.noFax || "",
        schoolLogo: null,
        linkYoutube: schoolInfo?.linkYoutube || "",
    });

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (schoolInfo?.schoolLogo) {
            setImagePreview(`/${schoolInfo.schoolLogo}`);
        }
    }, [schoolInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            setData("schoolLogo", files[0]); 
    
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result); 
            reader.readAsDataURL(files[0]);
        } else {
            setData("schoolLogo", null); 
            setImagePreview(null);
        }
    };    

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tvpss1Edit'), {
            onSuccess: () => {
                console.log("School version information updated!");
                window.location.href = route('schoolInfo.updateTVPSSVer2');
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleCancel = () => {
        reset();
        setImagePreview(schoolInfo?.schoolLogo ? `/images/${schoolInfo.schoolLogo}` : null);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kemaskini Versi Sekolah
                </h2>
            }
        >
            <Head title="TVPSS | Kemaskini Versi Sekolah" />
            <div className="flex min-h-screen bg-gray-100">
                <SchoolAdminSideBar />
                <div className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md border border-gray-200 p-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            Maklumat Versi Sekolah
                        </h3>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            {/* Logo Upload Section */}
                            <div className="mb-8 text-center">
                                <input
                                    type="file"
                                    name="schoolLogo"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="schoolLogoUpload"
                                />
                                <div
                                    className="relative w-48 h-48 mx-auto bg-gray-100 border-4 border-solid border-blue-900 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                                    onClick={() => document.getElementById('schoolLogoUpload').click()}
                                >
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Logo Sekolah Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
                                            Klik untuk Muat Naik Logo
                                        </div>
                                    )}
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-12 h-12 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {errors.schoolLogo && (
                                    <div className="text-red-500 mt-2">{errors.schoolLogo}</div>
                                )}
                            </div>
                            {/* Form Fields */}
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <Box className="col-span-2">
                                    <TextField
                                        label="Kod Sekolah"
                                        variant="outlined"
                                        fullWidth
                                        name="schoolCode"
                                        value={data.schoolCode}
                                        onChange={handleInputChange}
                                        error={!!errors.schoolCode}
                                        helperText={errors.schoolCode}
                                    />
                                </Box>
                                <Box className="col-span-2">
                                    <TextField
                                        label="Nama Sekolah"
                                        variant="outlined"
                                        fullWidth
                                        name="schoolName"
                                        value={data.schoolName}
                                        onChange={handleInputChange}
                                        error={!!errors.schoolName}
                                        helperText={errors.schoolName}
                                    />
                                </Box>
                                <Box className="col-span-1">
                                    <TextField
                                        label="Alamat Sekolah 1"
                                        variant="outlined"
                                        fullWidth
                                        name="schoolAddress1"
                                        value={data.schoolAddress1}
                                        onChange={handleInputChange}
                                        error={!!errors.schoolAddress1}
                                        helperText={errors.schoolAddress1}
                                    />
                                </Box>
                                <Box className="col-span-1">
                                    <TextField
                                        label="Alamat Sekolah 2"
                                        variant="outlined"
                                        fullWidth
                                        name="schoolAddress2"
                                        value={data.schoolAddress2}
                                        onChange={handleInputChange}
                                        error={!!errors.schoolAddress2}
                                        helperText={errors.schoolAddress2}
                                    />
                                </Box>
                                <Box className="col-span-1">
                                    <TextField
                                        label="Poskod"
                                        variant="outlined"
                                        fullWidth
                                        name="postcode"
                                        value={data.postcode}
                                        onChange={handleInputChange}
                                        error={!!errors.postcode}
                                        helperText={errors.postcode}
                                    />
                                </Box>
                                <Box className="col-span-1">
                                    <TextField
                                        select
                                        label="Negeri"
                                        variant="outlined"
                                        fullWidth
                                        name="state"
                                        value={data.state}
                                        onChange={handleInputChange}
                                        error={!!errors.state}
                                        helperText={errors.state}
                                    >
                                        {malaysianStates.map((state) => (
                                            <MenuItem key={state} value={state}>
                                                {state}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </div>
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <Box>
                                    <TextField
                                        label="No Telefon"
                                        variant="outlined"
                                        fullWidth
                                        name="noPhone"
                                        value={data.noPhone}
                                        onChange={handleInputChange}
                                        error={!!errors.noPhone}
                                        helperText={errors.noPhone}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        name="schoolEmail"
                                        value={data.schoolEmail}
                                        onChange={handleInputChange}
                                        error={!!errors.schoolEmail}
                                        helperText={errors.schoolEmail}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="No Fax"
                                        variant="outlined"
                                        fullWidth
                                        name="noFax"
                                        value={data.noFax}
                                        onChange={handleInputChange}
                                        error={!!errors.noFax}
                                        helperText={errors.noFax}
                                    />
                                </Box>
                            </div>
                            <div className="mb-6">
                                <TextField
                                    label="Link Video (YouTube)"
                                    variant="outlined"
                                    fullWidth
                                    name="linkYoutube"
                                    value={data.linkYoutube}
                                    onChange={handleInputChange}
                                    error={!!errors.linkYoutube}
                                    helperText={errors.linkYoutube}
                                />
                            </div>
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
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? "Memproses..." : "Seterusnya"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
