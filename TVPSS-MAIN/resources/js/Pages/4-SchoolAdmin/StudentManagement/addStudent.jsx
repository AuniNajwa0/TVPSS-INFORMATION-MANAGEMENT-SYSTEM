import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SchoolAdminSideBar from "../SchoolAdminSideBar";
import { FiUser, FiMail, FiMapPin, FiBook, FiHome, FiMap, FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        Inertia.post("/students", formData, {
            onSuccess: () => {
                toast.success("Student added successfully!");
                setFormData({
                    ...formData,
                    name: "",
                    ic_num: "",
                    email: "",
                    crew: "",
                });
            },
            onError: (validationErrors) => {
                setErrors(validationErrors);
                toast.error("Failed to add student. Please check your input.");
            },
            onFinish: () => setIsLoading(false),
        });
    };

    const InputField = ({ icon: Icon, label, name, type = "text", ...props }) => (
        <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors">
                    <Icon size={18} />
                </div>
                <input
                    type={type}
                    name={name}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    autoComplete="off"
                    className={`w-full pl-12 pr-4 py-3 bg-white border-2 ${
                        errors[name] ? "border-red-300" : "border-gray-100"
                    } rounded-md focus:outline-none focus:border-blue-400 hover:border-gray-200 transition duration-200
                    ${props.disabled ? "bg-gray-50" : ""}`}
                    value={formData[name]}
                    onChange={handleInputChange}
                    {...props}
                />
                {errors[name] && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                        <FiAlertCircle size={18} />
                    </div>
                )}
            </div>
            {errors[name] && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    {errors[name][0]}
                </p>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Add Student" />

            <div className="flex min-h-screen bg-gray-50">
                <div className="w-64 bg-white shadow-lg">
                    <SchoolAdminSideBar />
                </div>

                <div className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-t-md p-6 shadow-lg">
                            <h2 className="text-2xl font-bold text-white mb-2">Add Student</h2>
                            <p className="text-blue-100">Please fill in the student details below</p>
                        </div>

                        <div className="bg-white rounded-b-md shadow-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField icon={FiUser} label="Full Name" name="name" />
                                    <InputField icon={FiMapPin} label="IC Number" name="ic_num" />
                                    <InputField icon={FiMail} label="Email" name="email" type="email" />
                                    <InputField icon={FiBook} label="Crew" name="crew" />
                                    <InputField icon={FiMap} label="State" name="state" disabled />
                                    <InputField icon={FiMap} label="District" name="district" disabled />
                                    <InputField icon={FiHome} label="School Name" name="schoolName" disabled />
                                </div>

                                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                                    <a
                                        href="/listStudent"
                                        className="px-6 py-3 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition duration-200"
                                    >
                                        Cancel
                                    </a>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
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
            </div>
        </AuthenticatedLayout>
    );
}
