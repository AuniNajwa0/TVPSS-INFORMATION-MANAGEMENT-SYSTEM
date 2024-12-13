import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function UpdateSchoolInformation(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        schoolCode: "",
        schoolName: "",
        schoolAddress1: "",
        schoolAddress2: "",
        postcode: "",
        state: "",
        noPhone: "",
        schoolEmail: "",
        noFax: "",
        schoolLogo: null,
        linkYoutube: "",
    });

    // State to hold the image preview
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (props.schoolInfo) {
            setData({
                schoolCode: props.schoolInfo.schoolCode || "",
                schoolName: props.schoolInfo.schoolName || "",
                schoolAddress1: props.schoolInfo.schoolAddress1 || "",
                schoolAddress2: props.schoolInfo.schoolAddress2 || "",
                postcode: props.schoolInfo.postcode || "",
                state: props.schoolInfo.state || "",
                noPhone: props.schoolInfo.noPhone || "",
                schoolEmail: props.schoolInfo.schoolEmail || "",
                noFax: props.schoolInfo.noFax || "",
                linkYoutube: props.schoolInfo.linkYoutube || "",
                schoolLogo: props.schoolInfo.schoolLogo || null, // Existing image link if available
            });

            // Set image preview if schoolLogo exists
            if (props.schoolInfo.schoolLogo) {
                setImagePreview(props.schoolInfo.schoolLogo);
            }
        }
    }, [props.schoolInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setData(name, files[0]);

        // Set the preview image
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set preview to file content
            };
            reader.readAsDataURL(file); // Read the file as base64 URL
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('school.update'), {
            onSuccess: () => {
                console.log('School updated successfully!');
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
                    Informasi Sekolah
                </h2>
            }
        >
            <Head title="TVPSS | Informasi Sekolah" />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <SchoolAdminSideBar />

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md border border-gray-200 p-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            Maklumat Sekolah
                        </h3>

                        {/* Form */}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                {/* School Code */}
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

                                {/* School Name */}
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

                                {/* Address 1 */}
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

                                {/* Postcode */}
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

                                {/* Address 2 */}
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

                                {/* State */}
                                <Box className="col-span-1">
                                    <TextField
                                        label="Negeri"
                                        variant="outlined"
                                        fullWidth
                                        name="state"
                                        value={data.state}
                                        onChange={handleInputChange}
                                        error={!!errors.state}
                                        helperText={errors.state}
                                    />
                                </Box>
                            </div>

                            {/* Phone, Email, Fax */}
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

                            {/* File Upload */}
                            <div className="mb-6">
                                <label className="block mb-2 text-gray-700">
                                    Muat naik Logo Sekolah
                                </label>
                                <input
                                    type="file"
                                    name="schoolLogo"
                                    onChange={handleFileChange}
                                    className="block w-full text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {/* Display the image preview */}
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img
                                            src={imagePreview}
                                            alt="Logo Sekolah Preview"
                                            className="w-20 h-20 object-cover"
                                        />
                                    </div>
                                )}
                                {errors.schoolLogo && <div className="text-red-500">{errors.schoolLogo}</div>}
                            </div>

                            {/* YouTube Link */}
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

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-4 mb-6">
                                <button
                                    type="reset"
                                    onClick={() => reset()}
                                    className="px-6 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-[#455185] text-white rounded-md shadow-md hover:bg-[#3d4674] focus:outline-none focus:ring-2 focus:ring-[#455185] transition"
                                >
                                    {processing ? 'Menghantar...' : 'Hantar Maklumat Sekolah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
