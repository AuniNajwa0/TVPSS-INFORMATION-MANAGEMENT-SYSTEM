import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm } from "@inertiajs/react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");

  // Predefined users
  const users = [
    {
      role: "AdminPPD",
      email: "adminppd@moe.gov.my",
      password: "Admin@123",
    },
    {
      role: "AdminSchool",
      email: "adminschool@moe.gov.my",
      password: "AdminSchool@123",
    },
    {
      role: "AdminState",
      email: "adminstate@moe.gov.my",
      password: "AdminState@123",
    },
    {
      role: "SuperAdmin",
      email: "superadmin@moe.gov.my",
      password: "SuperAdmin@123",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset any existing errors

    // Validate email
    if (!data.email) {
      setError("Email diperlukan.");
      return;
    }

    if (!data.email.endsWith("@moe.gov.my")) {
      setError("Format email mesti @moe.gov.my.");
      return;
    }

    // Validate password
    if (!data.password) {
      setError("Kata Laluan diperlukan.");
      return;
    }

    // Check if email and password match a user
    const user = users.find(u => u.email === data.email && u.password === data.password);
    if (!user) {
        setError("Kata laluan atau email tidak sah.");
        return;
    }

    if (!user) {
      setError("Kata laluan atau email tidak sah.");
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
          Inertia.visit(route("dashboard"));
      },
      onFinish: () => reset("password"),
  });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      <MDBContainer fluid className="p-3 my-5">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            {status && (
              <div className="mb-4 text-sm font-medium text-green-600">
                {status}
              </div>
            )}

            {error && <div className="mb-4 text-sm font-medium text-red-600">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  autoComplete="username"
                  isFocused={true}
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div className="mb-4">
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  autoComplete="current-password"
                  onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className="d-flex justify-content-between mx-4 mb-4">
                <label className="flex items-center">
                  <Checkbox
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData("remember", e.target.checked)}
                  />
                  <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </span>
                </label>
                {canResetPassword && (
                  <Link
                    href={route("password.request")}
                    className="text-sm text-gray-600 underline hover:text-gray-900"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>

              <PrimaryButton
                type="submit"
                className="mb-4 w-100"
                disabled={processing}
              >
                Log in
              </PrimaryButton>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </GuestLayout>
  );
}
