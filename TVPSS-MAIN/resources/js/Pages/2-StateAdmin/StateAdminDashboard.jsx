import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FaUsers, FaUserShield, FaSchool, FaStar, FaSortNumericDown, FaSortNumericUpAlt } from 'react-icons/fa';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
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
} from 'chart.js';
import StateAdminSideBar from './StateAdminSideBar';
import { Select, MenuItem, TextField, Button, FormControl, InputLabel, Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement);

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("Mingguan");
  const [date, setDate] = useState("2024-07-02");

  const barData = {
    labels: ['Versi 1', 'Versi 2', 'Versi 3'],
    datasets: [
      {
        label: 'Bilangan Pengguna Mengikut Jenis',
        data: [48, 800, 4000],
        backgroundColor: ['#455185', '#008080', '#00BFFF'],
        borderColor: ['#1C2433', '#006666', '#005F9E'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Perak', 'Penang', 'Johor'],
    datasets: [
      {
        label: 'Pengguna dalam Tempoh 30 Minit Terakhir',
        data: [20, 300, 800],
        backgroundColor: ['#455185', '#FF6384', '#FFA500'],
        borderColor: ['#1C2433', '#B22234', '#D2691E'],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <AuthenticatedLayout>
      <Head title="TVPSS | Dashboard" />

      <div className="flex flex-col md:flex-row min-h-screen bg-[#f8faff]">
        <div className="w-1/6 bg-white shadow-lg">
          <StateAdminSideBar />
        </div>

        <div className="w-full md:ml-[120px] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold text-gray-900 hover:scale-105 transform transition duration-300 ease-in-out">
              Dashboard
            </h2>

            <Box component="form" className="flex items-center space-x-4">
              <FormControl sx={{ minWidth: 150, height: "40px" }}>
                <InputLabel id="time-range-label" sx={{ fontSize: "16px" }}>Jenis</InputLabel>
                <Select
                  labelId="time-range-label"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  size="small"
                  sx={{
                    backgroundColor: "#ffffff",
                    height: "40px",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#455185" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#008080" },
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
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#ffffff",
                    height: "40px",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#455185" },
                    "&:hover fieldset": { borderColor: "#008080" },
                  },
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
                  gap: "8px",
                  "&:hover": { background: "#3C4565", transform: "scale(1.05)" },
                }}
              >
                Export
              </Button>
            </Box>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <SummaryCard
              title="Bilangan Permohonan Sijil"
              value="48"
              icon={<FaSortNumericUpAlt className="text-white text-5xl" />}
            />
            <SummaryCard
              title="Bilangan Pencapaian"
              value="800"
              icon={<FaStar className="text-white text-5xl" />}
            />
            <SummaryCard
              title="Bilangan TVPPSS Mengikut Negeri"
              value="4000"
              icon={<FaSchool className="text-white text-5xl" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-lg text-center font-semibold text-[#455185] mb-4">
                Bilangan Sekolah Mengikut Versi
              </h3>
              <Bar data={barData} />
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-lg text-center font-semibold text-[#455185] mb-4">
                Jumlah Peratusan Mengikut Versi
              </h3>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-4 bg-white text-[#455185]">
        © 2024 Kementerian Pendidikan Malaysia (KPM)
      </footer>
    </AuthenticatedLayout>
  );
}

function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-2xl border-2 border-gray-200 flex items-center hover:scale-105 transform transition duration-300 ease-in-out">
      <div className="mr-4 p-3 bg-[#455185] rounded-3xl">{icon}</div>
      <div className="text-[#455185]">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}
