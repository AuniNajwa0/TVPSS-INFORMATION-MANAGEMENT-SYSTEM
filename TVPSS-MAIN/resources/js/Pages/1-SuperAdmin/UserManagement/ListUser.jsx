import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { FaDownload, FaSchool, FaUsers, FaUserShield } from "react-icons/fa";
import SuperAdminSideBar from "./SuperAdminSideBar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("Mingguan");
  const [date, setDate] = useState("2024-07-02");

  const [userCounts, setUserCounts] = useState({
    stateAdmin: 0,
    ppdAdmin: 0,
    schoolAdmin: 0,
  });

  useEffect(() => {
    async function fetchUserCounts() {
      try {
        const response = await fetch("/user-role-counts");
        const data = await response.json();
        setUserCounts({
          stateAdmin: data.state_admin,
          ppdAdmin: data.ppd_admin,
          schoolAdmin: data.school_admin,
        });
      } catch (error) {
        console.error("Error fetching user role counts:", error);
      }
    }

    fetchUserCounts();
  }, []);

  // Bar chart data with border colors
  const barData = {
    labels: ["Admin State", "Admin PPD", "Admin Sekolah"],
    datasets: [
      {
        label: "Bilangan Pengguna Mengikut Jenis",
        data: [userCounts.stateAdmin, userCounts.ppdAdmin, userCounts.schoolAdmin],
        backgroundColor: ["#455185", "#008080", "#00BFFF"],
        borderColor: ["#1C2433", "#006666", "#005F9E"], // Border colors
        borderWidth: 1, // Border thickness
      },
    ],
  };

  // Doughnut chart data with border colors
  const doughnutData = {
    labels: ["Admin State", "Admin PPD", "Admin Sekolah"],
    datasets: [
      {
        label: "Bilangan Peratusan Pengguna Mengikut Jenis",
        data: [userCounts.stateAdmin, userCounts.ppdAdmin, userCounts.schoolAdmin],
        backgroundColor: ["#455185", "#FF6384", "#FFA500"],
        borderColor: ["#1C2433", "#B22234", "#D2691E"], // Border colors
        borderWidth: 2, // Border thickness
        hoverOffset: 4,
      },
    ],
  };

  return (
    <AuthenticatedLayout>
      <Head title="TVPSS | Dashboard" />

      <div className="flex flex-col md:flex-row min-h-screen bg-[#f8faff]">
        <div className="w-1/6 bg-white shadow-lg">
          <SuperAdminSideBar />
        </div>

        <div className="w-full md:ml-[120px] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold text-gray-900 bg-clip-text hover:scale-105 transform transition duration-300 ease-in-out">
              Dashboard
            </h2>

            <Box component="form" className="flex items-center space-x-4">
              {/* Time Range Dropdown */}
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

              {/* Date Input */}
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

              {/* Export Button with Icon */}
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
                <FaDownload />
                Export
              </Button>
            </Box>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <SummaryCard
              title="Bilangan State Admin"
              value={userCounts.stateAdmin}
              icon={<FaUsers className="text-white text-5xl" />}
            />
            <SummaryCard
              title="Bilangan PPD Admin"
              value={userCounts.ppdAdmin}
              icon={<FaUserShield className="text-white text-5xl" />}
            />
            <SummaryCard
              title="Bilangan Sekolah Admin"
              value={userCounts.schoolAdmin}
              icon={<FaSchool className="text-white text-5xl" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
    <h3 className="text-lg text-center font-semibold text-[#455185] mb-4">
      Bilangan Pengguna Mengikut Jenis
    </h3>
    <Bar data={barData} />
  </div>

  <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
    <h3 className="text-lg text-center font-semibold text-[#455185] mb-4">
      Bilangan Peratusan Pengguna Mengikut Jenis
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
      <div className="mr-4 p-3 bg-[#455185] rounded-3xl ">{icon}</div>
      <div className="text-[#455185]">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}
