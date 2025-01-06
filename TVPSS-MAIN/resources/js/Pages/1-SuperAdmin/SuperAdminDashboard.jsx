import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import SuperAdminSideBar from "./SuperAdminSideBar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ToggleButtonGroup, ToggleButton, Button, Box } from "@mui/material";
import { School, Layers, Download, Calendar, ChevronDown, Landmark, UserPlus, FileText, Settings, Mail, Upload, CheckCircle, AlertCircle } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("Weekly");
  const [date, setDate] = useState(new Date());
  const [userCounts, setUserCounts] = useState({
    stateAdmin: 150,
    ppdAdmin: 230,
    schoolAdmin: 400,
  });

  const getActivityIcon = (type) => {
    const iconProps = { size: 20, className: "flex-shrink-0" };
    switch (type) {
      case 'user': return <UserPlus {...iconProps} className="text-green-600" />;
      case 'document': return <FileText {...iconProps} className="text-blue-600" />;
      case 'settings': return <Settings {...iconProps} className="text-purple-600" />;
      case 'email': return <Mail {...iconProps} className="text-yellow-600" />;
      case 'upload': return <Upload {...iconProps} className="text-orange-600" />;
      case 'download': return <Download {...iconProps} className="text-cyan-600" />;
      case 'success': return <CheckCircle {...iconProps} className="text-emerald-600" />;
      case 'warning': return <AlertCircle {...iconProps} className="text-red-600" />;
      default: return <FileText {...iconProps} className="text-gray-600" />;
    }
  };

  const dummyActivities = [
    {
      id: 1,
      type: 'user',
      description: 'Admin PPD baharu ditambah untuk PPD Petaling Perdana',
      user: 'Ahmad Zaidi',
      timestamp: '2 minit yang lalu',
      status: 'success'
    },
    {
      id: 2,
      type: 'document',
      description: 'Laporan prestasi sekolah-sekolah PPD Klang dimuat naik',
      user: 'Sarah Abdullah',
      timestamp: '45 minit yang lalu',
      status: 'pending'
    },
    {
      id: 3,
      type: 'settings',
      description: 'Tetapan sistem dikemaskini untuk PPD Hulu Langat',
      user: 'System',
      timestamp: '1 jam yang lalu',
      status: 'success'
    },
    {
      id: 4,
      type: 'email',
      description: 'Notifikasi pengguna baharu dihantar kepada semua admin sekolah',
      user: 'System',
      timestamp: '2 jam yang lalu',
      status: 'success'
    },
    {
      id: 5,
      type: 'upload',
      description: 'Data pelajar baharu SMK Bandar Tun Hussein Onn dimuat naik',
      user: 'Noor Hafizah',
      timestamp: '3 jam yang lalu',
      status: 'success'
    },
    {
      id: 6,
      type: 'warning',
      description: 'Cubaan log masuk yang gagal dikesan dari IP tidak dikenali',
      user: 'Security System',
      timestamp: '4 jam yang lalu',
      status: 'warning'
    },
    {
      id: 7,
      type: 'success',
      description: 'Backup sistem berjaya dilaksanakan',
      user: 'System',
      timestamp: '5 jam yang lalu',
      status: 'success'
    },
    {
      id: 8,
      type: 'document',
      description: 'Dokumen panduan pengguna dikemaskini ke versi 2.1',
      user: 'Admin System',
      timestamp: '6 jam yang lalu',
      status: 'success'
    }
  ];

  const barData = {
    labels: ["Admin State", "Admin PPD", "Admin Sekolah"],
    datasets: [
      {
        label: "Bilangan Pengguna Mengikut Jenis",
        data: [userCounts.stateAdmin, userCounts.ppdAdmin, userCounts.schoolAdmin],
        backgroundColor: ["#4158A6", "#179BAE", "#FF8343"],
        borderColor: ["#4158A6", "#179BAE", "#179BAE"],
        borderWidth: 1,
        borderRadius: 20,
      },
    ],
  };

  const doughnutData = {
    labels: ["Admin State", "Admin PPD", "Admin Sekolah"],
    datasets: [
      {
        label: "Bilangan Peratusan Pengguna Mengikut Jenis",
        data: [userCounts.stateAdmin, userCounts.ppdAdmin, userCounts.schoolAdmin],
        backgroundColor: ["#4158A6", "#179BAE", "#FF8343"],
        borderColor: ["#4158A6", "#179BAE", "#FF8343"],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange) {
      setTimeRange(newTimeRange);
    }
  };

  const CustomDateInput = ({ value, onClick }) => (
    <div style={{ position: "relative" }} onClick={onClick}>
      <input
        type="text"
        value={value}
        className="px-4 py-2.5 pl-10 pr-10 bg-[#f8f9fa] border border-[#ddd] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        readOnly
      />
      <Calendar
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          color: "#374151",
          fontSize: "10px",
        }}
      />
      <ChevronDown
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          color: "#374151",
          fontSize: "14px",
        }}
      />
    </div>
  );

  return (
    <AuthenticatedLayout>
      <Head title="TVPSS | Dashboard" />
      <div className="flex flex-col md:flex-row min-h-screen bg-white">
        <div className="w-1/6 bg-white shadow-lg">
          <SuperAdminSideBar />
        </div>

        <div className="w-full md:ml-[120px] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold text-gray-900 bg-clip-text">Dashboard</h2>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-lg text-gray-700 mt-2">
              Selamat Datang ke Dashboard Super Admin!
            </p>

            <Box component="form" className="flex items-center space-x-4">
              <ToggleButtonGroup
                value={timeRange}
                exclusive
                onChange={handleTimeRangeChange}
                aria-label="Time Range"
                sx={{
                  backgroundColor: "#f2f5f7",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                  "& .MuiToggleButtonGroup-grouped": {
                    textTransform: "none",
                    fontWeight: "500",
                    fontSize: "14px",
                    padding: "10px 20px",
                    border: "none",
                    color: "#374151",
                    "&.Mui-selected": {
                      backgroundColor: "#ffffff",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      color: "#000",
                      fontWeight: "600",
                    },
                    "&:hover": {
                      backgroundColor: "#f2f5f7",
                    },
                  },
                }}
              >
                <ToggleButton value="Daily">Harian</ToggleButton>
                <ToggleButton value="Weekly">Mingguan</ToggleButton>
                <ToggleButton value="Monthly">Bulanan</ToggleButton>
              </ToggleButtonGroup>

              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="yyyy-MM-dd"
                customInput={<CustomDateInput />}
              />

              <Button
                variant="contained"
                sx={{
                  background: "#4158A6",
                  color: "white",
                  padding: "10px 20px",
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: "bold",
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
                <Download style={{ fontSize: "20px" }} />
                Export
              </Button>
            </Box>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <SummaryCard
              title="Bilangan State Admin"
              value={userCounts.stateAdmin}
              icon={{
                Component: Layers,
                color: "#5c63f6",
                bgColor: "#E8F0FE",
              }}
            />
            <SummaryCard
              title="Bilangan PPD Admin"
              value={userCounts.ppdAdmin}
              icon={{
                Component: Landmark,
                color: "#17bae",
                bgColor: "#e8f5f7",
              }}
            />
            <SummaryCard
              title="Bilangan Sekolah Admin"
              value={userCounts.schoolAdmin}
              icon={{
                Component: School,
                color: "#e99341",
                bgColor: "#FFF3E0",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 rounded-2xl border-2 border-gray-200 flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Bilangan Pengguna Mengikut Jenis</h3>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  indexAxis: "y",
                  plugins: {
                    legend: { position: "top" },
                    tooltip: {
                      callbacks: {
                        label: (tooltipItem) => {
                          return tooltipItem.raw.toLocaleString();
                        },
                      },
                    },
                  },
                  elements: { bar: { borderRadius: 10 } },
                  scales: {
                    x: { beginAtZero: true },
                    y: {
                      grid: { display: false },
                      ticks: { display: true },
                    },
                  },
                }}
              />
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-gray-200 flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Bilangan Peratusan Pengguna</h3>
              <Doughnut data={doughnutData} options={{ responsive: true }} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-gray-200 mb-6">
  <h3 className="text-xl font-bold text-gray-800 mb-4">Aktiviti Terkini</h3>
  <div className="overflow-auto max-h-96">
    {dummyActivities.map((activity) => (
      <div
        key={activity.id}
        className="flex items-start justify-between mb-4 p-3 bg-gray-50 rounded-lg"
      >
        <div className="flex items-center">
          {getActivityIcon(activity.type)}
          <div className="ml-3">
            <p className="text-gray-700 text-sm font-semibold">{activity.description}</p>
            <p className="text-gray-500 text-xs">{activity.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className={`text-sm ${activity.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {activity.status}
          </p>
        </div>
      </div>
    ))}
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

function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between border border-gray-200 hover:scale-105 transform transition duration-300 ease-in-out">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-lg font-semibold text-gray-600">{value}</p>
      </div>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ backgroundColor: icon.bgColor }}
      >
        <icon.Component style={{ color: icon.color, fontSize: "30px" }} />
      </div>
    </div>
  );
}
