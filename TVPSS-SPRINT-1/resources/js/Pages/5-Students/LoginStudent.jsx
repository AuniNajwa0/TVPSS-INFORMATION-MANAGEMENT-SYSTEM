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

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset any existing errors

    // Validate email
    if (!data.email) {
      setError("Email is required.");
      return;
    }

    if (!data.email.endsWith("@moe.gov.my")) {
      setError("Email must end with @moe.gov.my.");
      return;
    }

    // Validate IC-based password
    if (!data.password) {
      setError("IC number is required as password.");
      return;
    }

    // Check if email and IC password match a predefined user
    const user = users.find(u => u.email === data.email && u.password === data.password);
    if (!user) {
      setError("Invalid email or IC number.");
      return;
    }

    // Redirect to dashboard after successful login based on user role
    post(route("login"), {
      onSuccess: () => {
        Inertia.visit(route("dashboard")); // Redirect to the dashboard
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
                <InputLabel htmlFor="password" value="IC Number (Password)" />
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
