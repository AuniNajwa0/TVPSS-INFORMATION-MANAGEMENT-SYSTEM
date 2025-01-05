import React from 'react';
import { Head, usePage } from '@inertiajs/react'; // Import usePage from Inertia
import { FaArrowLeft } from 'react-icons/fa'; // Icon for Back
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ApproveStudCrew = () => {
    const { push } = usePage().props; // Destructure the push method to navigate

    // Dummy data for crew
    const crew = {
        student: {
            name: 'Ahmad Bin Ali',
            ic_num: '890123045678',
            email: 'ahmad@example.com',
            application_date: '2025-01-03',
        },
        jawatan: 'Ketua Krew',
        status: 'Pending',
    };

    // Function to navigate back
    const handleBack = () => {
        push('/studCrewList');
    };

    return (
        <AuthenticatedLayout>
            <Head title="TVPSS | Approve StudCrew" />
            <div className="flex flex-col md:flex-row min-h-screen bg-white">
                {/* Sidebar */}
                <div className="w-1/6 bg-white shadow-lg">
                    <SchoolAdminSideBar />
                </div>

                {/* Main Content */}
                <div className="w-full md:ml-[120px] p-7">
                    <div className="flex items-center justify-between mb-7">
                        <nav className="mb-9">
                            <ol className="flex items-center space-x-2 text-gray-600">
                                <li>
                                    <a
                                        href="/studCrewList"
                                        className="text-[#4158A6] hover:text-blue-800 font-medium"
                                    >
                                        Permohonan Krew
                                    </a>
                                </li>
                                <li className="text-gray-500">/</li>
                                <li className="text-gray-900 font-medium">Lihat Krew</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="max-w-8xl mx-auto p-7 text-gray-900 bg-white border border-gray-200 shadow rounded-2xl">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-semibold text-[#4158A6]">Maklumat Krew</h2>
                            <button
                                onClick={handleBack} // Trigger navigation on click
                                className="flex items-center space-x-2 text-[#4158A6] hover:text-blue-800"
                            >
                                <FaArrowLeft size={20} />
                                <span>Kembali</span>
                            </button>
                        </div>

                        <div className="bg-white border p-7 rounded-lg shadow-md">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nama Pelajar
                                    </label>
                                    <input
                                        type="text"
                                        value={crew.student.name}
                                        readOnly
                                        className="mt-1 block w-full py-2.5 px-3.5 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        No Kad Pengenalan
                                    </label>
                                    <input
                                        type="text"
                                        value={crew.student.ic_num}
                                        readOnly
                                        className="mt-1 block w-full py-2.5 px-3.5 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        E-mel
                                    </label>
                                    <input
                                        type="email"
                                        value={crew.student.email}
                                        readOnly
                                        className="mt-1 block w-full py-2.5 px-3.5 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tarikh Permohonan
                                    </label>
                                    <input
                                        type="text"
                                        value={crew.student.application_date}
                                        readOnly
                                        className="mt-1 block w-full py-2.5 px-3.5 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Jawatan
                                    </label>
                                    <input
                                        type="text"
                                        value={crew.jawatan}
                                        readOnly
                                        className="mt-1 block w-full py-2.5 px-3.5 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end mt-7">
                            <div className="flex space-x-5">
                                <button
                                    className="flex items-center space-x-2 px-7 py-4 bg-[#445184] text-white rounded-2xl hover:bg-[#3c4f88] transition-all"
                                >
                                    <span>Terima</span>
                                </button>
                                <button
                                    className="flex items-center space-x-2 px-7 py-4 bg-[#F44336] text-white rounded-2xl hover:bg-[#E53935] transition-all"
                                >
                                    <span>Tolak</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ApproveStudCrew;
