import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import StateAdminSideBar from '../StateAdminSideBar';

export default function CertificateTemplateForm(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        file: null,
    });

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setData(name, files[0]); // Store the selected file
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('uploadTemplate'), {
            onSuccess: () => {
                console.log('Templat berjaya disimpan!');
                reset(); // Reset the form after successful submission
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
                    Muat Naik Sijil Templat
                </h2>
            }
        >
            <Head title="Muat Naik Sijil Templat" />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <StateAdminSideBar />

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md border border-gray-200 p-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            Borang Muat Naik Sijil Templat 
                        </h3>

                        {/* Form */}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nama Templat"
                                    required
                                />
                                {errors.name && <div className="text-red-500">{errors.name}</div>}
                            </div>

                            {/* File Upload */}
                            <div className="mb-6">
                                <label className="block mb-2 text-gray-700">
                                    Muat Naik Fail Sijil Templat
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.file && <div className="text-red-500">{errors.file}</div>}
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
                                    {processing ? 'Uploading...' : 'Muat Naik Templat'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}