import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SuperAdminSideBar from "../SuperAdminSideBar";
import { useState } from "react";
import {
    TextField,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    styled,
    CircularProgress,
    Alert,
    FormHelperText,
} from "@mui/material";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Inertia } from "@inertiajs/inertia";

export default function AddUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        state: "",
        district: "",
        password: "",
        password_confirmation: "",
    });

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const roles = [
        { id: 0, name: "Super Admin" },
        { id: 1, name: "State Admin" },
        { id: 2, name: "PPD Admin" },
        { id: 3, name: "School Admin" },
    ];

    const states = [
        "Johor",
        "Melaka",
        "Pahang",
        "Wilayah Persekutuan Kuala Lumpur",
        "Selangor",
        "Negeri Sembilan",
        "Perak",
        "Kedah",
        "Pulau Pinang",
        "Perlis",
        "Kelantan",
        "Terengganu",
        "Sabah",
        "Sarawak",
    ];

    const districts = {
        Johor: [
            "Johor Bahru",
            "Muar",
            "Kluang",
            "Segamat",
            "Mersing",
            "Kota Tinggi",
            "Batu Pahat",
            "Pontian",
            "Pasir Gudang",
            "Tangkak",
            "Kulaijaya",
        ],
        Pahang: [
            "Kuantan",
            "Temerloh",
            "Bera",
            "Pekan",
            "Rompin",
            "Maran",
            "Jerantut",
            "Bentong",
        ],
        "Wilayah Persekutuan Kuala Lumpur": ["Kuala Lumpur"],
        Selangor: [
            "Petaling",
            "Hulu Langat",
            "Sepang",
            "Klang",
            "Gombak",
            "Kuala Selangor",
            "Sabak Bernam",
            "Selayang",
        ],
        "Negeri Sembilan": [
            "Seremban",
            "Port Dickson",
            "Rembau",
            "Jelebu",
            "Tampin",
            "Gemenceh",
        ],
        Perak: [
            "Ipoh",
            "Kuala Kangsar",
            "Taiping",
            "Teluk Intan",
            "Sitiawan",
            "Parit Buntar",
            "Tanjung Malim",
            "Kampar",
        ],
        Kedah: [
            "Alor Setar",
            "Sungai Petani",
            "Kuala Kedah",
            "Kulim",
            "Baling",
            "Langkawi",
            "Pokok Sena",
            "Kubang Pasu",
        ],
        "Pulau Pinang": [
            "Georgetown",
            "Bukit Mertajam",
            "Nibong Tebal",
            "Balik Pulau",
        ],
        Perlis: ["Kangar", "Arau"],
        Kelantan: [
            "Kota Bharu",
            "Tumpat",
            "Pasir Mas",
            "Machang",
            "Tanah Merah",
            "Gua Musang",
            "Kuala Krai",
        ],
        Terengganu: [
            "Kuala Terengganu",
            "Dungun",
            "Kemaman",
            "Besut",
            "Hulu Terengganu",
            "Marang",
        ],
        Sabah: [
            "Kota Kinabalu",
            "Sandakan",
            "Tawau",
            "Keningau",
            "Beaufort",
            "Lahad Datu",
            "Semporna",
            "Ranau",
            "Papar",
        ],
        Sarawak: [
            "Kuching",
            "Sibu",
            "Miri",
            "Bintulu",
            "Sri Aman",
            "Mukah",
            "Betong",
            "Limbang",
        ],
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});
        const newErrors = {};

        if (!formData.name) newErrors.name = "Nama diperlukan!";
        if (!formData.email) newErrors.email = "Email diperlukan!";
        if (!formData.password) newErrors.password = "Katalaluan diperlukan!";
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Katalaluan tidak sepadan!";
        }
        if (!formData.role) newErrors.role = "Peranan diperlukan!";
        if (!formData.state) newErrors.state = "Negeri diperlukan!";
        if (!formData.district) newErrors.district = "Daerah diperlukan!";
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Sila masukkan alamat emel yang sah.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const transformedData = {
                ...formData,
                role: formData.role,
            };
            await Inertia.post("/users", transformedData);

            setMessage("Pengguna berjaya ditambah!");
            setFormData({
                name: "",
                email: "",
                role: "",
                state: "",
                district: "",
                password: "",
                password_confirmation: "",
            });
        } catch (error) {
            setMessage("Ralat berlaku, sila cuba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    const StyledTextField = styled(TextField)(({ theme, error }) => ({
        "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            borderColor: error ? theme.palette.error.main : "#455185",
            "&:hover": {
                borderColor: error ? theme.palette.error.main : "#3b7dd8",
            },
            "&.Mui-focused": {
                borderColor: error ? theme.palette.error.main : "#3b7dd8",
            },
        },
    }));

    return (
        <AuthenticatedLayout>
            <Head title="TVPSS | Pengurusan Pengguna" />
            <div className="flex flex-col md:flex-row min-h-screen bg-[#f8faff]">
                <div className="w-1/5 bg-white shadow-lg">
                    <SuperAdminSideBar />
                </div>
                <div className="flex-1 p-4">
                    <div className="max-w-6xl p-7">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Tambah Pengguna Baharu
                        </h2>
                        <hr className="border-t-2 border-gray-200 mb-6" />

                        {message && (
                            <Alert
                                severity={
                                    message.includes("berjaya")
                                        ? "success"
                                        : "error"
                                }
                            >
                                {message}
                            </Alert>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-7"
                        >
                            <StyledTextField
                                label="Nama"
                                name="name"
                                variant="outlined"
                                fullWidth
                                value={formData.name}
                                onChange={handleInputChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                InputProps={{
                                    startAdornment: (
                                        <FiUser className="text-gray-400 mr-2" />
                                    ),
                                }}
                            />
                            <StyledTextField
                                label="Alamat Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                InputProps={{
                                    startAdornment: (
                                        <FiMail className="text-gray-400 mr-2" />
                                    ),
                                }}
                            />
                            <StyledTextField
                                label="Kata Laluan"
                                name="password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    startAdornment: (
                                        <FiLock className="text-gray-400 mr-2" />
                                    ),
                                }}
                            />
                            <StyledTextField
                                label="Sahkan Kata Laluan"
                                name="password_confirmation"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={formData.password_confirmation}
                                onChange={handleInputChange}
                                error={!!errors.password_confirmation}
                                helperText={errors.password_confirmation}
                                InputProps={{
                                    startAdornment: (
                                        <FiLock className="text-gray-400 mr-2" />
                                    ),
                                }}
                            />
                            <FormControl fullWidth error={!!errors.role}>
                                <InputLabel>Peranan</InputLabel>
                                <Select
                                    name="role"
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        })
                                    }
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role.id} value={role.id}>
                                            {role.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.role}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth error={!!errors.state}>
                                <InputLabel>Negeri</InputLabel>
                                <Select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                >
                                    {states.map((state) => (
                                        <MenuItem key={state} value={state}>
                                            {state}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.state}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth error={!!errors.district}>
                                <InputLabel>Daerah</InputLabel>
                                <Select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    disabled={!formData.state}
                                >
                                    {formData.state &&
                                        districts[formData.state]?.map(
                                            (district) => (
                                                <MenuItem
                                                    key={district}
                                                    value={district}
                                                >
                                                    {district}
                                                </MenuItem>
                                            )
                                        )}
                                </Select>
                                <FormHelperText>
                                    {errors.district}
                                </FormHelperText>
                            </FormControl>

                            <div className="col-span-2 flex justify-end gap-3">
                                <a
                                    href={route("users.index")}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-2xl hover:bg-gray-400"
                                >
                                    Batal
                                </a>
                                <button
                                    type="submit"
                                    className="bg-[#455185] text-white py-2 px-4 rounded-2xl hover:bg-blue-900 flex items-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <CircularProgress
                                            size={20}
                                            color="inherit"
                                        />
                                    ) : (
                                        "Tambah Pengguna"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
