import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FaUsers, FaUserShield, FaSchool, FaCheckCircle, FaTimesCircle, FaTruckLoading, FaClock } from 'react-icons/fa';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import PPDAdminSideBar from './PPDAdminSideBar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement);

export default function Dashboard() {
    const [timeRange, setTimeRange] = useState("Mingguan");
    const [date, setDate] = useState("2024-07-02");
    const [selectedRegion, setSelectedRegion] = useState("Semua Negeri");

    const barData = {
        labels: ['Versi 1', 'Versi 2', 'Versi 3'],
        datasets: [
            {
                label: 'Bilangan Pengguna Mengikut Jenis',
                data: [48, 800, 4000],
                backgroundColor: ['#455185', '#008080', '#00BFFF'],
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

   

    const doughnutData = {
        labels: ['Versi 1', 'Versi 2', 'Versi 3'],
        datasets: [
            {
                label: 'Pengguna dalam Tempoh 30 Minit Terakhir',
                data: [20, 300, 800],
                backgroundColor: ['#455185', '#008080', '#00BFFF'],
                hoverOffset: 4,
            },
        ],
    };

    // Define lineData and lineOptions for the Line chart
    const lineData = {
        labels: ['1 Jun', '2 Jun', '3 Jun', '4 Jun', '5 Jun', '6 Jun', '7 Jun'],
        datasets: [
            {
                label: 'Admin State Login',
                data: [1500, 300, 500, 3000, 800, 500, 700],
                borderColor: '#4B0082',
                backgroundColor: '#4B0082',
                fill: false,
                tension: 0.1,
            },
            {
                label: 'Admin School Login',
                data: [800, 500, 3500, 700, 2500, 800, 600],
                borderColor: '#00BFFF',
                backgroundColor: '#00BFFF',
                fill: false,
                tension: 0.1,
            },
            {
                label: 'Admin PPD Login',
                data: [500, 700, 2000, 400, 1000, 700, 500],
                borderColor: '#20B2AA',
                backgroundColor: '#20B2AA',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 3500,
            },
        },
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Selamat Datang Pengguna
                    </h2>
                    <div className="flex items-right space-x-4">
                        <select
                            className="border rounded p-2 text-gray-700 min-w-[120px]"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="Harian">Harian</option>
                            <option value="Mingguan">Mingguan</option>
                            <option value="Bulanan">Bulanan</option>
                        </select>
                        <input
                            type="date"
                            className="border rounded p-2"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button className="bg-[#455185] hover:bg-[#3C4565] text-white p-2 rounded min-w-[100px]">Export</button>
                    </div>
                </div>
            }
            noMaxWidth={true}
        >
            <Head title="Dashboard" />

            <div className="flex">
                <div className="w-1/6 p-4 text-white min-h-screen">
                    <PPDAdminSideBar />
                </div>

                <div className="w-5/6 p-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <SummaryCard title="Bilangan TVPPS Sekolah Disahkan" value="20" icon={<FaCheckCircle className="text-[#455185] text-5xl" />} />
                        <SummaryCard title="Bilangan Pending Validasi" value="5" icon={<FaClock className="text-[#455185] text-5xl" />} />
                        <SummaryCard title="Bilangan Sekolah Di Daerah Anda" value="15" icon={<FaSchool className="text-[#455185] text-5xl" />} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-8 shadow-md col-span-1 md:col-span-2">
                            <h3 className="text-center text-lg font-semibold text-[#455185] mb-4">Bilangan Pengguna Mengikut Jenis</h3>
                            <StatusHeader />
                            <Bar data={barData} options={barOptions} />
                        </div>
                        
                        <div className="bg-white p-8 shadow-md">
                            <h3 className="text-center text-lg font-semibold text-[#455185] mb-4">Jumlah Peratusan Mengikut Versi</h3>
                            <select
                                className="border rounded p-2 text-gray-700 mb-4 w-full"
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                            >
                                <option value="Semua Negeri">Semua Negeri</option>
                                <option value="Johor">Johor</option>
                                <option value="Kedah">Kedah</option>
                                <option value="Kelantan">Kelantan</option>
                                <option value="Melaka (Malacca)">Melaka (Malacca)</option>
                                <option value="Negeri Sembilan">Negeri Sembilan</option>
                                <option value="Pahang">Pahang</option>
                                <option value="Perak">Perak</option>
                                <option value="Perlis">Perlis</option>
                                <option value="Pulau Pinang (Penang)">Pulau Pinang (Penang)</option>
                                <option value="Sabah">Sabah</option>
                                <option value="Sarawak">Sarawak</option>
                                <option value="Selangor">Selangor</option>
                                <option value="Terengganu">Terengganu</option>
                            </select>
                            <Doughnut data={doughnutData} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center py-4 text-gray-600">
                © 2024 Kementerian Pendidikan Malaysia (KPM)
            </footer>
        </AuthenticatedLayout>
    );
}

function StatusHeader() {
    return (
        <div className="flex justify-around text-center mb-4">
            <div>
                <h4 className="text-[#455185] font-semibold">Bilangan Versi</h4>
                <p className="text-[#455185] text-2xl font-bold">3</p>
            </div>
            <div>
                <h4 className="text-[#455185] font-semibold">Bilangan Telah Disahkan</h4>
                <p className="text-[#455185] text-2xl font-bold">4</p>
            </div>
            <div>
                <h4 className="text-[#455185] font-semibold">Purata Purata Telah Disahkan</h4>
                <p className="text-[#455185] text-2xl font-bold">25</p>
            </div>
        </div>
    );
}

function SummaryCard({ title, value, icon }) {
    return (
        <div className="bg-white p-8 shadow-md flex items-center space-x-4">
            {icon}
            <div>
                <h3 className="text-lg font-semibold text-[#455185]">{title}</h3>
                <p className="text-2xl font-bold text-[#455185]">{value}</p>
            </div>
        </div>
    );
}
