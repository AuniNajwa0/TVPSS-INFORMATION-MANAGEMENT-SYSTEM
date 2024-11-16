import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SuperAdminSideBar from './SuperAdminSideBar';
import { useState } from 'react';
import { FiUser, FiMail, FiUserCheck } from 'react-icons/fi';

export default function Dashboard() {
    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: ''
    });

    // Handler to update form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send to API)
        console.log(formData);
    };

    // Handler for cancel action
    const handleCancel = () => {
        setFormData({
            name: '',
            email: '',
            role: ''
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pengguna Baharu
                </h2>
            }
        >
            <Head title="Pengguna Baharu" />
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/6 p-8 text-white min-h-screen">
                    <SuperAdminSideBar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-md border border-gray-200">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Tambah Pengguna</h3>
                        
                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {/* Name Field */}
                                <div className="flex items-center border border-[#455185] rounded-lg">
                                    <FiUser className="text-[#455185] ml-4" size={20} />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-4 py-2 border-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                                        placeholder="Masukkan Nama"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="flex items-center border border-[#455185] rounded-lg">
                                    <FiMail className="text-[#455185] ml-4" size={20} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-4 py-2 border-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                                        placeholder="Masukkan Email"
                                    />
                                </div>

                                {/* Role Dropdown */}
                                <div className="flex items-center border border-[#455185] rounded-lg">
                                    <FiUserCheck className="text-[#455185] ml-4" size={20} />
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-4 py-2 border-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                                    >
                                        <option value="">Pilih Jenis Pengguna</option>
                                        <option value="SUPER ADMIN">Super Admin</option>
                                        <option value="ADMIN PPD">PPD Admin</option>
                                        <option value="ADMIN SEKOLAH">School Admin</option>
                                        <option value="ADMIN STATE">State Admin</option>
                                    </select>
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-6 mt-8">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-6 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-[#455185] text-white rounded-md shadow-md hover:bg-[#3d4674] focus:outline-none focus:ring-2 focus:ring-[#455185] transition"
                                    >
                                        Hantar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
