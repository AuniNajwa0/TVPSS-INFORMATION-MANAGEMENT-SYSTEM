import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SuperAdminSideBar from '../SuperAdminSideBar';
import { useState } from 'react';
import { FiUser, FiMail, FiUserCheck, FiMapPin, FiFlag, FiBook } from 'react-icons/fi';

export default function Dashboard() {
    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        state: '',
        district: '',
        school: ''
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
        console.log(formData);
    };

    // Handler for cancel action
    const handleCancel = () => {
        setFormData({
            name: '',
            email: '',
            role: '',
            state: '',
            district: '',
            school: ''
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kemaskini Pengguna
                </h2>
            }
        >
            <Head title="Kemaskini Pengguna" />
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/6 p-8 text-white min-h-screen">
                    <SuperAdminSideBar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-md border border-gray-200">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Kemaskini Pengguna</h3>
                        
                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {/* Name Field */}
                                <div className="flex items-center border border-[#455185] rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <FiUser className="text-[#455185] mr-3" size={20} />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full text-gray-700 placeholder-gray-500 border-none focus:ring-0 focus:outline-none"
                                        placeholder="Masukkan Nama"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="flex items-center border border-[#455185] rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <FiMail className="text-[#455185] mr-3" size={20} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full text-gray-700 placeholder-gray-500 border-none focus:ring-0 focus:outline-none"
                                        placeholder="Masukkan Email"
                                    />
                                </div>

                                {/* Role Dropdown */}
                                <div className="flex items-center border border-[#455185] rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <FiUserCheck className="text-[#455185] mr-3" size={20} />
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full text-gray-700 placeholder-gray-500 border-none focus:ring-0 focus:outline-none"
                                    >
                                        <option value="">Pilih Jenis Pengguna</option>
                                        <option value="SUPER ADMIN">Super Admin</option>
                                        <option value="ADMIN PPD">PPD Admin</option>
                                        <option value="ADMIN SEKOLAH">School Admin</option>
                                        <option value="ADMIN STATE">State Admin</option>
                                    </select>
                                </div>

                                {/* State Dropdown */}
                                <div className="flex items-center border border-[#455185] rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <FiFlag className="text-[#455185] mr-3" size={20} />
                                    <select
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full text-gray-700 placeholder-gray-500 border-none focus:ring-0 focus:outline-none"
                                    >
                                        <option value="">Pilih Negeri</option>
                                        <option value="Johor">Johor</option>
                                        <option value="Kedah">Kedah</option>
                                        <option value="Perak">Perak</option>
                                        <option value="Penang">Penang</option>
                                        <option value="Kelantan">Kelantan</option>
                                        <option value="Melaka">Melaka</option>
                                        <option value="Negeri Sembilan">Negeri Sembilan</option>
                                        <option value="Perlis">Perlis</option>
                                        <option value="Sabah">Sabah</option>
                                        <option value="Sarawak">Sarawak</option>
                                        <option value="Terengganu">Terengganu</option>
                                    </select>
                                </div>

                                {/* District Dropdown */}
                                <div className="flex items-center border border-[#455185] rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <FiMapPin className="text-[#455185] mr-3" size={20} />
                                    <select
                                        id="district"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        className="w-full text-gray-700 placeholder-gray-500 border-none focus:ring-0 focus:outline-none"
                                    >
                                        <option value="">Pilih Daerah</option>
                                        <option value="Johor Bahru">Johor Bahru</option>
                                        <option value="Skudai">Skudai</option>
                                        <option value="Kulai">Kulai</option>
                                        <option value="Pontian">Pontian</option>
                                        <option value="Batu Pahat">Batu Pahat</option>
                                        <option value="Muar">Muar</option>
                                    </select>
                                </div>

                                {/* School Dropdown */}
                                <div className="flex items-center border border-[#455185] rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <FiBook className="text-[#455185] mr-3" size={20} />
                                    <select
                                        id="school"
                                        name="school"
                                        value={formData.school}
                                        onChange={handleInputChange}
                                        className="w-full text-gray-700 placeholder-gray-500 border-none focus:ring-0 focus:outline-none"
                                    >
                                        <option value="">Pilih Sekolah</option>
                                        <option value="SK Johor Jaya">SK Johor Jaya</option>
                                        <option value="SK Bandar Baru Uda">SK Bandar Baru Uda</option>
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
                                        Kemaskini
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
