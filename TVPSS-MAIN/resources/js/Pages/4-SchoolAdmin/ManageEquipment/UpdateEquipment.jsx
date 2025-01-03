import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FiClipboard, FiLayers, FiMapPin, FiCalendar, FiSettings, FiAlertCircle, FiUpload } from 'react-icons/fi';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { Inertia } from '@inertiajs/inertia';
import { formatDistanceToNow } from 'date-fns';

export default function UpdateEquipment({ equipment, eqLocation, followUps }) {
    const [formData, setFormData] = useState({
        equipName: equipment?.equipName ?? '',
        equipType: equipment?.equipType ?? '',
        otherType: equipment?.equipType === 'other' ? equipment?.otherType ?? '' : '',
        location: equipment?.location ?? '',
        acquired_date: equipment?.acquired_date ?? '',
        status: equipment?.status ?? '',
        followUpUpdateSchool: '',
        uploadBrEq: [],
    });

    const [statusOptions, setStatusOptions] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 2);
        setFormData((prevData) => ({
            ...prevData,
            uploadBrEq: files,
        }));

        const previews = files.map((file) => URL.createObjectURL(file));
        setFilePreviews(previews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'uploadBrEq') {
                value.forEach((file) => formDataToSubmit.append(key + '[]', file));
            } else {
                formDataToSubmit.append(key, value);
            }
        });

        Inertia.put(`/equipment/${equipment.id}`, formDataToSubmit, {
            onSuccess: () => {
                setMessage('Kemaskini berjaya!');
                setIsLoading(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setIsLoading(false);
            },
        });
    };

    const InputField = ({ icon: Icon, ...props }) => (
        <div className="relative group">
            <div className="flex items-center border-2 border-gray-200 rounded-xl transition-all duration-300 group-hover:border-blue-400">
                <Icon className="text-gray-400 ml-4 group-hover:text-blue-500 transition-colors duration-300" size={20} />
                <input
                    {...props}
                    className="block w-full px-4 py-3 text-gray-700 placeholder-gray-400 bg-white border-0 focus:ring-0 rounded-xl focus:outline-none"
                />
            </div>
            {errors[props.name] && <p className="text-red-500 text-sm mt-1">{errors[props.name]}</p>}
        </div>
    );

    const SelectField = ({ icon: Icon, children, ...props }) => (
        <div className="relative group">
            <div className="flex items-center border-2 border-gray-200 rounded-xl transition-all duration-300 group-hover:border-blue-400">
                <Icon className="text-gray-400 ml-4 group-hover:text-blue-500 transition-colors duration-300" size={20} />
                <select
                    {...props}
                    className="block w-full px-4 py-3 text-gray-700 bg-white border-0 focus:ring-0 rounded-xl focus:outline-none appearance-none"
                >
                    {children}
                </select>
            </div>
            {errors[props.name] && <p className="text-red-500 text-sm mt-1">{errors[props.name]}</p>}
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800">Kemaskini Barang</h2>
            }
        >
            <Head title="Kemaskini Barang" />
            <div className="flex min-h-screen bg-gray-50">
                <div className="w-1/6 p-8 text-white">
                    <SchoolAdminSideBar />
                </div>

                <div className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
                        <div className="p-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-8">Kemaskini Barang</h3>

                            {message && (
                                <div className={`p-4 mb-6 rounded-lg ${message.includes('berjaya') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <InputField
                                    icon={FiClipboard}
                                    type="text"
                                    name="equipName"
                                    value={formData.equipName}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Nama Barang"
                                />

                                <SelectField
                                    icon={FiLayers}
                                    name="equipType"
                                    value={formData.equipType}
                                    onChange={handleInputChange}
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
                                </SelectField>

                                {formData.equipType === 'other' && (
                                    <InputField
                                        icon={FiLayers}
                                        type="text"
                                        name="otherType"
                                        value={formData.otherType}
                                        onChange={handleInputChange}
                                        placeholder="Sila masukkan jenis peralatan lain"
                                    />
                                )}

                                <SelectField
                                    icon={FiMapPin}
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Pilih Lokasi</option>
                                    {eqLocation.map((location) => (
                                        <option key={location.id} value={location.eqLocName}>
                                            {location.eqLocName}
                                        </option>
                                    ))}
                                </SelectField>

                                <InputField
                                    icon={FiCalendar}
                                    type="date"
                                    name="acquired_date"
                                    value={formData.acquired_date}
                                    onChange={handleInputChange}
                                />

                                <SelectField
                                    icon={FiSettings}
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Pilih Status</option>
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </SelectField>

                                {formData.status === 'Tidak Berfungsi' && (
                                    <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
                                        <InputField
                                            icon={FiAlertCircle}
                                            type="text"
                                            name="followUpUpdateSchool"
                                            value={formData.followUpUpdateSchool}
                                            onChange={handleInputChange}
                                            placeholder="Maklumat Kerosakan Barang"
                                        />

                                        <div className="space-y-4">
                                            <label className="block text-sm font-medium text-gray-700">Upload Images</label>
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:bg-gray-50">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <FiUpload className="w-8 h-8 mb-4 text-gray-500" />
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                {filePreviews.map((preview, index) => (
                                                    <img
                                                        key={index}
                                                        src={preview}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-32 object-cover rounded-lg shadow-md"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end space-x-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => Inertia.get('/listEquipment')}
                                        className="px-6 py-3 bg-gray-500 text-white rounded-xl shadow-md hover:bg-gray-600 transition-colors duration-300"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                                Mengemaskini...
                                            </span>
                                        ) : (
                                            'Kemaskini'
                                        )}
                                    </button>
                                </div>

                                {followUps.length > 0 && (
                                    <div className="mt-8 space-y-4">
                                        <h4 className="text-xl font-semibold text-gray-800">Mengikuti Kemaskini Peralatan</h4>
                                        <div className="space-y-4">
                                            {followUps.map((update, index) => (
                                                <div key={index} className="p-6 bg-gray-50 rounded-xl transition-all duration-300 hover:shadow-md">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-semibold text-gray-800">{update.user.name}</span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="text-gray-500 text-sm">
                                                            {formatDistanceToNow(new Date(update.created_at))} ago
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600">{update.content}</p>
                                                    {update.uploadBrEq && (
                                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                                            {JSON.parse(update.uploadBrEq).map((image, idx) => (
                                                                <img
                                                                    key={idx}
                                                                    src={`/storage/${image}`}
                                                                    alt={`Upload ${idx + 1}`}
                                                                    className="w-full h-32 object-cover rounded-lg shadow-sm"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}