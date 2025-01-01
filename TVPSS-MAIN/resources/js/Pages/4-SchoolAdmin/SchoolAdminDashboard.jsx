import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FaUsers, FaStar, FaUserFriends, FaSortNumericUp } from 'react-icons/fa';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import SchoolAdminSideBar from './SchoolAdminSideBar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [timeRange, setTimeRange] = useState("Mingguan");
    const [date, setDate] = useState("2024-07-02");
    const [tvpssVersion, setTvpssVersion] = useState("Memuatkan...");

    useEffect(() => {
        fetch('/get-tvpss-version')
            .then((response) => response.json())
            .then((data) => {
                setTvpssVersion(data.version ?? "Tiada");
            })
            .catch((error) => {
                console.error('Error fetching TVPSS version:', error);
                setTvpssVersion("Error");
            });
    }, []);

    const barData = {
        labels: ['Januari', 'Februari', 'Mac', 'April', 'May', 'Jun'],
        datasets: [
            {
                label: 'Bilangan Pengguna Mengikut Jenis',
                data: [458, 800, 4000, 700, 543, 3000],
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
        labels: ['Lelaki', 'Perempuan'],
        datasets: [
            {
                label: 'Pengguna dalam Tempoh 30 Minit Terakhir',
                data: [200, 300],
                backgroundColor: ['#455185', '#008080'],
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
            <Head title="TVPSS | Dashboard" />

            <div className="flex">
                <div className="w-1/6 p-4 text-white min-h-screen">
                    <SchoolAdminSideBar />
                </div>

                <div className="w-5/6 p-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <SummaryCard title="Bilangan Pelajar Sekolah" value="20" icon={<FaUsers className="text-[#455185] text-5xl" />} />
                        <SummaryCard title="Bilangan Pencapaian" value="5" icon={<FaStar className="text-[#455185] text-5xl" />} />
                        <SummaryCard title="Bilangan Krew Pelajar" value="15" icon={<FaUserFriends className="text-[#455185] text-5xl" />} />
                        <SummaryCard title="Versi TVPSS Terkini" value={tvpssVersion} icon={<FaSortNumericUp className="text-[#455185] text-5xl" />} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-8 shadow-md col-span-1 md:col-span-2">
                            <h3 className="text-center text-lg font-semibold text-[#455185] mb-4">Bilangan Krew Mengikut Bulanan</h3>
                            <Bar data={barData} options={barOptions} />
                        </div>

                        <div className="bg-white p-8 shadow-md">
                            <h3 className="text-center text-lg font-semibold text-[#455185] mb-4">Jumlah Peratusan Mengikut Versi</h3>
                            <Doughnut data={doughnutData} />
                        </div>
                    </div>
                </div>
            </div>

            <footer className="text-center py-4 text-gray-600">
                © 2024 Kementerian Pendidikan Malaysia (KPM)
            </footer>
        </AuthenticatedLayout>
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
