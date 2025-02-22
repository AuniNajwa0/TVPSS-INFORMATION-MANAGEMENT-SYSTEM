import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ArrowRight, Play, Users, BookOpen, Award } from 'lucide-react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const slides = [
        '/assets/tvpss-pic-1.jpeg',
        'https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2FBigbigStudioEnterprise%2Fimages%2Fblog%2F66b0886594b1e.png&w=3840&q=75',
        'https://www.youtube.com/watch?v=DKtVLq8t3Aw&pp=ygUFdHZwc3M%3D',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        setIsVisible(true);
        return () => clearInterval(interval);
    }, [slides.length]);

    const features = [
        {
            icon: <Play className="w-12 h-12 text-blue-600" />,
            title: "Streaming Berkualiti",
            description: "Akses kepada kandungan pendidikan yang berkualiti tinggi"
        },
        {
            icon: <Users className="w-12 h-12 text-blue-600" />,
            title: "Komuniti Pendidikan",
            description: "Hubungkan dengan guru dan pelajar di seluruh Malaysia"
        },
        {
            icon: <BookOpen className="w-12 h-12 text-blue-600" />,
            title: "Sumber Pembelajaran",
            description: "Pelbagai bahan pembelajaran interaktif"
        },
        {
            icon: <Award className="w-12 h-12 text-blue-600" />,
            title: "Pencapaian Pelajar",
            description: "Showcase bakat dan kejayaan pelajar"
        }
    ];

    const steps = [
        {
            number: "1",
            title: "Log Masuk",
            description: "Daftar akaun atau log masuk jika anda telah mempunyai akaun"
        },
        {
            number: "2",
            title: "Isi Maklumat",
            description: "Lengkapkan profil dengan maklumat sekolah dan peribadi"
        },
        {
            number: "3",
            title: "Mula Menggunakan",
            description: "Akses semua kandungan dan mula berkongsi bakat!"
        }
    ];

    return (
        <>
            <Head title="TV Pusat Sumber Sekolah" />
            <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white">
                {/* Header */}
                <header className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/assets/KPM_Logo.png"
                                alt="KPM Logo"
                                className="h-12 w-auto"
                            />
                            <img
                                src="/assets/tvpsslogo.svg"
                                alt="TVPSS Logo"
                                className="h-12 w-auto"
                            />
                        </div>
                        <nav className="flex items-center space-x-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-blue-600 hover:text-blue-800 font-semibold"
                                    >
                                        Log Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
                                TV Pusat Sumber Sekolah
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">
                                Sertai kami dalam mengayakan kandungan media yang menarik dan kreatif. 
                                Platform untuk kongsi, Geharga, dan berkongsi cerita di platform sekolah!
                            </p>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                            >
                                Mula Sekarang
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                            {slides[currentSlide].endsWith('.mp4') ? (
                                <video
                                    src={slides[currentSlide]}
                                    autoPlay
                                    muted
                                    loop
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src={slides[currentSlide]}
                                    alt="TVPSS Showcase"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
                            Kenapa Pilih TVPSS?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                                >
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Registration Steps */}
                <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
                            3 Langkah Sahaja
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {steps.map((step, index) => (
                                <div 
                                    key={index}
                                    className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                                >
                                    <div className="absolute -top-4 left-6 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue-900 mt-4 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-blue-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="mt-2 text-sm text-blue-200">
                            © 2024 TV Pusat Sumber Sekolah. Hak Cipta Terpelihara.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
