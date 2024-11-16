import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { useState } from 'react';

export default function UpdateSchoolVersionInfo() {
    const [formData, setFormData] = useState({
        agency1Name: "",
        agency1Manager: "",
        agency2Name: "",
        agency2Manager: "",
        phoneNumber: "Ada",
        recordingEquipment: "Ada",
        greenScreen: "Ada",
        logoFile: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            logoFile: files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Informasi Versi TVPSS Sekolah
                </h2>
            }
        >
            <Head title="Kemaskini Versi TVPSS" />
            <div className="flex min-h-screen bg-gray-100">
                <SchoolAdminSideBar />

                <div className="flex-1 p-10">
                    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg border border-gray-300 p-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                            Maklumat TVPSS
                        </h3>
                        <form onSubmit={handleSubmit}>
                            {/* Agency Details */}
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <div className="col-span-2">
                                    <label className="block text-gray-700 mb-2">
                                        Syarikat Kolaborasi Agensi I
                                    </label>
                                    <input
                                        type="text"
                                        name="agency1Name"
                                        value={formData.agency1Name}
                                        onChange={handleInputChange}
                                        className="border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nama Agensi I"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Pengurus Syarikat Agensi I
                                    </label>
                                    <input
                                        type="text"
                                        name="agency1Manager"
                                        value={formData.agency1Manager}
                                        onChange={handleInputChange}
                                        className="border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nama Pengurus I"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-gray-700 mb-2">
                                        Syarikat Kolaborasi Agensi II
                                    </label>
                                    <input
                                        type="text"
                                        name="agency2Name"
                                        value={formData.agency2Name}
                                        onChange={handleInputChange}
                                        className="border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nama Agensi II"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Pengurus Syarikat Agensi II
                                    </label>
                                    <input
                                        type="text"
                                        name="agency2Manager"
                                        value={formData.agency2Manager}
                                        onChange={handleInputChange}
                                        className="border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nama Pengurus II"
                                    />
                                </div>
                            </div>

                            {/* Other Info */}
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                {/* No Telefon */}
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        No Telefon
                                    </label>
                                    <select
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>Ada</option>
                                        <option>Tiada</option>
                                    </select>
                                </div>

                                {/* Peralatan Rakaman */}
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Peralatan Rakaman
                                    </label>
                                    <select
                                        name="recordingEquipment"
                                        value={formData.recordingEquipment}
                                        onChange={handleInputChange}
                                        className="border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>Ada</option>
                                        <option>Tiada</option>
                                    </select>
                                </div>

                                {/* Green Screen */}
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Penggunaan Teknologi 'Green Screen'
                                    </label>
                                    <select
                                        name="greenScreen"
                                        value={formData.greenScreen}
                                        onChange={handleInputChange}
                                        className="border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>Ada</option>
                                        <option>Tiada</option>
                                    </select>
                                </div>
                            </div>

                            {/* Logo Upload */}
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">
                                    Muat naik Logo TVPSS Sekolah
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between">
                                <Link
                                    href="/updateSchoolTVPSSVersion"
                                    className="px-6 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Kembali
                                </Link>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#455185] text-white rounded-md shadow-md hover:bg-[#3d4674] focus:outline-none focus:ring-2 focus:ring-[#455185]"
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
