import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SuperAdminSideBar from '../SuperAdminSideBar';
import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiUserCheck, FiLock, FiMapPin } from 'react-icons/fi';
import { Inertia } from '@inertiajs/inertia';

export default function UpdateUser({ user, roles }) {
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        state: user.state || '',
        district: user.district || '', // Added district field
        password: '',
        password_confirmation: '',
    });

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // List of Malaysian states
    const states = [
        'Johor', 'Melaka', 'Pahang', 'Wilayah Persekutuan Kuala Lumpur', 'Selangor', 
        'Negeri Sembilan', 'Perak', 'Kedah', 'Pulau Pinang', 'Perlis', 'Kelantan', 
        'Terengganu', 'Sabah', 'Sarawak'
    ];

    const districts = {
        Johor: ['Johor Bahru', 'Muar', 'Kluang', 'Segamat','Mersing','Kota Tinggi','Batu Pahat','Pontian','Pasir Gudang','Tangkak','Kulaijaya'],
        Pahang: ['Kuantan', 'Temerloh', 'Bera', 'Pekan', 'Rompin', 'Maran', 'Jerantut', 'Bentong'],
        'Wilayah Persekutuan Kuala Lumpur': ['Kuala Lumpur'],
        Selangor: ['Petaling', 'Hulu Langat', 'Sepang', 'Klang', 'Gombak', 'Kuala Selangor', 'Sabak Bernam', 'Selayang'],
        'Negeri Sembilan': ['Seremban', 'Port Dickson', 'Rembau', 'Jelebu', 'Tampin', 'Gemenceh'],
        Perak: ['Ipoh', 'Kuala Kangsar', 'Taiping', 'Teluk Intan', 'Sitiawan', 'Parit Buntar', 'Tanjung Malim', 'Kampar'],
        Kedah: ['Alor Setar', 'Sungai Petani', 'Kuala Kedah', 'Kulim', 'Baling', 'Langkawi', 'Pokok Sena', 'Kubang Pasu'],
        'Pulau Pinang': ['Georgetown', 'Bukit Mertajam', 'Nibong Tebal', 'Balik Pulau'],
        Perlis: ['Kangar', 'Arau'],
        Kelantan: ['Kota Bharu', 'Tumpat', 'Pasir Mas', 'Machang', 'Tanah Merah', 'Gua Musang', 'Kuala Krai'],
        Terengganu: ['Kuala Terengganu', 'Dungun', 'Kemaman', 'Besut', 'Hulu Terengganu', 'Marang'],
        Sabah: ['Kota Kinabalu', 'Sandakan', 'Tawau', 'Keningau', 'Beaufort', 'Lahad Datu', 'Semporna', 'Ranau', 'Papar'],
        Sarawak: ['Kuching', 'Sibu', 'Miri', 'Bintulu', 'Sri Aman', 'Mukah', 'Betong', 'Limbang'],
    };

    // Handler to update form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        const newErrors = {};
        if (!formData.name) newErrors.name = 'Nama diperlukan!';
        if (!formData.email) newErrors.email = 'Email diperlukan!';
        if (!formData.password && formData.password_confirmation) {
            newErrors.password = 'Katalaluan diperlukan!';
        }
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Katalaluan tidak sepadan!';
        }
        if (!formData.role) newErrors.role = 'Peranan diperlukan!';
        if (!formData.state) newErrors.state = 'Negeri diperlukan!';
        if (!formData.district) newErrors.district = 'Daerah diperlukan!'; // Added district validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Sila masukkan alamat emel yang sah.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            Inertia.put(`/users/${user.id}`, formData);
            setMessage('Pengguna berjaya dikemaskini!');
        } catch (error) {
            setMessage('Ralat berlaku, sila cuba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            state: user.state,
            district: user.district,  // Reset district
            password: '',
            password_confirmation: '',
        });
        setMessage('');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kemas Kini Pengguna
                </h2>
            }
        >
            <Head title="Kemas Kini Pengguna" />
            <div className="flex">
                <div className="w-1/6 p-8 text-white min-h-screen">
                    <SuperAdminSideBar />
                </div>

                <div className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-md border border-gray-200">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            Kemas Kini Pengguna
                        </h3>

                        {/* Feedback message */}
                        {message && (
                            <div className={`text-${message.includes('berjaya') ? 'green' : 'red'}-500 mb-4`}>
                                {message}
                            </div>
                        )}

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
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

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
                                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

                                {/* Password Field */}
                                <div className="flex items-center border border-[#455185] rounded-lg">
                                    <FiLock className="text-[#455185] ml-4" size={20} />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-4 py-2 border-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                                        placeholder="Masukkan Kata Laluan (Jika mahu)"
                                    />
                                </div>
                                {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

                                {/* Password Confirmation Field */}
                                <div className="flex items-center border border-[#455185] rounded-lg">
                                    <FiLock className="text-[#455185] ml-4" size={20} />
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-4 py-2 border-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                                        placeholder="Sahkan Katalaluan"
                                    />
                                </div>
                                {errors.password_confirmation && <div className="text-red-500 text-sm">{errors.password_confirmation}</div>}

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
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}

                                {/* State Dropdown */}
                                <div className="flex items-center border border-[#455185] rounded-lg">
                                    <select
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-4 py-2 border-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                                    >
                                        <option value="">Pilih Negeri</option>
                                        <option value="Johor">Johor</option>
                                        <option value="Melaka">Melaka</option>
                                        <option value="Pahang">Pahang</option>
                                        <option value="Wilayah Persekutuan Kuala Lumpur">Wilayah Persekutuan Kuala Lumpur</option>
                                        <option value="Selangor">Selangor</option>
                                        <option value="Negeri Sembilan">Negeri Sembilan</option>
                                        <option value="Perak">Perak</option>
                                        <option value="Kedah">Kedah</option>
                                        <option value="Pulau Pinang">Pulau Pinang</option>
                                        <option value="Perlis">Perlis</option>
                                        <option value="Kelantan">Kelantan</option>
                                        <option value="Terengganu">Terengganu</option>
                                        <option value="Sabah">Sabah</option>
                                        <option value="Sarawak">Sarawak</option>
                                    </select>
                                </div>
                                {errors.state && <div className="text-red-500 text-sm">{errors.state}</div>}

                                {/* District Dropdown */}
                                <div className="flex items-center border border-[#455185] rounded-lg">
                                    <FiMapPin className="text-[#455185] ml-4" size={20} />
                                    <select
                                        id="district"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-4 py-2 border-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                                    >
                                        <option value="">Pilih Daerah</option>
                                        {formData.state && districts[formData.state] && districts[formData.state].map((district, index) => (
                                            <option key={index} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.district && <div className="text-red-500 text-sm">{errors.district}</div>}

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
