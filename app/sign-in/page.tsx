"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdClose } from "react-icons/md";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/");
    } else if (res?.status === 401) {
      setErrorMessage("Invalid credentials");
      setPending(false);
    } else {
      setErrorMessage("Something went wrong");
    }
  };

  const handleCloseAlert = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <section className="flex flex-col gap-4 justify-center items-center h-screen bg-base-100 text-base-content">
      {successMessage && (
        <div role="alert" className="alert alert-success max-w-md w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
            <button onClick={handleCloseAlert} className="ml-4">
              <MdClose className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div role="alert" className="alert alert-error max-w-md w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
            <button onClick={handleCloseAlert} className="ml-4">
              <MdClose className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      <h1 className="text-4xl">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 text-base-content"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            disabled={pending}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="password"
            disabled={pending}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button className="btn btn-wide" disabled={pending}>
          {pending ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            "Continue"
          )}
        </button>
      </form>

      <div className="flex gap-4">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
          <FcGoogle />
        </button>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
          <FaGithub />
        </button>
      </div>

      <p>
        Create new account{" "}
        <Link href="/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default page;
