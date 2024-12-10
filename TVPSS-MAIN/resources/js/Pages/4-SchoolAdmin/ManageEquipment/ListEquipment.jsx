import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { Inertia } from '@inertiajs/inertia';

export default function ListEquipment({ equipment }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const rowsPerPage = equipment.per_page;
    const currentPage = equipment.current_page;
    const totalItems = equipment.total;

    const currentEquipment = equipment.data;  

    const nextPage = () => {
        if (currentPage < equipment.last_page) {
            window.location.href = `/equipment?page=${currentPage + 1}`;
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            window.location.href = `/equipment?page=${currentPage - 1}`;
        }
    };

    const handleDeleteSelected = () => {
        const confirmed = window.confirm("Padam barang yang dipilih?");
        if (confirmed) {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Pengurusan Bilangan Barang</h2>}>
            <Head title="TVPSS | Pengurusan Bilangan Barang" />
            
            <div className="flex">
                <div className="w-1/6 p-4 text-white min-h-screen">
                    <SchoolAdminSideBar />
                </div>

                <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            className="bg-[#455185] hover:bg-[#3C4565] text-white rounded-md px-4 py-2 shadow-md"
                            onClick={() => window.location.href = '/equipment/create'}
                        >
                            Tambah Barang
                        </button>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 shadow-md"
                            onClick={handleDeleteSelected}
                            disabled={selectedItems.length === 0}
                        >
                            Padam Barang Dipilih
                        </button>
                    </div>

                    <div className="max-w-8xl mx-auto p-6 text-gray-900 bg-white rounded shadow-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b p-4">
                                        <input
                                            type="checkbox"
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    setSelectedItems(currentEquipment.map(item => item.id));
                                                } else {
                                                    setSelectedItems([]);
                                                }
                                            }}
                                            checked={selectedItems.length === currentEquipment.length}
                                        />
                                    </th>
                                    <th className="border-b p-4">Bil</th>
                                    <th className="border-b p-4">Nama Peralatan</th>
                                    <th className="border-b p-4">Jenis</th>
                                    <th className="border-b p-4">Lokasi</th>
                                    <th className="border-b p-4">Tarikh Diperolehi</th>
                                    <th className="border-b p-4">Status</th>
                                    <th className="border-b p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEquipment.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="border-b p-4">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleSelectItem(item.id)}
                                                checked={selectedItems.includes(item.id)}
                                            />
                                        </td>
                                        <td className="border-b p-4">{index + 1}</td>
                                        <td className="border-b p-4">{item.name}</td>
                                        <td className="border-b p-4">{item.type}</td>
                                        <td className="border-b p-4">{item.location}</td>
                                        <td className="border-b p-4">{item.acquired_date}</td>
                                        <td className="border-b p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${item.status === 'Berfungsi' ? 'bg-green-100 text-green-700' : item.status === 'Penyelenggaraan' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="border-b p-4">
                                            <button
                                                className="mr-2 text-blue-600 hover:text-blue-800"
                                                onClick={() => Inertia.get(`/equipment/${item.id}/edit`)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => {
                                                    const confirmed = window.confirm("Padam barang?");
                                                    if (confirmed) {
                                                        setSelectedItems(selectedItems.filter(id => id !== item.id));
                                                    }
                                                }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-center items-center mt-6 space-x-4">
                            <button
                                onClick={prevPage}
                                className="p-2 bg-[#455185] text-white rounded-lg shadow-md hover:bg-[#3C4565] transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                disabled={currentPage === 1}
                            >
                                &lt;
                            </button>

                            <span className="text-sm text-gray-600 font-semibold">
                                Halaman {currentPage} daripada {Math.ceil(totalItems / rowsPerPage)}
                            </span>

                            <button
                                onClick={nextPage}
                                className="p-2 bg-[#455185] text-white rounded-lg shadow-md hover:bg-[#3C4565] transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                disabled={currentPage === Math.ceil(totalItems / rowsPerPage)}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
