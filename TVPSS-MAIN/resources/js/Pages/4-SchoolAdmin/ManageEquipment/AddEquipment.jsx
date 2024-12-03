import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { useState, useEffect } from 'react';
import { FiClipboard, FiLayers, FiMapPin, FiCalendar, FiSettings } from 'react-icons/fi';

export default function AddEquipment() {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
        acquired_date: '', 
        status: ''
    });

    const [statusOptions, setStatusOptions] = useState([]);

    useEffect(() => {
        const fetchStatusOptions = async () => {
            try {
                const response = await fetch('/status-options');
                const data = await response.json();
                setStatusOptions(data.status); 
            } catch (error) {
                console.error('Error fetching status options:', error);
            }
        };

        fetchStatusOptions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    /*const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            ...formData,
            acquired_date: formData.acquired_date
        };

        Inertia.post('/equipment', formattedData); // Post the correctly formatted data
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const acquired_date = new Date(formData.acquired_date).toISOString().split('T')[0];
    
        const updatedFormData = {
            ...formData,
            acquired_date: acquired_date 
        };
    
        console.log("Formatted Date:", updatedFormData.acquired_date);
    
        Inertia.post('/equipment', updatedFormData);
    };

    const handleCancel = () => {
        Inertia.get('/listEquipment');
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tambah Barang</h2>}
        >
            <Head title="Tambah Barang" />
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/6 p-8 text-white min-h-screen">
                    <SchoolAdminSideBar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Tambah Barang</h3>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {/* Nama Barang */}
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                    <FiClipboard className="text-gray-500 ml-3" size={20} />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border-0 focus:ring-0 rounded-lg"
                                        placeholder="Masukkan Nama Barang"
                                    />
                                </div>

                                {/* Jenis */}
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                    <FiLayers className="text-gray-500 ml-3" size={20} />
                                    <input
                                        type="text"
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border-0 focus:ring-0 rounded-lg"
                                        placeholder="Masukkan Jenis"
                                    />
                                </div>

                                {/* Lokasi */}
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                    <FiMapPin className="text-gray-500 ml-3" size={20} />
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border-0 focus:ring-0 rounded-lg"
                                        placeholder="Masukkan Lokasi"
                                    />
                                </div>

                                {/* Tarikh Diperolehi */}
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                    <FiCalendar className="text-gray-500 ml-3" size={20} />
                                    <input
                                        type="date"
                                        id="acquired_date"
                                        name="acquired_date" // Ensure this matches the controller field name
                                        value={formData.acquired_date} // Ensure this is in the correct format (YYYY-MM-DD)
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border-0 focus:ring-0 rounded-lg"
                                    />
                                </div>

                                {/* Status */}
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                    <FiSettings className="text-gray-500 ml-3" size={20} />
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border-0 focus:ring-0 rounded-lg"
                                    >
                                        <option value="">Pilih Status</option>
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>

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
