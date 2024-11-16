import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import SuperAdminSideBar from '../SuperAdminSideBar';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold text-gray-800 leading-tight">
                    Edit Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="flex">
                <div className="w-1/6 p-4 text-white ">
                    <SuperAdminSideBar />
                </div>

                <div className="py-12 flex-1 px-6 sm:px-8 lg:px-16">
                    <div className="mx-auto max-w-5xl space-y-8">

                        {/* Personal Information Section */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-full"
                            />
                        </div>

                        {/* Update Password Form */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <UpdatePasswordForm className="max-w-full" />
                        </div>

                        {/* Delete User Form */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <DeleteUserForm className="max-w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
