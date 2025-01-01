import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from "react-icons/fa";

export default function ApplyCrew({ student }) {
    const { data, setData, post, processing, errors, reset } = useForm({
      jawatan: "", // Only the jawatan is required
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      post(route("student.applyCrewSubmit"), {
        data: {
          ic_num: student.ic_num, // Pass the IC number from the student data
          jawatan: data.jawatan, // Pass the selected jawatan
        },
      });
    };
    const styles = {
        page: { 
          backgroundColor: "#ebf8ff", 
          minHeight: "100vh", 
          padding: "20px" },
        formContainer: {
            maxWidth: "600px",
            margin: "20px auto",
            padding: "30px",
            backgroundColor: "#fff",
            borderRadius: "15px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
        },
        formHeader: { textAlign: "center", marginBottom: "35px" },
        formTitle: { fontSize: "28px", fontWeight: "bold", color: "#2d3748" },
        formSubtitle: { color: "#718096", fontSize: "16px", lineHeight: "1.5" },
        formGroup: { position: "relative", marginBottom: "20px" },
        iconContainer: {
            position: "absolute",
            left: "12px",
            color: "#4158A6",
            height: "100%",
            display: "flex",
            alignItems: "center",
        },
        input: {
            width: "100%",
            padding: "12px 12px 12px 45px",
            fontSize: "16px",
            border: "2px solid #e2e8f0",
            borderRadius: "8px",
            backgroundColor: "#f8fafc",
            color: "#2d3748",
        },
        sectionTitle: {
            fontSize: "18px",
            fontWeight: "600",
            color: "#2d3748",
            marginTop: "30px",
            marginBottom: "20px",
            paddingBottom: "8px",
            borderBottom: "2px solid #e2e8f0",
        },
        button: {
            backgroundColor: "#4158A6",
            color: "#fff",
            padding: "14px 28px",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginTop: "30px",
        },
        modal: {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: isModalVisible ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
        },
        modalContent: {
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
        },
        checkIcon: { color: "#28a745", fontSize: "50px", marginBottom: "20px" },
        okButton: {
            backgroundColor: "#4158A6",
            color: "#fff",
            padding: "12px 24px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px",
        },
    };
  
    return (
      <div className="min-h-screen bg-white flex">
        {/* Left Column - Image */}
        <div className="hidden lg:flex w-[100%] bg-[#4158A6] items-center justify-center">
          <img
            src="/assets/login1.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Right Column - Apply Crew Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 relative bg-gradient-to-b from-gray-50 to-white">
          {/* Back Button */}
          <Link
            href="/"
            className="absolute top-8 left-8 p-3 rounded-full hover:bg-white/80 transition-all duration-200 flex items-center justify-center group"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
          </Link>
  
          <div className="w-full max-w-md relative">
            <div className="bg-white/80 backdrop-blur-sm px-8 py-12 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex flex-col items-center mb-10">
                <div className="relative">
                  <div className="absolute -inset-4 bg-white rounded-full blur-lg opacity-30" />
                  <img
                    src="/assets/TVPSSLogo2.jpg"
                    alt="TVPSS Logo"
                    className="h-24 w-auto relative"
                  />
                </div>
                <h1 className="text-3xl font-bold bg-[#4158A6] bg-clip-text text-transparent mt-8 mb-2">
                  Permohonan Krew
                </h1>
                <p className="text-gray-600 text-sm mb-2">
                  Sila pilih jawatan yang ingin anda mohon.
                </p>
              </div>
  
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Display Student Data */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Nama</p>
                  <p className="bg-gray-100 py-3 px-4 rounded-xl">{student.name}</p>
  
                  <p className="text-sm font-medium text-gray-700">IC No</p>
                  <p className="bg-gray-100 py-3 px-4 rounded-xl">{student.ic_num}</p>
  
                  <p className="text-sm font-medium text-gray-700">Sekolah</p>
                  <p className="bg-gray-100 py-3 px-4 rounded-xl">{student.schoolName}</p>
  
                  <p className="text-sm font-medium text-gray-700">Negeri</p>
                  <p className="bg-gray-100 py-3 px-4 rounded-xl">{student.state}</p>
                </div>
  
                {/* Jawatan Selection */}
                <div className="space-y-2">
                  <label htmlFor="jawatan" className="block text-sm font-medium text-gray-700">
                    Pilih Jawatan
                  </label>
                  <select
                    id="jawatan"
                    name="jawatan"
                    value={data.jawatan}
                    onChange={(e) => setData("jawatan", e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Pilih Jawatan</option>
                    <option value="Ketua Krew">Ketua Krew</option>
                    <option value="Ahli Krew">Ahli Krew</option>
                    {/* Add more jawatan options here */}
                  </select>
                </div>
  
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#4158A6] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={processing}
                >
                  {processing ? (
                    <svg
                      className="animate-spin h-5 w-5 mx-auto text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Hantar Permohonan"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  