import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function studentLogin({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset any existing errors

    // Frontend validation
    if (!data.email) {
      setError("Email diperlukan");
      return;
    }

    if (!data.email.endsWith("@moe.edu.my")) {
      setError("Format email mesti @moe.edu.my.");
      return;
    }

    if (!data.password) {
      setError("Kata Laluan diperlukan.");
      return;
    }

    // Navigate based on user role
    // switch (user.role) {
    //   case "SuperAdmin":
    //     navigate("/Dashboard");
    //     break;
    //   case "AdminState":
    //     navigate("/Dashboard");
    //     break;
    //   case "AdminPPD":
    //     navigate("/Dashboard");
    //     break;
    //   case "AdminSchool":
    //     navigate("/Dashboard");
    //     break;
    //   default:
    //     setError("Invalid role");
    //     return;
    // }

    // // Submit login and redirect
    // post(route(routeName), {
    //   onFinish: () => reset("password"),
    // });

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
    <div className="flex h-screen relative">

      <div className="w-2/3 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
      <img 
    src="/assets/login1.jpg" 
    alt="Login SVG 1" 
    className="absolute inset-0 h-full w-full object-cover"/>
      </div>
      <div className="w-1/3 flex items-center justify-center relative">
        <div className="bg-white p-10 rounded-xl shadow-2xl border border-gray-200 w-full max-w-md">
          {error && <div className="mb-4 text-sm font-medium text-red-600">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <div className="flex justify-left mb-8">
                <img src="/assets/LogoTVPSS.svg" alt="Login SVG" className="h-24" />
              </div>
              <label htmlFor="email" className="block text-black-700 font-semibold mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full border rounded-lg px-3 py-3 shadow-md focus:ring-2 focus:ring-blue-300"
                autoComplete="username"
                autoFocus
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-black-700 font-semibold mb-1">
                Kad Pengenalan
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full border rounded-lg px-3 py-3 shadow-md focus:ring-2 focus:ring-blue-300"
                autoComplete="current-password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between mb-6">
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
              <Link
                href={route("password.request")}
                className="text-sm text-blue-600 underline hover:text-blue-800"
              >
                Lupa Kata Laluan
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg bg-[#455185] text-white rounded-lg hover:bg-[#3C4565] flex justify-center"
              disabled={processing}
            >
              Log Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
