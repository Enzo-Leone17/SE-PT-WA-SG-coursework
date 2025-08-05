import z from "zod";
import DynamicForm from "./common/CustomForm";
import { type FieldConfig } from "./common/CustomForm";
import React from "react";

const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
})


const fields: FieldConfig[] = [
    {
        type: "text",
        name: "name",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
    },
    {
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        required: true,
    },
    {
        type: "password",
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
    },
];


interface RegisterProps {
  onSubmit: (data: z.infer<typeof registerSchema>) => void;
}

const Register: React.FC<RegisterProps> = ({ onSubmit }) => {
      const handleSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log("Form submitted:", data);
    onSubmit(data);
  };
  return (
    <div className="min-h-screen min-w-full bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Registration Form
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <DynamicForm
            fields={fields}
            schema={registerSchema}
            onSubmit={handleSubmit}
            submitLabel="Register"
            className="w-full max-w-none text-black"
          />
        </div>
      </div>
    </div>
  )
};

export default Register;