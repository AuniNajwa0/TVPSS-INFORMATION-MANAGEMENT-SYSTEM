import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FaUsers, FaUserShield, FaSchool } from 'react-icons/fa';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import SuperAdminSideBar from './SuperAdminSideBar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement);

export default function Dashboard() {
    const [timeRange, setTimeRange] = useState("Mingguan");
    const [date, setDate] = useState("2024-07-02");
    const [selectedRegion, setSelectedRegion] = useState("Semua Negeri");

    const barData = {
        labels: ['Admin State', 'Admin PPD', 'Admin Sekolah'],
        datasets: [
            {
                label: 'Bilangan Pengguna Mengikut Jenis',
                data: [548, 800, 4000],
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
        labels: ['Admin State', 'Admin PPD', 'Admin Sekolah'],
        datasets: [
            {
                label: 'Bilangan Peratusan Pengguna Mengikut Jenis',
                data: [548, 800, 4000],
                backgroundColor: ['#455185', '#FF6384', '#FFA500'],
                hoverOffset: 4,
            },
        ],
    };

    const doughnutData30Minutes = {
        labels: ['Admin State', 'Admin PPD', 'Admin Sekolah'],
        datasets: [
            {
                label: 'Pengguna dalam Tempoh 30 Minit Terakhir',
                data: [20, 300, 800],
                backgroundColor: ['#455185', '#008080', '#00BFFF'],
                hoverOffset: 4,
            },
        ],
    };

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
                <div className="flex items-center w-full">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Selamat Datang Pengguna
                    </h2>
                    <div className="flex justify-end items-center space-x-4 ml-auto">
                        <select
                            className="border-2 border-[#455185] rounded-lg p-2 text-gray-700 bg-white hover:bg-[#f1f5f9] focus:ring-2 focus:ring-[#3C4565] focus:outline-none transition duration-300 ease-in-out shadow-md w-[150px]"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="Harian">Harian</option>
                            <option value="Mingguan">Mingguan</option>
                            <option value="Bulanan">Bulanan</option>
                        </select>
                        <input
                            type="date"
                            className="border-2 border-[#455185] rounded-lg shadow-md rounded p-2"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button className="bg-[#455185] hover:bg-[#3C4565] text-white p-2 rounded-lg min-w-[100px]">Export</button>
                    </div>
                </div>
            }
            noMaxWidth={true}
        >
            <Head title="Dashboard" />

            <div className="flex">
                <div className="w-1/6 p-4 text-white min-h-screen">
                <SuperAdminSideBar/>
                </div>

                <div className="w-5/6 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
                        <SummaryCard title="Bilangan State Admin" value="48" icon={<FaUsers className="text-[#455185] text-5xl" />} />
                        <SummaryCard title="Bilangan PPD Admin" value="800" icon={<FaUserShield className="text-[#455185] text-5xl" />} />
                        <SummaryCard title="Bilangan Sekolah Admin" value="4000" icon={<FaSchool className="text-[#455185] text-5xl" />} />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Bar Chart Container */}
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out col-span-1 md:col-span-2 flex flex-col justify-center items-center">
        <h3 className="text-center text-lg font-semibold text-[#455185] mb-6">Bilangan Pengguna Mengikut Jenis</h3>
        <div className="flex justify-center items-center w-full h-[300px]">
            <Bar data={barData} options={barOptions} />
        </div>
    </div>

    {/* Doughnut Chart Container */}
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col justify-center items-center">
        <h3 className="text-center text-lg font-semibold text-[#455185] mb-6">Bilangan Peratusan Pengguna Mengikut Jenis</h3>
        <div className="flex justify-center items-center w-full h-[300px]">
            <Doughnut 
                data={doughnutData} 
                options={{
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                                }
                            }
                        },
                        legend: {
                            labels: {
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: '#455185'
                            }
                        }
                    }
                }} 
            />
        </div>
    </div>

    {/* Line Chart Container */}
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out col-span-1 md:col-span-2 flex flex-col justify-center items-center">
        <StatusHeader />
        <div className="flex justify-center items-center w-full h-[300px]">
            <Line data={lineData} options={lineOptions} />
        </div>
    </div>

    {/* Doughnut Chart (30 Minutes) */}
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col justify-center items-center">
        <h3 className="text-center text-lg font-semibold text-[#455185] mb-6">Pengguna Dalam Tempoh 30 Minit Terakhir</h3>
        <select
            className="border-2 border-[#455185] rounded-lg p-3 text-gray-700 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-[#3C4565] transition duration-200"
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
        <div className="flex justify-center items-center w-full h-[300px]">
            <Doughnut 
                data={doughnutData30Minutes} 
                options={{
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                                }
                            }
                        },
                        legend: {
                            labels: {
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: '#455185'
                            }
                        }
                    }
                }} 
            />
        </div>
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
                <h4 className="text-[#455185] font-semibold p-4">Pengguna</h4>
                <p className="text-[#455185] text-2xl font-bold">1200</p>
            </div>
            <div>
                <h4 className="text-[#455185] font-semibold p-4">Purata Pengguna</h4>
                <p className="text-[#455185] text-2xl font-bold">400</p>
            </div>
            <div>
                <h4 className="text-[#455185] font-semibold p-4">Purata Aktif Pengguna (minit)</h4>
                <p className="text-[#455185] text-2xl font-bold">120</p>
            </div>
        </div>
    );
}

function SummaryCard({ title, value, icon }) {
    return (
        <div className="bg-gradient-to-r from-[#455185] to-[#008080] p-5 rounded-2xl shadow-lg flex items-center hover:scale-105 transform transition duration-300 ease-in-out">
    <div className="mr-4 p-3 bg-white rounded-full shadow-xl flex items-center justify-center">
        {icon}
    </div>
    <div className="text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
    </div>
</div>

    );
}
