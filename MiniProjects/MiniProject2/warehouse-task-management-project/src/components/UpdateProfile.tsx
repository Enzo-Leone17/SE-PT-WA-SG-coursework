import z from "zod";
import DynamicForm from "./common/CustomForm";
import { type FieldConfig } from "./common/CustomForm";
import React from "react";

//zod schema
const userSchema = z.object({
  // username: z
  //   .string()
  //   .min(1, "username is required")
  //   .min(2, "username must be at least 2 characters"),
  // email: z.email({
  //   error: "Invalid email address",
  //   pattern: z.regexes.unicodeEmail,
  // }),
  full_name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .optional(),
  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Invalid international phone number (use +country code) e.g. +6512345678"
    )
    .optional()
    .or(z.literal("")), //handle empty string
  has_forklift_license: z.boolean().optional(),
  has_punched_in: z.boolean().optional(),
});

export type UpdatedUserProfile = z.infer<typeof userSchema>;

interface UpdateProfileProps {
  onSubmit: (data: z.infer<typeof userSchema>) => void;
  userData: {
    user: {
      // username: string;
      // email: string;
      role: "staff" | "manager";
    };
    data: {
      phone: string;
      full_name: string;
      has_forklift_license?: boolean;
      has_punched_in?: boolean;
    };
  } | null;
}


const UpdateProfile: React.FC<UpdateProfileProps> = ({
  onSubmit,
  userData,
}) => {
  // Define form fields
  const fields: FieldConfig[] = [
    // {
    //   type: "text",
    //   name: "username",
    //   label: "username",
    //   placeholder: userData?.user.username,
    //   required: true,
    // },
    // {
    //   type: "email",
    //   name: "email",
    //   label: "Email Address",
    //   placeholder: userData?.user.email,
    //   required: true,
    // },
    {
      type: "text",
      name: "full_name",
      label: "Full Name",
      placeholder: userData?.data.full_name,
      defaultValue: userData?.data.full_name,
      required: true,
    },
    {
      type: "tel",
      name: "phone",
      label: "Phone Number",
      placeholder: userData?.data.phone,
      defaultValue: userData?.data.phone,
      required: true,
      minLength: 11,
    },
  ];

  if (userData?.user.role === "staff") {
    fields.push(
      {
        type: "checkbox",
        name: "has_forklift_license",
        label: "Forklift License Available",
      },
      {
        type: "checkbox",
        name: "has_punched_in",
        label: "Punched In",
      }
    );
  }

  const handleSubmit = (data: z.infer<typeof userSchema>) => {
    console.log("Form submitted:", data);
    onSubmit(data);
  };

  return (
    <div className="min-h-screen min-w-full bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Profile details
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <DynamicForm
            fields={fields}
            schema={userSchema}
            onSubmit={handleSubmit}
            submitLabel="Update"
            className="w-full max-w-none text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
