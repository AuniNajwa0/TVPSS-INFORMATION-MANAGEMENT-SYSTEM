import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SchoolAdminSideBar from '../SchoolAdminSideBar'; 
import { useState } from 'react';

export default function UpdateSchoolInformation() {
    // State for form data
    const [formData, setFormData] = useState({
        schoolName: "",
        address1: "",
        address2: "",
        postcode: "",
        state: "",
        phoneNumber: "",
        email: "",
        fax: "",
        logoFile: null,
        youtubeLink: "",
    });

    // Handler to update form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0],
        }));
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    // Handler for cancel action
    const handleCancel = () => {
        setFormData({
            schoolName: '',
            address1: '',
            address2: '',
            postcode: '',
            state: '',
            phoneNumber: '',
            email: '',
            fax: '',
            logoFile: null,
            youtubeLink: '',
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Informasi Sekolah
                </h2>
            }
        >
            <Head title="Informasi Sekolah" />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <SchoolAdminSideBar />

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md border border-gray-200 p-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            Maklumat Sekolah
                        </h3>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                {/* School Name */}
                                <input
                                    type="text"
                                    name="schoolName"
                                    value={formData.schoolName}
                                    onChange={handleInputChange}
                                    className="col-span-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nama Sekolah"
                                />

                                {/* Alamat 1 */}
                                <input
                                    type="text"
                                    name="address1"
                                    value={formData.address1}
                                    onChange={handleInputChange}
                                    className="col-span-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Alamat Sekolah 1"
                                />

                                {/* Alamat 2 */}
                                <input
                                    type="text"
                                    name="address2"
                                    value={formData.address2}
                                    onChange={handleInputChange}
                                    className="col-span-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Alamat Sekolah 2"
                                />

                                {/* Poskod */}
                                <input
                                    type="text"
                                    name="postcode"
                                    value={formData.postcode}
                                    onChange={handleInputChange}
                                    className="col-span-1 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Poskod"
                                />

                                {/* Negeri */}
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="col-span-1 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Negeri"
                                />
                            </div>

                            {/* No Telefon, Email, and Fax */}
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="No Telefon"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    name="fax"
                                    value={formData.fax}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="No Fax"
                                />
                            </div>

                            {/* File Upload */}
                            <div className="mb-6">
                                <label className="block mb-2 text-gray-700">
                                    Muat naik Logo Sekolah
                                </label>
                                <input
                                    type="file"
                                    name="logoFile"
                                    onChange={handleFileChange}
                                    className="block w-full text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* YouTube Link */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="youtubeLink"
                                    value={formData.youtubeLink}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Link Video (YouTube)"
                                />
                            </div>
                                 {/* Submit Button */}
                            <div className="flex justify-end space-x-4 mb-6">
                                <button
                                    type="reset"
                                    onClick={handleCancel}
                                    className="px-6 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#455185] text-white rounded-md shadow-md hover:bg-[#3d4674] focus:outline-none focus:ring-2 focus:ring-[#455185] transition"
                                >
                                    Hantar Maklumat Sekolah
                                </button>
                            
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
