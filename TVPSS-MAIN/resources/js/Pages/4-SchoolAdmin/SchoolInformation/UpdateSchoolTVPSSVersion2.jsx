import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { useEffect, useState } from 'react';

export default function UpdateSchoolVersionInfo({ schoolInfo, schoolVersion }) {
    const { data, setData, post, errors } = useForm({
        agency1_name: "",
        agency1Manager_name: "",
        agency2_name: "",
        agency2Manager_name: "",
        noPhone: "Ada",
        recordEquipment: "Ada",
        greenScreen: "Ada",
        schoolLogo: null,
    });

    useEffect(() => {
        if (schoolInfo && schoolVersion) {
            setData({
                agency1_name: schoolInfo.agency1_name || "",
                agency1Manager_name: schoolInfo.agency1Manager_name || "",
                agency2_name: schoolInfo.agency2_name || "",
                agency2Manager_name: schoolInfo.agency2Manager_name || "",
                state: schoolInfo.state || "",
                noPhone: schoolInfo.noPhone || "",
                recordEquipment: schoolInfo.recordEquipment || "",
                greenScreen: schoolInfo.greenScreen || "",
                schoolLogo: "", 
            });
        }
    }, [schoolInfo, schoolVersion]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        setData((prevData) => ({
            ...prevData,
            schoolLogo: files[0],
        }));
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
                                        name="agency1_name"
                                        value={data.agency1_name}
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
                                        name="agency1Manager_name"
                                        value={data.agency1Manager_name}
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
                                        name="agency2_name"
                                        value={data.agency2_name}
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
                                        name="agency2Manager_name"
                                        value={data.agency2Manager_name}
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
                                        name="noPhone"
                                        value={data.noPhone}
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
                                        name="recordEquipment"
                                        value={data.recordEquipment}
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
                                        value={data.greenScreen}
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
