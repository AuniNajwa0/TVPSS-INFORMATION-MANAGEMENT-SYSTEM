import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import StateAdminSideBar from '../StateAdminSideBar';
import { useState } from 'react';

export default function CertificateTemplateEdit({ template }) {
    const { data, setData, post, processing, errors } = useForm({
        color: template.color || '',
        fontSize: '16px', // Default font size
        isBold: false, // Default bold option
        isItalic: false, // Default italic option
        textColor: '#000000', // Default text color
        fontFamily: 'Arial', // Default font family
        numberOfPages: 1, // Default number of pages
    });

    const [textEntries, setTextEntries] = useState([]); // Store all text entries
    const [isAddingText, setIsAddingText] = useState(false); // Track if the user is in "Add Text" mode
    const [editingIndex, setEditingIndex] = useState(null); // Track which text entry is being edited
    const [pagesGenerated, setPagesGenerated] = useState(false); // Track if pages have been generated

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('certificate-templates.update', template.id), {
            onSuccess: () => {
                console.log('Template updated successfully!');
            },
        });
    };

    // Function to handle page generation
    const handleGeneratePages = (e) => {
        e.preventDefault();
        setPagesGenerated(true); // Set pages as generated
        setTextEntries([]); // Clear any existing text entries
        setIsAddingText(false); // Exit "Add Text" mode
    };

    // Function to handle click on the preview area
    const handlePreviewClick = (e) => {
        if (!isAddingText) return; // Only proceed if in "Add Text" mode
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // Get x position relative to the preview area
        const y = e.clientY - rect.top; // Get y position relative to the preview area

        // Add the new text entry to the list
        setTextEntries([...textEntries, { 
            content: 'Double-click to edit', // Default content
            position: { x, y }, 
            fontSize: data.fontSize, 
            isBold: data.isBold, 
            isItalic: data.isItalic, 
            textColor: data.textColor, // Use the selected text color
            fontFamily: data.fontFamily,
        }]);
        setIsAddingText(false); // Exit "Add Text" mode
    };

    // Function to handle editing text
    const handleEditText = (index) => {
        setEditingIndex(index);
    };

    // Function to handle text change
    const handleTextChange = (e, index) => {
        const newTextEntries = [...textEntries];
        newTextEntries[index].content = e.target.value;
        setTextEntries(newTextEntries);
    };

    // Function to handle dragging text
    const handleDragStart = (index, e) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleDrop = (e) => {
        const index = e.dataTransfer.getData('text/plain');
        const newTextEntries = [...textEntries];
        const draggedEntry = newTextEntries[index];

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // Get new x position
        const y = e.clientY - rect.top; // Get new y position

        // Update the position of the dragged text entry
        draggedEntry.position = { x, y };
        setTextEntries(newTextEntries);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Templat Sijil
                </h2>
            }
        >
 <Head title="Edit Certificate Template" />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}

                {/* Main Content Area */}
                <div className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md border border-gray-200 p-8">
                        {!pagesGenerated ? (
                            <form onSubmit={handleGeneratePages} className="flex flex-col">
                                <div className="mt-4">
                                    <label htmlFor="numberOfPages" className="block text-sm font-medium text-gray-700">Jumlah Halaman</label>
                                    <input
                                        type="number"
                                        id="numberOfPages"
                                        value={data.numberOfPages}
                                        onChange={(e) => setData('numberOfPages', e.target.value)}
                                        min="1"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                        Hasilkan Halaman
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nama Templat</label>
                                    <input
                                        type="text"
                                        value={template.name} // Display the template's name
                                        readOnly // Make it read-only
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 bg-gray-100"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Warna Templat</label>
                                    <input
                                        type="color"
                                        id="color"
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="textColor" className="block text-sm font-medium text-gray-700">Warna Teks</label>
                                    <input
                                        type="color"
                                        id="textColor"
                                        value={data.textColor}
                                        onChange={(e) => setData('textColor', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Format Teks</label>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.isBold}
                                            onChange={(e) => setData('isBold', e.target.checked)}
                                        />
                                        <span className="ml-2">Bold</span>
                                        <input
                                            type="checkbox"
                                            checked={data.isItalic}
                                            onChange={(e) => setData('isItalic', e.target.checked)}
                                            className="ml-4"
                                        />
                                        <span className="ml-2">Italic</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700">Font</label>
                                    <select
                                        id="fontFamily"
                                        value={data.fontFamily}
                                        onChange={(e) => setData('fontFamily', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    >
                                        <option value="Arial">Arial</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        <option value="Verdana">Verdana</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">Font Size</label>
                                    <input
                                        type="number"
                                        id="fontSize"
                                        value={parseInt(data .fontSize)} // Convert to integer for input
                                        onChange={(e) => setData('fontSize', e.target.value + 'px')}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="mt-4">
                                    <button type="button" onClick={() => setIsAddingText(true)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                                        Tambah Teks
                                    </button>
                                </div>
                                <div className="mt-6">
                                    <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* File Preview Section */}
                <div className="relative w-1/4 p-4 bg-white border-l border-gray-200">
                    <h3 className="text-lg font-semibold">Preview Templat</h3>
                    {pagesGenerated && (
                        <div className="relative border p-4" style={{ backgroundColor: data.color }} onClick={handlePreviewClick} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                            {template.file_path && (
                                template.file_path.endsWith('.pdf') ? (
                                    <iframe
                                        src={`/storage/${template.file_path}`} // Ensure this is correct
                                        className="w-full h-96 border"
                                        title="Template Preview"
                                    />
                                ) : (
                                    <img
                                        src={`/storage/${template.file_path}`} // Ensure this is correct
                                        alt="Template Preview"
                                        className="w-full h-auto"
                                    />
                                )
                            )}
                            {/* Render multiple pages based on user input */}
                            {Array.from({ length: data.numberOfPages }).map((_, pageIndex) => (
                                <div key={pageIndex} className="page-preview" style={{ marginBottom: '20px' }}>
                                    {textEntries.map((entry, index) => (
                                        <div 
                                            key={index} 
                                            className="absolute" 
                                            style={{ 
                                                top: entry.position.y, 
                                                left: entry.position.x, 
                                                transform: 'translate(-50%, -50%)', 
                                                fontSize: entry.fontSize, 
                                                fontWeight: entry.isBold ? 'bold' : 'normal', 
                                                fontStyle: entry.isItalic ? 'italic' : 'normal', 
                                                color: entry.textColor, // Use the selected text color
                                                fontFamily: entry.fontFamily 
                                            }} 
                                            onDoubleClick={() => handleEditText(index)} 
                                            draggable 
                                            onDragStart={(e) => handleDragStart(index, e)}
                                        >
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    value={entry.content}
                                                    onChange={(e) => handleTextChange(e, index)}
                                                    onBlur={() => setEditingIndex(null)} // Exit edit mode on blur
                                                    className="border border-gray-300 rounded-md"
                                                />
                                            ) : (
                                                entry.content
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}