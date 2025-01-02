import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import SuperAdminSideBar from "../SuperAdminSideBar";
export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="TVPSS | Profile" />

    <div className="flex flex-col md:flex-row min-h-screen bg-white">
    <div className="w-1/6 bg-white shadow-lg">
    <SuperAdminSideBar />
        </div>

        <div className="w-full md:ml-[120px] p-6">
        <div>
                            <h2 className="text-3xl font-bold text-gray-900 bg-clip-text  ">
                                <a
                                    href="/profileSuperAdmin"
                                    className="text-[#455185] hover:underline"
                                >
                                    Tetapan
                                </a>
                                <span className="mx-2 text-gray-500">{'>'}</span>
                                <a
                                    href="/profileSuperAdmin"
                                    className="text-gray-700 "
                                >
                                    Kemas Kini Maklumat Peribadi
                                </a>
                            </h2>
                        </div>
            
            <div className="p-12">
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white border p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white border p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white border p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
            </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
