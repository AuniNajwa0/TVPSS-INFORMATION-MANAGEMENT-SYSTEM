import { Head } from "@inertiajs/react";
import { CheckCircle, ChevronLeft, ChevronRight, Edit, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/assets/login1.jpg",
    "/assets/equipmentPic.jpg",  // Replace with your actual image path
    "/assets/imageMain.png"   // Replace with your actual image path
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Head title="TVPSS | Pelajar" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TV PUSAT SUMBER SEKOLAH
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sertai kami dalam menghasilkan kandungan berita yang menarik dan kreatif. 
              Peluang untuk belajar, berkarya, dan berkongsi cerita di platform sekolah. 
              Mohon sekarang dan jadilah sebahagian daripada pasukan!
            </p>
            <button 
              onClick={() => window.location.href = '/applyCrew'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold 
                        hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 
                        shadow-lg hover:shadow-xl"
            >
              Mohon Sekarang
            </button>
          </div>

          {/* Image Carousel */}
          <div className="flex-1 relative">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-all duration-500 ease-in-out transform 
                    ${index === currentImage ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                >
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full 
                          hover:bg-white transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full 
                          hover:bg-white transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
              {/* Dots indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${index === currentImage ? 'bg-white w-4' : 'bg-white/60'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 py-16 mt-16 rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Cara Memohon Krew</h2>
            <p className="text-lg text-gray-600">
              Permohonan boleh dilakukan di mana-mana sahaja melalui peranti mudah alih dan hanya mengambil masa 5 minit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Edit className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Langkah : 1</h3>
              <p className="text-gray-600">
                Masukkan nama pengguna dan kata laluan anda untuk mengakses sistem.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Langkah : 2</h3>
              <p className="text-gray-600">
                Lengkapkan borang permohonan dengan maklumat yang diperlukan. Pastikan semua butiran adalah tepat sebelum menghantar.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Langkah : 3</h3>
              <p className="text-gray-600">
                Setelah menghantar permohonan, tunggu keputusan yang akan dimaklumkan melalui e-mel atau sistem notifikasi.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => window.location.href = '/applyCrew'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold 
                        hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 
                        shadow-lg hover:shadow-xl"
            >
              Mohon Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
