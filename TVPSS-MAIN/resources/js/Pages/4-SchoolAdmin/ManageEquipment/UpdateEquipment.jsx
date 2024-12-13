import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FiClipboard, FiLayers, FiMapPin, FiCalendar, FiSettings } from 'react-icons/fi';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { Inertia } from '@inertiajs/inertia';

export default function UpdateEquipment({ equipment, eqLocation }) {
    // Initialize the form data with the equipment data
    const [formData, setFormData] = useState({
        name: equipment?.name || '',
        type: equipment?.type || '',
        otherType: equipment?.type === 'other' ? equipment?.otherType : '',  // Preload the custom type if available
        location: equipment?.location || '',  // Assuming location is stored as eqLocName
        acquired_date: equipment?.acquired_date || '',
        status: equipment?.status || ''
    });

    const [statusOptions, setStatusOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

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

    useEffect(() => {
        setFormData({
            name: equipment?.name || '',
            type: equipment?.type || '',
            otherType: equipment?.type === 'other' ? equipment?.otherType : '',
            location: equipment?.location || '',
            acquired_date: equipment?.acquired_date || '',
            status: equipment?.status || ''
        });
    }, [equipment]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});  // Clear any previous errors

        const newErrors = {};
        if (!formData.name) newErrors.name = 'Nama Barang diperlukan!';
        if (!formData.type) newErrors.type = 'Jenis diperlukan!';
        if (!formData.location) newErrors.location = 'Lokasi diperlukan!';
        if (!formData.acquired_date) newErrors.acquired_date = 'Tarikh Diperolehi diperlukan!';
        if (!formData.status) newErrors.status = 'Status diperlukan!';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setMessage(''); 

        try {
            if (formData.type === 'other' && formData.otherType) {
                formData.type = formData.otherType;
            }

            await Inertia.put(`/equipment/${equipment.id}`, formData);
            setMessage('Barang berjaya dikemaskini!');
        } catch (error) {
            setMessage('Ralat berlaku, sila cuba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kemaskini Barang</h2>}
        >
            <Head title="Kemaskini Barang" />
            <div className="flex">
                <div className="w-1/6 p-8 text-white min-h-screen">
                    <SchoolAdminSideBar />
                </div>

                <div className="flex-1 p-6">
                    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Kemaskini Barang</h3>

                        {/* Feedback message */}
                        {message && (
                            <div className={`text-${message.includes('berjaya') ? 'green' : 'red'}-500 mb-4`}>
                                {message}
                            </div>
                        )}

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
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

                                {/* Jenis */}
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                    <FiLayers className="text-gray-500 ml-3" size={20} />
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border-0 focus:ring-0 rounded-lg"
                                    >
                                        <option value="">Pilih Jenis</option>
                                        <option value="Phone">Phone</option>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Laptop">Laptop</option>
                                        <option value="PC">PC</option>
                                        <option value="Microphone">Mic</option>
                                        <option value="Barang Sukan">Barang Sukan</option>
                                        <option value="Perabot">Perabot</option>
                                        <option value="Kenderaan">Kenderaan</option>
                                        <option value="other">Other (Please Specify)</option>
                                    </select>
                                </div>
                                {errors.type && <div className="text-red-500 text-sm">{errors.type}</div>}

                                {/* Show the additional "Other" field if "Other" is selected */}
                                {formData.type === 'other' && (
                                    <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                        <FiLayers className="text-gray-500 ml-3" size={20} />
                                        <input
                                            type="text"
                                            id="otherType"
                                            name="otherType"
                                            value={formData.otherType}
                                            onChange={handleInputChange}
                                            className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border-0 focus:ring-0 rounded-lg"
                                            placeholder="Sila masukkan jenis peralatan lain"
                                        />
                                    </div>
                                )}

                                {/* Lokasi */}
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                    <FiMapPin className="text-gray-500 ml-3" size={20} />
                                    <select
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border-0 focus:ring-0 rounded-lg"
                                    >
                                        <option value="">Pilih Lokasi</option>
                                        {eqLocation.map((location) => (
                                            <option key={location.id} value={location.eqLocName}>
                                                {location.eqLocName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}

                                {/* Tarikh Diperolehi */}
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-blue-500">
                                    <FiCalendar className="text-gray-500 ml-3" size={20} />
                                    <input
                                        type="date"
                                        id="acquired_date"
                                        name="acquired_date"
                                        value={formData.acquired_date}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border-0 focus:ring-0 rounded-lg"
                                    />
                                </div>
                                {errors.acquired_date && <div className="text-red-500 text-sm">{errors.acquired_date}</div>}

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
                                {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}

                                {/* Buttons */}
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => Inertia.get('/listEquipment')}
                                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    >
                                        {isLoading ? 'Mengemaskini...' : 'Kemaskini'}
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
