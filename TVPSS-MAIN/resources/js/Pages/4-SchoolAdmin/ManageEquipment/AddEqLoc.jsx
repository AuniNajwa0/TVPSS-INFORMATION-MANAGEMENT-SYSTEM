import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { useState } from 'react';
import { FiMapPin, FiLayers } from 'react-icons/fi';

export default function AddEqLoc() {
    const [formData, setFormData] = useState({
        eqLocName: '',
        eqLocType: '',
        otherType: '' // Store custom type for "Other"
    });

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data
        const updatedFormData = {
            ...formData,
            eqLocType: formData.eqLocType === 'other' ? formData.otherType : formData.eqLocType // Store custom type only if "other"
        };

        Inertia.post('/eqLoc', updatedFormData); // Update endpoint accordingly
    };

    // Handle cancel button
    const handleCancel = () => {
        Inertia.get('/listEquipment'); // Navigate back to the list of equipment
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tambah Lokasi</h2>}
        >
            <Head title="TVPSS | Tambah Lokasi" />
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/6 p-8 text-white min-h-screen">
                    <SchoolAdminSideBar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Tambah Lokasi</h3>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {/* Lokasi Name */}
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                    <FiMapPin className="text-gray-500 ml-3" size={20} />
                                    <input
                                        type="text"
                                        id="eqLocName"
                                        name="eqLocName"
                                        value={formData.eqLocName}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border-0 focus:ring-0 rounded-lg"
                                        placeholder="Masukkan Nama Lokasi"
                                    />
                                </div>

                                {/* Lokasi Type */}
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                    <FiLayers className="text-gray-500 ml-3" size={20} />
                                    <select
                                        id="eqLocType"
                                        name="eqLocType"
                                        value={formData.eqLocType}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border-0 focus:ring-0 rounded-lg"
                                    >
                                        <option value="">Pilih Jenis Lokasi</option>
                                        <option value="Computer Lab">Computer Lab</option>
                                        <option value="Show Corner">Show Corner</option>
                                        <option value="Mini Studio">Mini Studio</option>
                                        <option value="Recording Corner">Recording Corner</option>
                                        <option value="Broadcast Studio">Broadcast Studio</option>
                                        <option value="Conference Room">Conference Room</option>
                                        <option value="other">Lain-lain (Sila Nyatakan)</option>
                                    </select>
                                </div>

                                {/* Show the additional "Other" field if "Other" is selected */}
                                {formData.eqLocType === 'other' && (
                                    <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                        <FiLayers className="text-gray-500 ml-3" size={20} />
                                        <input
                                            type="text"
                                            id="otherType"
                                            name="otherType"
                                            value={formData.otherType}
                                            onChange={handleInputChange}
                                            className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border-0 focus:ring-0 rounded-lg"
                                            placeholder="Sila masukkan jenis lokasi lain"
                                        />
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
