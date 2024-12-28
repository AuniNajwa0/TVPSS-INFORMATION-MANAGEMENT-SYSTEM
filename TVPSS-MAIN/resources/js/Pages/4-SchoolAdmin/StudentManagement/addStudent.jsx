import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SchoolAdminSideBar from "../SchoolAdminSideBar";
import { FiUser, FiMail, FiMapPin, FiBook, FiHome, FiMap } from "react-icons/fi";

const Modal = ({ message, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-black bg-opacity-50 absolute inset-0 backdrop-blur-sm" onClick={onClose}></div>
        <div className="bg-white p-8 rounded-2xl shadow-xl z-10 max-w-md w-full mx-4 transform transition-all">
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                        className="w-8 h-8 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Validation Error</h2>
                <p className="text-gray-600">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transform transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);

export default function AddStudent({ schoolInfo }) {
    const [formData, setFormData] = useState({
        name: "",
        ic_num: "",
        email: "",
        crew: "",
        state: schoolInfo.state || "",
        district: schoolInfo.district || "",
        schoolName: schoolInfo.schoolName || "",
        school_info_id: schoolInfo.id || "",
    });

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [modalMessage, setModalMessage] = useState("");

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
        setMessage("");
        setModalMessage("");

        setIsLoading(true);

        try {
            await Inertia.post("/students", formData, {
                onSuccess: () => {
                    setMessage("Student added successfully!");
                    setFormData({
                        name: "",
                        ic_num: "",
                        email: "",
                        crew: "",
                        state: schoolInfo.state,
                        district: schoolInfo.district,
                        schoolName: schoolInfo.schoolName,
                        school_info_id: schoolInfo.id,
                    });
                },
                onError: (validationErrors) => {
                    setErrors(validationErrors);
                    setMessage("");
                },
            });
        } catch (error) {
            console.error("Unexpected Error:", error);
            setMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const InputField = ({ icon: Icon, label, name, type = "text", ...props }) => (
        <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Icon size={20} />
            </div>
            <input
                type={type}
                name={name}
                placeholder={label}
                autoComplete="off"
                className={`w-full pl-10 pr-4 py-3 bg-white border ${
                    errors[name] ? "border-red-500" : "border-gray-200"
                } rounded-xl focus:outline-none focus:border-blue-500 transition-colors`}
                value={formData[name]}
                onChange={handleInputChange}
                {...props}
            />
            {errors[name] && (
                <p className="mt-1 text-sm text-red-500">{errors[name][0]}</p>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout>
            <Head title="TVPSS | Tambah Pelajar" />

            <div className="flex min-h-screen bg-gray-50">
                <div className="w-64 bg-white shadow-lg">
                    <SchoolAdminSideBar />
                </div>

                <div className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            Tambah Data Pelajar
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Sila tambah informasi pelajar di ruangan bawah
                        </p>

                        {message && (
                            <div
                                className={`mb-6 p-4 rounded-lg ${
                                    message.includes("successfully")
                                        ? "bg-green-50 text-green-700"
                                        : "bg-red-50 text-red-700"
                                }`}
                            >
                                {message}
                            </div>
                        )}

                        <form method="POST" onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <InputField
                                        icon={FiUser}
                                        label="Nama Penuh"
                                        name="name"
                                    />
                                </div>
                                <InputField
                                    icon={FiMapPin}
                                    label="Nombor Kad Pengenalan"
                                    name="ic_num"
                                />
                                <InputField
                                    icon={FiMail}
                                    label="Alamat Email"
                                    name="email"
                                    type="email"
                                />
                                <InputField
                                    icon={FiBook}
                                    label="Krew"
                                    name="crew"
                                />
                                <InputField
                                    icon={FiMap}
                                    label="State"
                                    name="state"
                                    disabled
                                />
                                <div className="col-span-2">
                                    <InputField
                                        icon={FiMap}
                                        label="District"
                                        name="district"
                                        disabled
                                    />
                                </div>
                                <div className="col-span-2">
                                    <InputField
                                        icon={FiHome}
                                        label="School Name"
                                        name="schoolName"
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-8">
                                <a
                                    href="/listStudent"
                                    className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </a>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center">
                                            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                                            Processing...
                                        </div>
                                    ) : (
                                        "Add Student"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {modalMessage && (
                <Modal message={modalMessage} onClose={() => setModalMessage("")} />
            )}
        </AuthenticatedLayout>
    );
}
