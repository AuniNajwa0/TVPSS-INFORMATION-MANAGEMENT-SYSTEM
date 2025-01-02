import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { FaUsers, FaStar, FaUserFriends, FaSortNumericUp } from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import SchoolAdminSideBar from "./SchoolAdminSideBar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("Mingguan");
  const [date, setDate] = useState("2024-07-02");
  const [tvpssVersion, setTvpssVersion] = useState("Memuatkan...");

  useEffect(() => {
    fetch("/get-tvpss-version")
      .then((response) => response.json())
      .then((data) => {
        setTvpssVersion(data.version ?? "Tiada");
      })
      .catch((error) => {
        console.error("Error fetching TVPSS version:", error);
        setTvpssVersion("Error");
      });
  }, []);

  const barData = {
    labels: ["Januari", "Februari", "Mac", "April", "May", "Jun"],
    datasets: [
      {
        label: "Bilangan Pengguna Mengikut Jenis",
        data: [458, 800, 4000, 700, 543, 3000],
        backgroundColor: ["#455185", "#008080", "#00BFFF"],
        borderColor: ["#455185", "#008080", "#00BFFF"],
        borderWidth: 1,
        borderRadius: 20,
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
    labels: ["Lelaki", "Perempuan"],
    datasets: [
      {
        label: "Pengguna dalam Tempoh 30 Minit Terakhir",
        data: [200, 300],
        backgroundColor: ["#455185", "#008080"],
        borderColor: ["#455185", "#008080"],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <AuthenticatedLayout>
      <Head title="TVPSS | Dashboard" />
      <div className="flex flex-col md:flex-row min-h-screen bg-white">
        <div className="w-1/6 bg-white shadow-lg">
          <SchoolAdminSideBar />
        </div>

        <div className="w-full md:ml-[120px] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl font-bold text-gray-900 bg-clip-text">Dashboard</h2>

            <div className="flex items-center space-x-4">
              {/* Custom Styled Toggle Button Group */}
              <div className="flex items-center space-x-4">
                <button
                  className={`px-6 py-2 rounded-lg font-medium text-sm ${timeRange === 'Harian' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} transition-all duration-300 hover:bg-blue-600 hover:text-white focus:outline-none`}
                  onClick={() => setTimeRange('Harian')}
                >
                  Harian
                </button>
                <button
                  className={`px-6 py-2 rounded-lg font-medium text-sm ${timeRange === 'Mingguan' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} transition-all duration-300 hover:bg-blue-600 hover:text-white focus:outline-none`}
                  onClick={() => setTimeRange('Mingguan')}
                >
                  Mingguan
                </button>
                <button
                  className={`px-6 py-2 rounded-lg font-medium text-sm ${timeRange === 'Bulanan' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} transition-all duration-300 hover:bg-blue-600 hover:text-white focus:outline-none`}
                  onClick={() => setTimeRange('Bulanan')}
                >
                  Bulanan
                </button>
              </div>

              <input
                type="date"
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button className="bg-[#4158A6] text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#3C4565] transform hover:scale-105 transition duration-300">
                Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <SummaryCard title="Bilangan Pelajar Sekolah" value="20" icon={<FaUsers />} bgColor="#f6ebcb" iconColor="#9d8338" />
            <SummaryCard title="Bilangan Pencapaian" value="5" icon={<FaStar />} bgColor="#cbf6d1" iconColor="#287033" />
            <SummaryCard title="Bilangan Krew Pelajar" value="15" icon={<FaUserFriends />} bgColor="#bbd1ef" iconColor="#0f3365" />
            <SummaryCard title="Versi TVPSS Terkini" value={tvpssVersion} icon={<FaSortNumericUp />} bgColor="#e6e6fa" iconColor="#6a0dad" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border-2 border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Bilangan Krew Mengikut Bulanan</h3>
              <Bar data={barData} options={barOptions} />
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Jumlah Peratusan Mengikut Versi</h3>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-4 border-t bg-white text-gray-600">
        © 2024 Kementerian Pendidikan Malaysia (KPM)
      </footer>
    </AuthenticatedLayout>
  );
}

function SummaryCard({ title, value, icon, bgColor, iconColor }) {
  return (
    <div className="bg-white p-5 rounded-2xl border-2 border-gray-150 flex items-center gap-4 hover:scale-105 transform transition duration-300 ease-in-out">
      <div
        className="rounded-full p-4 flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <div style={{ color: iconColor, fontSize: "40px" }}>{icon}</div>
      </div>
      <div className="text-black">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}
