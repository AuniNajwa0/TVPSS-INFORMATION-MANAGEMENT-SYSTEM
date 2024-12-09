import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FaUsers, FaUserShield, FaSchool } from 'react-icons/fa';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import SuperAdminSideBar from './SuperAdminSideBar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement);

const fetch30MinuteUserCounts = async () => {
    try {
        const response = await fetch('/user-role-counts/30-minutes');
        const data = await response.json();
        return {
            stateAdmin30Minutes: data.state_admin_30_minutes,
            ppdAdmin30Minutes: data.ppd_admin_30_minutes,
            schoolAdmin30Minutes: data.school_admin_30_minutes,
        };
    } catch (error) {
        console.error('Error fetching 30-minute user counts:', error);
        return { stateAdmin30Minutes: 0, ppdAdmin30Minutes: 0, schoolAdmin30Minutes: 0 };
    }
};

export default function Dashboard() {
    const [timeRange, setTimeRange] = useState("Mingguan");
    const [date, setDate] = useState("2024-07-02");
    const [selectedRegion, setSelectedRegion] = useState("Semua Negeri");

    // New state to store user role counts
    const [userCounts, setUserCounts] = useState({
        stateAdmin: 0,
        ppdAdmin: 0,
        schoolAdmin: 0,
    });

    // New state for 30-minute user count
    const [doughnutData30Minutes, setDoughnutData30Minutes] = useState({
        labels: ['Admin State', 'Admin PPD', 'Admin Sekolah'],
        datasets: [{
            data: [10, 0, 0], // Default dummy data
            backgroundColor: ['#455185', '#008080', '#00BFFF'],
        }],
    });

    // Fetch data on component mount
    useEffect(() => {
        async function fetchUserCounts() {
            try {
                // Fetch the user role counts (state, ppd, and school admins)
                const response = await fetch('/user-role-counts');
                const data = await response.json();
                setUserCounts({
                    stateAdmin: data.state_admin,
                    ppdAdmin: data.ppd_admin,
                    schoolAdmin: data.school_admin,
                });
            } catch (error) {
                console.error('Error fetching user role counts:', error);
            }
        }

        async function fetch30MinuteUserCounts() {
            try {
                // Fetch the 30-minute active user counts
                const response = await fetch('/user-role-counts/30-minutes');
                const data = await response.json();
                setDoughnutData30Minutes({
                    labels: ['Admin State', 'Admin PPD', 'Admin Sekolah'],
                    datasets: [{
                        data: [data.state_admin_30_minutes, data.ppd_admin_30_minutes, data.school_admin_30_minutes],
                        backgroundColor: ['#455185', '#008080', '#00BFFF'],
                    }],
                });
            } catch (error) {
                console.error('Error fetching 30-minute user counts:', error);
            }
        }

        // Fetch the counts
        fetchUserCounts();
        fetch30MinuteUserCounts();
    }, []); // Empty dependency array to run once when the component mounts

    // Bar Chart data with dynamic user counts
    const barData = {
        labels: ['Admin State', 'Admin PPD', 'Admin Sekolah'],
        datasets: [
            {
                label: 'Bilangan Pengguna Mengikut Jenis',
                data: [userCounts.stateAdmin, userCounts.ppdAdmin, userCounts.schoolAdmin], // Use dynamic data
                backgroundColor: ['#455185', '#008080', '#00BFFF'],
            },
        ],
    };

    // Doughnut Chart data with dynamic user counts
    const doughnutData = {
        labels: ['Admin State', 'Admin PPD', 'Admin Sekolah'],
        datasets: [
            {
                label: 'Bilangan Peratusan Pengguna Mengikut Jenis',
                data: [userCounts.stateAdmin, userCounts.ppdAdmin, userCounts.schoolAdmin], // Use dynamic data
                backgroundColor: ['#455185', '#FF6384', '#FFA500'],
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
                    <SuperAdminSideBar />
                </div>

                <div className="w-5/6 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
                        <SummaryCard title="Bilangan State Admin" value={userCounts.stateAdmin} icon={<FaUsers className="text-[#455185] text-5xl" />} />
                        <SummaryCard title="Bilangan PPD Admin" value={userCounts.ppdAdmin} icon={<FaUserShield className="text-[#455185] text-5xl" />} />
                        <SummaryCard title="Bilangan Sekolah Admin" value={userCounts.schoolAdmin} icon={<FaSchool className="text-[#455185] text-5xl" />} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Bar Chart */}
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out col-span-1 md:col-span-2 flex flex-col justify-center items-center">
                            <h3 className="text-center text-lg font-semibold text-[#455185] mb-6">Bilangan Pengguna Mengikut Jenis</h3>
                            <div className="flex justify-center items-center w-full h-[300px]">
                                <Bar data={barData} />
                            </div>
                        </div>

                        {/* Doughnut Chart */}
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col justify-center items-center">
                            <h3 className="text-center text-lg font-semibold text-[#455185] mb-6">Bilangan Peratusan Pengguna Mengikut Jenis</h3>
                            <div className="flex justify-center items-center w-full h-[300px]">
                                <Doughnut data={doughnutData} />
                            </div>
                        </div>

                        {/* Line Chart 
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out col-span-1 md:col-span-2 flex flex-col justify-center items-center">
                            <StatusHeader />
                            <div className="flex justify-center items-center w-full h-[300px]">
                                <Line data={lineData} options={lineOptions} />
                            </div>
                        </div>

                        {/* Doughnut Chart (30 Minutes) 
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col justify-center items-center">
                            <h3 className="text-center text-lg font-semibold text-[#455185] mb-6">Pengguna Dalam Tempoh 30 Minit Terakhir</h3>
                            <div className="flex justify-center items-center w-full h-[300px]">
                                <Doughnut data={doughnutData30Minutes} />
                            </div>
                        </div>*/}
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

/*function StatusHeader() {
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
}*/

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
