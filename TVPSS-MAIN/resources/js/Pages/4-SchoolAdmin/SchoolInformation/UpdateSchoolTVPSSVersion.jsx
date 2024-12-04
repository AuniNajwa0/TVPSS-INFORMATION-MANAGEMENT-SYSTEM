import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'; // Import Link for navigation
import { useForm } from '@inertiajs/inertia-react'; // Import useForm for form handling
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { router } from '@inertiajs/react';


export default function UpdateSchoolVersionStatus({ schoolInfo }) {
    // Initialize form using useForm
    const { data, setData, post, reset } = useForm({
        schoolName: schoolInfo?.schoolName || "",
        schoolAddress1: schoolInfo?.schoolAddress1 || "",
        schoolAddress2: schoolInfo?.schoolAddress2 || "",
        postcode: schoolInfo?.postcode || "",
        state: schoolInfo?.state || "",
        noPhone: schoolInfo?.noPhone || "",
        schoolEmail: schoolInfo?.schoolEmail || "",
        noFax: schoolInfo?.noFax || "",
        schoolLogo: null,
        linkYoutube: schoolInfo?.linkYoutube || "",
    });

    // Handler for form data change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: files[0],
        }));
    };

    // Handler for form reset
    const handleCancel = () => {
        reset();
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send POST request to update the school data
        post(route('tvpss1Edit'), {
            onSuccess: () => {
                router.visit(route('tvpss2'));
            },
            onError: (errors) => {
                console.log(errors); // Handle errors if needed
            },
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
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Maklumat Sekolah
                        </h3>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                {/* School Name */}
                                <input
                                    type="text"
                                    name="schoolName"
                                    value={data.schoolName}
                                    onChange={handleInputChange}
                                    className="col-span-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nama Sekolah"
                                />

                                {/* Alamat 1 */}
                                <input
                                    type="text"
                                    name="schoolAddress1"
                                    value={data.schoolAddress1}
                                    onChange={handleInputChange}
                                    className="col-span-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Alamat Sekolah 1"
                                />

                                {/* Alamat 2 */}
                                <input
                                    type="text"
                                    name="schoolAddress2"
                                    value={data.schoolAddress2}
                                    onChange={handleInputChange}
                                    className="col-span-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Alamat Sekolah 2"
                                />

                                {/* Poskod */}
                                <input
                                    type="text"
                                    name="postcode"
                                    value={data.postcode}
                                    onChange={handleInputChange}
                                    className="col-span-1 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Poskod"
                                />

                                {/* Negeri */}
                                <input
                                    type="text"
                                    name="state"
                                    value={data.state}
                                    onChange={handleInputChange}
                                    className="col-span-1 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Negeri"
                                />
                            </div>

                            {/* No Telefon, Email, and Fax */}
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <input
                                    type="text"
                                    name="noPhone"
                                    value={data.noPhone}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="No Telefon"
                                />
                                <input
                                    type="email"
                                    name="schoolEmail"
                                    value={data.schoolEmail}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    name="noFax"
                                    value={data.noFax}
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
                                {schoolInfo?.schoolLogo && (
                                    <div className="mb-4 text-center">
                                        <img
                                            src={`/storage/${schoolInfo.schoolLogo}`}
                                            className="mx-auto mb-2 h-32 w-auto" // Adjust size as needed
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="schoolLogo"
                                    onChange={handleFileChange}
                                    className="block w-full text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* YouTube Link */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="linkYoutube"
                                    value={data.linkYoutube}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Link Video (YouTube)"
                                />
                            </div>

                            {/* Buttons */}
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
                                    Seterusnya
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
