import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SchoolAdminSideBar from "../SchoolAdminSideBar";
import { FiUser, FiMail, FiMapPin, FiBook, FiHome, FiMap } from "react-icons/fi";

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setMessage("");
        setIsLoading(true);

        Inertia.post("/students", formData, {
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
            },
            onFinish: () => {
                setIsLoading(false);
            },
        });
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
        </AuthenticatedLayout>
    );
}
