import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { Lock, EyeOff, Eye } from "lucide-react";

export default function StudentLogin() {
  const { data, setData, post, processing, errors, reset } = useForm({
    ic_number: "",
  });

  const [error, setError] = useState("");
  const [showIC, setShowIC] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset any existing errors

    // Frontend validation for IC number format
    const icPattern = /^\d{6}-\d{2}-\d{4}$/; // Example format: 000000-00-0000
    if (!data.ic_number) {
      setError("Kad Pengenalan diperlukan.");
      return;
    }

    if (!icPattern.test(data.ic_number)) {
      setError("Format Kad Pengenalan tidak sah.");
      return;
    }

    // Submit login and redirect
    post(route("student.login"), {
      onSuccess: () => {
        // Redirect to dashboard after successful login
        Inertia.visit(route("student.dashboard"));
      },
      onError: (backendErrors) => {
        // Display backend error messages if login fails
        if (backendErrors.ic_number) {
          setError("Kad Pengenalan tidak sah.");
        }
      },
      onFinish: () => reset("ic_number"),
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <Head title="TVPSS | Login Pelajar" />
      <div className="w-full max-w-xl bg-[#f8f9fa] border shadow rounded-3xl">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-center mb-8">
              <img
                src="/assets/TVPSSLogo.jpg"
                alt="TVPSS Logo"
                className="h-20 w-auto"
              />
            </div>

            <h1 className="text-center text-4xl font-bold mb-3">Log Masuk</h1>

            <div className="text-center text-gray-400 text-sm mb-2">
              Sila masukkan Kad Pengenalan untuk log masuk!
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* IC Number Input */}
              <div>
                <label htmlFor="ic_number" className="block text-gray-700 font-medium mb-2">
                  Kad Pengenalan
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    id="ic_number"
                    
                    name="ic_number"
                    value={data.ic_number}
                    placeholder="000000-00-0000"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData({ ...data, ic_number: e.target.value })}
                  />
                  <button
                    type="button"
                    
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#4158A6] font-bold text-white shadow rounded-2xl hover:bg-[#3C4565] focus:ring focus:ring-blue-500"
                  disabled={processing}
                >
                  {processing ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    "Log Masuk"
                  )}
                </button>
                <div className="mt-5 text-center">
                  <Link href="/dashboard" className="text-md text-[#4158A6] hover:underline">
                    Kembali
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
