import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import SchoolAdminSideBar from '../SchoolAdminSideBar';

export default function UpdateSchoolInformation(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        schoolName: "",
        schoolAddress1: "",
        schoolAddress2: "",
        postcode: "",
        state: "",
        noPhone: "",
        schoolEmail: "",
        noFax: "",
        schoolLogo: null,
        linkYoutube: "",
    });

    // Check if there's existing school info passed from the backend
    useEffect(() => {
        if (props.schoolInfo) {
            setData({
                schoolName: props.schoolInfo.schoolName || "",
                schoolAddress1: props.schoolInfo.schoolAddress1 || "",
                schoolAddress2: props.schoolInfo.schoolAddress2 || "",
                postcode: props.schoolInfo.postcode || "",
                state: props.schoolInfo.state || "",
                noPhone: props.schoolInfo.noPhone || "",
                schoolEmail: props.schoolInfo.schoolEmail || "",
                noFax: props.schoolInfo.noFax || "",
                linkYoutube: props.schoolInfo.linkYoutube || "",
            });
        }
    }, [props.schoolInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setData(name, files[0]); // Store the selected file
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('school.update'), {
            onSuccess: () => {
                console.log('School updated successfully!');
            },
            onError: (errors) => {
                console.error(errors);
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
            <Head title="TVPSS | Informasi Sekolah" />
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
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                {errors.schoolName && <div className="text-red-500">{errors.schoolName}</div>}

                                {/* Address 1 */}
                                <input
                                    type="text"
                                    name="schoolAddress1"
                                    value={data.schoolAddress1}
                                    onChange={handleInputChange}
                                    className="col-span-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Alamat Sekolah 1"
                                />
                                {errors.schoolAddress1 && <div className="text-red-500">{errors.schoolAddress1}</div>}

                                {/* Address 2 */}
                                <input
                                    type="text"
                                    name="schoolAddress2"
                                    value={data.schoolAddress2}
                                    onChange={handleInputChange}
                                    className="col-span-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Alamat Sekolah 2"
                                />
                                {errors.schoolAddress2 && <div className="text-red-500">{errors.schoolAddress2}</div>}

                                {/* Postcode */}
                                <input
                                    type="text"
                                    name="postcode"
                                    value={data.postcode}
                                    onChange={handleInputChange}
                                    className="col-span-1 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Poskod"
                                />
                                {errors.postcode && <div className="text-red-500">{errors.postcode}</div>}

                                {/* State */}
                                <input
                                    type="text"
                                    name="state"
                                    value={data.state}
                                    onChange={handleInputChange}
                                    className="col-span-1 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Negeri"
                                />
                                {errors.state && <div className="text-red-500">{errors.state}</div>}
                            </div>

                            {/* Phone, Email, Fax */}
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <input
                                    type="text"
                                    name="noPhone"
                                    value={data.noPhone}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="No Telefon"
                                />
                                {errors.noPhone && <div className="text-red-500">{errors.noPhone}</div>}

                                <input
                                    type="email"
                                    name="schoolEmail"
                                    value={data.schoolEmail}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Email"
                                />
                                {errors.schoolEmail && <div className="text-red-500">{errors.schoolEmail}</div>}

                                <input
                                    type="text"
                                    name="noFax"
                                    value={data.noFax}
                                    onChange={handleInputChange}
                                    className="border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="No Fax"
                                />
                                {errors.noFax && <div className="text-red-500">{errors.noFax}</div>}
                            </div>

                            {/* File Upload */}
                            <div className="mb-6">
                                <label className="block mb-2 text-gray-700">
                                    Muat naik Logo Sekolah
                                </label>
                                <input
                                    type="file"
                                    name="schoolLogo"
                                    onChange={handleFileChange}
                                    className="block w-full text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.schoolLogo && <div className="text-red-500">{errors.schoolLogo}</div>}
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
                                {errors.linkYoutube && <div className="text-red-500">{errors.linkYoutube}</div>}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-4 mb-6">
                                <button
                                    type="reset"
                                    onClick={() => reset()}
                                    className="px-6 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-[#455185] text-white rounded-md shadow-md hover:bg-[#3d4674] focus:outline-none focus:ring-2 focus:ring-[#455185] transition"
                                >
                                    {processing ? 'Menghantar...' : 'Hantar Maklumat Sekolah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
