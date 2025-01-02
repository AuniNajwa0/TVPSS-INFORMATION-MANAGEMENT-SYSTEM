import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SchoolAdminSideBar from '../SchoolAdminSideBar';
import { Inertia } from '@inertiajs/inertia';

export default function ListEquipment({ equipment, eqLocation }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchEquipment, setSearchEquipment] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const equipmentRowsPerPage = equipment.per_page;
    const equipmentCurrentPage = equipment.current_page;
    const totalEquipmentItems = equipment.total;
    const equipmentData = equipment.data;

    const locationRowsPerPage = 5;
    const [locationCurrentPage, setLocationCurrentPage] = useState(1);

    const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
        Inertia.get(`/equipment`, { sortField: field, sortOrder: order, search: searchEquipment });
    };

    const handleSearchEquipment = (e) => {
        const value = e.target.value;
        setSearchEquipment(value);
        Inertia.get(`/equipment`, { search: value, sortField, sortOrder });
    };

    const handleSearchLocation = (e) => {
        setSearchLocation(e.target.value);
    };

    const handleDeleteSelected = () => {
        const confirmed = window.confirm("Padam barang yang dipilih?");
        if (confirmed) {
            Inertia.delete(route('equipment.deleteSelected'), {
                ids: selectedItems,
            });
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const sortedLocations = eqLocation
        .filter((location) => location.eqLocName.toLowerCase().includes(searchLocation.toLowerCase()))
        .slice(
            (locationCurrentPage - 1) * locationRowsPerPage,
            locationCurrentPage * locationRowsPerPage
        );

    const totalLocationItems = eqLocation.length;

    const nextLocationPage = () => {
        if (locationCurrentPage < Math.ceil(totalLocationItems / locationRowsPerPage)) {
            setLocationCurrentPage(locationCurrentPage + 1);
        }
    };

    const prevLocationPage = () => {
        if (locationCurrentPage > 1) {
            setLocationCurrentPage(locationCurrentPage - 1);
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Pengurusan Barang</h2>}>
            <Head title="TVPSS | Pengurusan Bilangan Barang" />
            <div className="flex">
                <div className="w-1/6 p-4 text-white min-h-screen">
                    <SchoolAdminSideBar />
                </div>

                <div className="flex-1 p-6">
                    {/* Equipment Table */}
                    <div className="mb-6">
                        <div className="flex justify-end items-center mb-4">
                            <button
                                className="bg-[#455185] hover:bg-[#3C4565] text-white rounded-md px-4 py-2 shadow-md mr-2"
                                onClick={() => window.location.href = '/equipment/create'}
                            >
                                Tambah Barang
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 shadow-md"
                                onClick={handleDeleteSelected}
                                disabled={selectedItems.length === 0}
                            >
                                Padam Barang
                            </button>
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Cari Nama Peralatan"
                                value={searchEquipment}
                                onChange={handleSearchEquipment}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className="max-w-8xl mx-auto p-6 text-gray-900 bg-white rounded shadow-md">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border-b p-4">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedItems(equipmentData.map((item) => item.id));
                                                    } else {
                                                        setSelectedItems([]);
                                                    }
                                                }}
                                                checked={selectedItems.length === equipmentData.length}
                                            />
                                        </th>
                                        <th className="border-b p-4">Bil</th>
                                        <th
                                            className="border-b p-4 cursor-pointer"
                                            onClick={() => handleSort('name')}
                                        >
                                            Nama Peralatan
                                            {sortField === 'name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
                                        <th className="border-b p-4">Jenis</th>
                                        <th
                                            className="border-b p-4 cursor-pointer"
                                            onClick={() => handleSort('location')}
                                        >
                                            Lokasi
                                            {sortField === 'location' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
                                        <th className="border-b p-4">Tarikh Diperolehi</th>
                                        <th className="border-b p-4">Status</th>
                                        <th className="border-b p-4">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipmentData.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="border-b p-4">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleSelectItem(item.id)}
                                                    checked={selectedItems.includes(item.id)}
                                                />
                                            </td>
                                            <td className="border-b p-4">{index + 1}</td>
                                            <td className="border-b p-4">{item.equipName}</td>
                                            <td className="border-b p-4">{item.equipType}</td>
                                            <td className="border-b p-4">{item.location}</td>
                                            <td className="border-b p-4">{item.acquired_date}</td>
                                            <td className="border-b p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs ${item.status === 'Berfungsi' ? 'bg-green-100 text-green-700' : item.status === 'Penyelenggaraan' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}
                                                >
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
                                                            Inertia.delete(`/equipment/${item.id}`);
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
                        </div>
                    </div>

                    {/* Location Table */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <input
                                type="text"
                                placeholder="Cari Lokasi"
                                value={searchLocation}
                                onChange={handleSearchLocation}
                                className="w-5/6 p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                            <button
                                className="bg-[#455185] hover:bg-[#3C4565] text-white rounded-md px-4 py-2 shadow-md"
                                onClick={() => window.location.href = '/eqLoc/create'}
                            >
                                Tambah Lokasi
                            </button>
                        </div>

                        <div className="max-w-8xl mx-auto p-6 text-gray-900 bg-white rounded shadow-md">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="text-center border-b p-4 w-1">Bil</th>
                                        <th className="text-left border-b p-4 w-3/6">Lokasi</th>
                                        <th className="text-center border-b p-4 w-2/6">Jenis Lokasi</th>
                                        <th className="text-center border-b p-4">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedLocations.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="text-center border-b p-4">{index + 1 + (locationCurrentPage - 1) * locationRowsPerPage}</td>
                                            <td className="text-left border-b p-4">{item.eqLocName}</td>
                                            <td className="text-center border-b p-4">{item.eqLocType}</td>
                                            <td className="text-center border-b p-4">
                                                <button
                                                    className="mr-2 text-blue-600 hover:text-blue-800"
                                                    onClick={() => Inertia.get(`/eqLoc/${item.id}/edit`)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => {
                                                        const confirmed = window.confirm("Padam lokasi?");
                                                        if (confirmed) {
                                                            Inertia.delete(`/eqLoc/${item.id}`);
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
