import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import {
  FaUsers,
  FaUserShield,
  FaSchool,
  FaCheckCircle,
  FaTimesCircle,
  FaTruckLoading,
  FaClock,
} from "react-icons/fa";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import PPDAdminSideBar from "./PPDAdminSideBar";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export default function PPDAdminDashboard() {
  const [timeRange, setTimeRange] = useState("Mingguan");
  const [date, setDate] = useState("2024-07-02");
  const [selectedRegion, setSelectedRegion] = useState("Semua Negeri");

  const barData = {
    labels: ["Versi 1", "Versi 2", "Versi 3"],
    datasets: [
      {
        label: "Bilangan Pengguna Mengikut Jenis",
        data: [48, 800, 4000],
        backgroundColor: ["#455185", "#008080", "#00BFFF"],
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
    labels: ["Versi 1", "Versi 2", "Versi 3"],
    datasets: [
      {
        label: "Pengguna dalam Tempoh 30 Minit Terakhir",
        data: [20, 300, 800],
        backgroundColor: ["#455185", "#008080", "#00BFFF"],
        hoverOffset: 4,
      },
    ],
  };

  const lineData = {
    labels: ["1 Jun", "2 Jun", "3 Jun", "4 Jun", "5 Jun", "6 Jun", "7 Jun"],
    datasets: [
      {
        label: "Admin State Login",
        data: [1500, 300, 500, 3000, 800, 500, 700],
        borderColor: "#4B0082",
        backgroundColor: "#4B0082",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Admin School Login",
        data: [800, 500, 3500, 700, 2500, 800, 600],
        borderColor: "#00BFFF",
        backgroundColor: "#00BFFF",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Admin PPD Login",
        data: [500, 700, 2000, 400, 1000, 700, 500],
        borderColor: "#20B2AA",
        backgroundColor: "#20B2AA",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
    <AuthenticatedLayout>
      <Head title="TVPSS | Dashboard" />

      <div className="flex">
        <div className="w-1/6 bg-white shadow-lg min-h-screen">
          <PPDAdminSideBar />
        </div>

        <div className="w-5/6 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold text-gray-900 bg-clip-text hover:scale-105 transform transition duration-300 ease-in-out">
              Dashboard
            </h2>

            <Box component="form" className="flex items-center space-x-4">
              <FormControl sx={{ minWidth: 150, height: "40px" }}>
                <InputLabel id="time-range-label" sx={{ fontSize: "16px" }}>
                  Jenis
                </InputLabel>
                <Select
                  labelId="time-range-label"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  label="Jenis"
                  size="small"
                  sx={{
                    backgroundColor: "#ffffff",
                    height: "40px",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#455185" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#008080" },
                    "& .MuiInputBase-input": { fontSize: "14px", padding: "10px 14px" },
                  }}
                >
                  <MenuItem value="Harian">Harian</MenuItem>
                  <MenuItem value="Mingguan">Mingguan</MenuItem>
                  <MenuItem value="Bulanan">Bulanan</MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                label="Tarikh"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#ffffff",
                    height: "40px",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#455185" },
                    "&:hover fieldset": { borderColor: "#008080" },
                  },
                  "& .MuiInputLabel-root": { fontSize: "16px", top: "1px" },
                  height: "40px",
                }}
              />

              <Button
                variant="contained"
                sx={{
                  background: "#455185",
                  color: "white",
                  padding: "10px 20px",
                  textTransform: "none",
                  borderRadius: 2,
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  "&:hover": {
                    background: "#3C4565",
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Export
              </Button>
            </Box>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <SummaryCard
              title="Bilangan TVPPS Sekolah Disahkan"
              value="20"
              icon={<FaCheckCircle className="text-[#455185] text-5xl" />}
            />
            <SummaryCard
              title="Bilangan Pending Validasi"
              value="5"
              icon={<FaClock className="text-[#455185] text-5xl" />}
            />
            <SummaryCard
              title="Bilangan Sekolah Di Daerah Anda"
              value="15"
              icon={<FaSchool className="text-[#455185] text-5xl" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-8 shadow-md col-span-1 md:col-span-2">
              <div className="flex justify-between mb-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#455185]">Bilangan Versi</h3>
                  <p className="text-2xl font-bold text-[#455185]">3</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#455185]">Bilangan Telah Disahkan</h3>
                  <p className="text-2xl font-bold text-[#455185]">15</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#455185]">
                    Purata Bilangan Telah Disahkan
                  </h3>
                  <p className="text-2xl font-bold text-[#455185]">5</p>
                </div>
              </div>
              <h3 className="text-center text-lg font-semibold text-[#455185] mb-4">
                Bilangan Pengguna Mengikut Jenis
              </h3>
              <Bar data={barData} options={barOptions} />
            </div>

            <div className="bg-white p-8 shadow-md">
              <h3 className="text-center text-lg font-semibold text-[#455185] mb-4">
                Jumlah Peratusan Mengikut Versi
              </h3>
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
