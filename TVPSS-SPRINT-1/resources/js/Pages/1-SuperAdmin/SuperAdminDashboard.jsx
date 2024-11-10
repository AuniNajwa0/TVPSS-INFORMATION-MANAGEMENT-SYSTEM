import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FaUsers, FaUserShield, FaSchool } from 'react-icons/fa';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [timeRange, setTimeRange] = useState("Mingguan");
    const [date, setDate] = useState("2024-07-02");

    // Data for Bar Chart
    const barData = {
        labels: ['Admin State', 'Admin PPD', 'Admin Sekolah'],
        datasets: [
            {
                label: 'Bilangan Pengguna Mengikut Jenis',
                data: [48, 800, 4000], // Example data
                backgroundColor: ['#455185', '#008080', '#00BFFF'],
            },
        ],
    };

    // Options for Bar Chart
    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    // Data for Doughnut Chart
    const doughnutData = {
        labels: ['Admin State', 'Admin PPD', 'Admin Sekolah'],
        datasets: [
            {
                label: 'Bilangan Peratusan Pengguna Mengikut Jenis',
                data: [48, 800, 4000], // Example data
                backgroundColor: ['#455185', '#FF6384', '#FFA500'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Selamat Datang Pengguna
                    </h2>
                    <div className="flex items-center space-x-4">
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
        >
            <Head title="Dashboard" />

            {/* Summary Boxes */}
            <div className="py-3">
                <div className="grid grid-cols-3 gap-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <SummaryCard
                        title="Bilangan State Admin"
                        value="48"
                        icon={<FaUsers className="text-[#455185] text-5xl" />}
                    />
                    <SummaryCard
                        title="Bilangan PPD Admin"
                        value="800"
                        icon={<FaUserShield className="text-[#455185] text-5xl" />}
                    />
                    <SummaryCard
                        title="Bilangan Sekolah Admin"
                        value="4000"
                        icon={<FaSchool className="text-[#455185] text-5xl" />}
                    />
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-3">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-center text-lg font-semibold text-[#455185] mb-4">Bilangan Pengguna Mengikut Jenis</h3>
                    <Bar data={barData} options={barOptions} />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-center text-lg font-semibold text-[#455185] mb-4">Bilangan Peratusan Pengguna Mengikut Jenis</h3>
                    <Doughnut data={doughnutData} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function SummaryCard({ title, value, icon }) {
    return (
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md text-center space-x-4 min-w-[400px] max-w-[300px] min-h-[120px] max-h-[150px]">
            <div className="text-4xl">{icon}</div>
            <div className="text-left">
                <h3 className="text-lg font-semibold text-[#455185]">{title}</h3>
                <p className="text-2xl font-bold text-[#455185]">{value}</p>
            </div>
        </div>
    );
}
