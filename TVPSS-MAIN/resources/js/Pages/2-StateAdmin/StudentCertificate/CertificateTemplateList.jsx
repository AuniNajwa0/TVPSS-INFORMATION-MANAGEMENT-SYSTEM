import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import StateAdminSideBar from '../StateAdminSideBar';

export default function CertificateTemplateList(props) {
    const { templates } = props; // Assuming templates are passed as props

    const handleDelete = (id) => {
        if (confirm(" Adakah anda pasti untuk membuang templat ini?")) {
            Inertia.delete(route('certificate-templates.destroy', id), {
                onSuccess: () => {
                    console.log('Templat berjaya dihapuskan!');
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sijil Templat
                </h2>
            }
        >
            <Head title="Certificate Templates" />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <StateAdminSideBar />

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md border border-gray-200 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Senarai Templat</h3>
                            <Link href="/certificateTemplateUploadForm" className="px-4 py-2 bg-[#455185] text-white rounded-md hover:bg-[#3d4674]">
                                Tambah Templat Baharu
                            </Link>
                        </div>

                        {/* Template List */}
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Templat</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {templates.map(template => (
                                    <tr key={template.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{template.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <Link href={route('certificate-templates.edit', template.id)} className="text-blue-600 hover:text-blue-900 mr-4">
                                                Sunting
                                            </Link>
                                            <button onClick={() => handleDelete(template.id)} className="text-red-600 hover:text-red-900">
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}