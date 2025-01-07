import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Building2, CreditCard, Mail, MapPin, Phone, School2, User, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function DonationForm() {
    const states = [
        "Johor",
        "Melaka",
        "Pahang",
        "Wilayah Persekutuan Kuala Lumpur",
        "Selangor",
        "Negeri Sembilan",
        "Perak",
        "Kedah",
        "Pulau Pinang",
        "Perlis",
        "Kelantan",
        "Terengganu",
        "Sabah",
        "Sarawak",
    ];

    const districts = {
        Johor: [
            "Johor Bahru", 
            "Muar", 
            "Kluang", 
            "Segamat", 
            "Mersing", 
            "Kota Tinggi", 
            "Batu Pahat", 
            "Pontian", 
            "Pasir Gudang", 
            "Tangkak", 
            "Kulaijaya"
        ],
        Pahang: [
            "Kuantan", 
            "Temerloh", 
            "Bera", 
            "Pekan", 
            "Rompin", 
            "Maran", 
            "Jerantut", 
            "Bentong"
        ],
        "Wilayah Persekutuan Kuala Lumpur": ["Kuala Lumpur"],
        Selangor: [
            "Petaling", 
            "Hulu Langat", 
            "Sepang", 
            "Klang", 
            "Gombak", 
            "Kuala Selangor", 
            "Sabak Bernam", 
            "Selayang"
        ],
        "Negeri Sembilan": [
            "Seremban", 
            "Port Dickson", 
            "Rembau", 
            "Jelebu", 
            "Tampin", 
            "Gemenceh"
        ],
        Perak: [
            "Ipoh", 
            "Kuala Kangsar", 
            "Taiping", 
            "Teluk Intan", 
            "Sitiawan", 
            "Parit Buntar", 
            "Tanjung Malim", 
            "Kampar"
        ],
        Kedah: [
            "Alor Setar", 
            "Sungai Petani", 
            "Kuala Kedah", 
            "Kulim", 
            "Baling", 
            "Langkawi", 
            "Pokok Sena", 
            "Kubang Pasu"
        ],
        "Pulau Pinang": [
            "Georgetown", 
            "Bukit Mertajam", 
            "Nibong Tebal", 
            "Balik Pulau"
        ],
        Perlis: [
            "Kangar", 
            "Arau"
        ],
        Kelantan: [
            "Kota Bharu", 
            "Tumpat", 
            "Pasir Mas", 
            "Machang", 
            "Tanah Merah", 
            "Gua Musang",
             "Kuala Krai"
            ],
        Terengganu: [
            "Kuala Terengganu", 
            "Dungun", 
            "Kemaman", 
            "Besut", 
            "Hulu Terengganu", 
            "Marang"
        ],
        Sabah: [
            "Kota Kinabalu", 
            "Sandakan", 
            "Tawau", 
            "Keningau", 
            "Beaufort", 
            "Lahad Datu", 
            "Semporna", 
            "Ranau", 
            "Papar"
        ],
        Sarawak: [
            "Kuching", 
            "Sibu", 
            "Miri", 
            "Bintulu", 
            "Sri Aman", 
            "Mukah", 
            "Betong", 
            "Limbang"
        ],
    };

    const [schools, setSchools] = useState([]);

    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [availableSchools, setAvailableSchools] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        ic_num: "",
        email: "",
        phone: "",
        state: "",
        district: "",
        schoolName: "",
        amaun: "",
        paymentMethod: "Online Banking",
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // Reset district and school when state changes
        if (name === "state") {
            setSelectedState(value);
            setAvailableDistricts(districts[value] || []);
            setFormData((prevData) => ({
                ...prevData,
                state: value,
                district: "", // Reset district selection when state changes
                schoolName: "", // Reset school selection when state changes
            }));
        } else if (name === "district") {
            setSelectedDistrict(value);
            setFormData((prevData) => ({
                ...prevData,
                district: value,
                schoolName: "", // Reset school selection when district changes
            }));
            // Fetch schools based on selected negeri and daerah
            fetchSchools(value);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setAvailableDistricts(districts[state] || []);
        setSelectedDistrict(""); // Reset district selection
        setAvailableSchools([]); // Reset school selection
    };

    const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    fetchSchools(formData.state, district); // Pass both state and district
};
    

    const fetchSchools = async (state, district) => {
        if (!state || !district) {
            setError("Please select both state and district.");
            return;
        }
    
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.get(`/schools?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}`);
            setAvailableSchools(response.data); // Expecting an array of school names
        } catch (err) {
            setError("Error fetching schools: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        alert("Form submitted successfully!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col">
            <Head title="TVPSS | Sumbangan" />
            {/* Enhanced Header */}
            <header className="bg-bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <img src="/assets/KPM_Logo.png" alt="KPM Logo" className="h-16 w-auto" />
                        <div className="h-8 w-px bg-gray-200" />
                        <img src="/assets/TVPSSLogo3.jpg" alt="TVPSS Logo" className="h-16 w-auto" />
                    </div>
                    <Link 
                        href="/studentsPage" 
                        className="group flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                        Kembali
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Form Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-blue-900 mb-3">Form Sumbangan</h1>
                        <p className="text-gray-600">Sila lengkapkan maklumat di bawah untuk membuat sumbangan</p>
                    </div>

                    {/* Main Form */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-8">
                            {/* Progress Steps */}
                            <div className="flex justify-between mb-12 px-8">
                                {['Maklumat Peribadi', 'Lokasi', 'Pembayaran'].map((step, index) => (
                                    <div key={step} className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                            {index + 1}
                                        </div>
                                        <span className="text-sm mt-2">{step}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Personal Information */}
                            <div className="space-y-8">
                                <div className="border-b pb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-blue-600" />
                                        Maklumat Peribadi
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Nama Penuh</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Masukkan nama penuh"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                    required
                                                />
                                                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">No. Kad Pengenalan</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="ic_num"
                                                    placeholder="000000-00-0000"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                    required
                                                />
                                                <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Email</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="email@contoh.com"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                    required
                                                />
                                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">No. Telefon</label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="0123456789"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                    required
                                                />
                                                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Information */}
                                <div className="border-b pb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                                        Lokasi
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Negeri</label>
                                            <div className="relative">
                                                <select
                                                    name="state" onChange={handleStateChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-300"
                                                    required
                                                >
                                                    <option value="">Pilih Negeri</option>
                                                    {states.map(state => (
                                                        <option key={state} value={state}>{state}</option>
                                                    ))}
                                                </select>
                                                <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Daerah</label>
                                            <div className="relative">
                                                <select
                                                    name="district"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-300"
                                                    required
                                                >
                                                    <option value="">Pilih Daerah</option>
                                                        {availableDistricts.map(district => (
                                                            <option key={district} value={district}>{district}</option>
                                                        ))}
                                                </select>
                                                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-gray-700">Sekolah</label>
                                            <div className="relative">
                                            <select
                                                name="schoolName"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-300"
                                                required
                                            >
                                                <option value="">Pilih Sekolah</option>
    {availableSchools.map(school => ( // Use availableSchools here
        <option key={school} value={school}>{school}</option>
                ))}
                                            </select>
                                            
                                                <School2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Section */}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                        <Wallet className="w-5 h-5 mr-2 text-blue-600" />
                                        Kaedah Pembayaran
                                    </h2>
                                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Amaun (RM)</label>
                <div className="relative">
                    <input
                        type="number"
                        name="amaun"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                        value={formData.amaun}
                        onChange={handleInputChange}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">RM</span>
                </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <span className="font-medium">Online Banking</span>
                </div>
                <span className="text-sm text-gray-500">Kaedah Pembayaran Tunggal</span>
            </div>
        </div>
    </div>
                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-900 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <span className="font-medium">Teruskan Pembayaran</span>
                                    <ArrowLeft className="w-5 h-5 rotate-180" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Enhanced Footer */}
            <footer className="bg-blue-900 text-white py-6">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm text-blue-200">
                        © 2024 TV Pusat Sumber Sekolah. Hak Cipta Terpelihara.
                    </p>
                </div>
            </footer>
        </div>
    );
}