import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react'; // Import useState and useEffect
import { FaArrowLeft } from "react-icons/fa"; // Correct import for the ArrowLeft icon

export default function ApplyCrew({ student }) {
    console.log('Student data:', student); // Log the student data

    const { data, setData, post, processing, errors, reset } = useForm({
        jawatan: "", // Only the jawatan is required
    });

    const [isModalVisible, setIsModalVisible] = useState(false); // Define the modal visibility state

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form with data:', {
            ic_num: student.ic_num, // Pass the IC number from the student data
            jawatan: data.jawatan, // Pass the selected jawatan
        });
        post(route("student.applyCrewSubmit"), {
            data: {
                ic_num: student.ic_num,
                jawatan: data.jawatan,
            },
        });
    };

    useEffect(() => {
        if (errors) {
            console.log('Form submission errors:', errors);
        }
    }, [errors]);

    const styles = {
        page: { 
          backgroundColor: "#ebf8ff", 
          minHeight: "100vh", 
          padding: "20px" },
        formContainer: {
            maxWidth: "600px",
            margin: "20px auto",
            padding: "30px",
            backgroundColor: "#fff",
            borderRadius: "15px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
        },
        formHeader: { textAlign: "center", marginBottom: "35px" },
        formTitle: { fontSize: "28px", fontWeight: "bold", color: "#2d3748" },
        formSubtitle: { color: "#718096", fontSize: "16px", lineHeight: "1.5" },
        formGroup: { position: "relative", marginBottom: "20px" },
        iconContainer: {
            position: "absolute",
            left: "12px",
            color: "#4158A6",
            height: "100%",
            display: "flex",
            alignItems: "center",
        },
        input: {
            width: "100%",
            padding: "12px 12px 12px 45px",
            fontSize: "16px",
            border: "2px solid #e2e8f0",
            borderRadius: "8px",
            backgroundColor: "#f8fafc",
            color: "#2d3748",
        },
        sectionTitle: {
            fontSize: "18px",
            fontWeight: "600",
            color: "#2d3748",
            marginTop: "30px",
            marginBottom: "20px",
            paddingBottom: "8px",
            borderBottom: "2px solid #e2e8f0",
        },
        button: {
            backgroundColor: "#4158A6",
            color: "#fff",
            padding: "14px 28px",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginTop: "30px",
        },
        modal: {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: isModalVisible ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
        },
        modalContent: {
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
        },
        checkIcon: { color: "#28a745", fontSize: "50px", marginBottom: "20px" },
        okButton: {
            backgroundColor: "#4158A6",
            color: "#fff",
            padding: "12px 24px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px",
        },
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Column - Image */}
            <div className="hidden lg:flex w-[100%] bg-[#4158A6] items-center justify-center">
                <img
                    src="/assets/login1.jpg"
                    alt="Login Illustration"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Column - Apply Crew Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 relative bg-gradient-to-b from-gray-50 to-white">
                {/* Back Button */}
                <Link
                    href="/"
                    className="absolute top-8 left-8 p-3 rounded-full hover:bg-white/80 transition-all duration-200 flex items-center justify-center group"
                    aria-label="Kembali"
                >
                    <FaArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                </Link>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6">Permohonan Krew</h2>

                    {/* Display Student Data */}
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700">Nama Pelajar:</p>
                        <p className="bg-gray-100 py-2 px-4 rounded-md">{student.name}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700">IC No:</p>
                        <p className="bg-gray-100 py-2 px-4 rounded-md">{student.ic_num}</p>
                    </div>

                    {/* Jawatan Input */}
                    <div className="mb-4">
                        <label htmlFor="jawatan" className="block text-sm font-medium text-gray-700">Jawatan</label>
                        <input
                            type="text"
                            id="jawatan"
                            value={data.jawatan}
                            onChange={e => setData('jawatan', e.target.value)}
                            className="mt- 1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                        />
                        {errors.jawatan && <span className="text-red-500 text-sm">{errors.jawatan}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        disabled={processing}
                    >
                        {processing ? (
                            <svg className="animate-spin h-5 w-5 mx-auto text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        ) : (
                            "Hantar Permohonan"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}