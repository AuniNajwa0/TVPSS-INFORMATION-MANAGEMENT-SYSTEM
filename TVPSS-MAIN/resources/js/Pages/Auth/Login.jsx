import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; // Ensure these icons are imported

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset any existing errors

    // Frontend validation
    if (!data.email) {
      setError("Email diperlukan");
      return;
    }

    if (!data.email.endsWith("@moe.gov.my")) {
      setError("Format email mesti @moe.gov.my.");
      return;
    }

    if (!data.password) {
      setError("Kata Laluan diperlukan.");
      return;
    }

    // Redirect to Dashboard.jsp after successful login
    post(route("login"), {
      onSuccess: () => {
        // Redirect to dashboard after successful login
        Inertia.visit(route("dashboard"));
      },
      onError: (backendErrors) => {
        // Display backend error messages if login fails
        if (backendErrors.email || backendErrors.password) {
          setError("Kata laluan atau email tidak sah.");
        }
      },
      onFinish: () => reset("password"),
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <Head title="TVPSS | Login Pentadbir" />
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
              Sila masukkan maklumat untuk log masuk!
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
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    placeholder="pentadbir@moe.edu.my"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Kata Laluan
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    placeholder="Masukkan Kata Laluan"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="current-password"
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
  {/* Remember Me Checkbox */}
  <label className="flex items-center text-sm">
    <input
      type="checkbox"
      name="remember"
      checked={data.remember}
      className="mr-2 border rounded"
      onChange={(e) => setData({ ...data, remember: e.target.checked })}
    />
    <span className="text-gray-700">Ingat Saya</span>
  </label>

  {/* Lupa Email Link */}
  <Link
    href="/forgot-email"
    className="text-sm text-[#4158A6] hover:underline"
  >
    Lupa Email?
  </Link>
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
                  <Link
                    href="/dashboard"
                    className="text-md text-[#4158A6] hover:underline"
                  >
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
