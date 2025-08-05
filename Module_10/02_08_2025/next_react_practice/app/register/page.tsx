'use client';

import { useRouter } from 'next/navigation';
import Register from "../components/Register";
import React from "react";
import axios from "axios";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";




interface RegisterData {
    name: string;
    email: string;
}

export default function RegisterPage() {
    const router = useRouter();
  const [userData, setUserData] = React.useState<RegisterData | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/register", data);
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        setError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  if(isLoading) return <Loading />
  if(!isLoading && userData) {
    return (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        >
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">Registration successful.</span>
          <div className="flex flex-col gap-4">
            <span className="block sm:inline">Name: {userData?.name || "N/A"}</span>
            <span className="block sm:inline">Email: {userData?.email || "N/a"}</span>
          </div>
          <button
            className="absolute top-2 right-2 text-sm font-semibold text-green-900 bg-transparent border border-green-900 hover:bg-green-900 hover:text-white py-1 px-2 rounded"
            onClick={() => {
                router.push("/");
            }}> Back </button>
        </div>
      );
  }
  if(error) {
    setTimeout(() => {
        router.push("/");
    }, 3000);
  }
  return <Register onSubmit={onSubmit} />;
}
