import { useForm } from "react-hook-form";

import "./App.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters" }) //required min 2 char
    .regex(/^[A-Za-z\s'-]+$/, "Name contains invalid characters"), //filter out numbers and special chars, allow spaces, hyphens and apostrophes
  email: z.email({ pattern: z.regexes.unicodeEmail }), //required
  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Invalid international phone number (use +country code) e.g. +6512345678"
    )
    .optional() //optional
    .or(z.literal("")), //handle empty string
  dob: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  attendInPerson: z.boolean(),
});

type SchemaProps = z.infer<typeof validationSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaProps>({
    resolver: zodResolver(validationSchema),
  });

  function submitForm() {
    console.log("submitted successfully");
  }

  return (
    <form className="form" onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="">Name</label>
        {errors?.name && <span>{": Error! " + errors.name.message}</span>}
      </div>
      <input type="text" {...register("name")} />

      <div>
        <label htmlFor="">Email</label>
        {errors?.email && <span>{": Error! " + errors.email.message}</span>}
      </div>
      <input type="email" {...register("email")} />

      <div>
        <label htmlFor="">Phone Number</label>
        {errors?.phone && <span>{": Error! " + errors.phone.message}</span>}
      </div>
      <input type="string" placeholder="+6512345678" {...register("phone")} />

      <div>
        <label htmlFor="">Date of Birth</label>
        {errors?.dob && <span>{": Error! " + errors.dob.message}</span>}
      </div>
      <input type="date" {...register("dob")} />

      <div>
        <label htmlFor="">Attend In Person</label>
        {errors?.attendInPerson && (
          <span>{": Error! " + errors.attendInPerson.message}</span>
        )}
      </div>
      <input type="checkbox" {...register("attendInPerson")} />

      <div>
        <button type="submit" className="button">
          Submit
        </button>
      </div>
    </form>
  );
};

function App() {
  return (
    <>
      <div className="container">
        <h1>Registration form</h1>
        <Form />
      </div>
    </>
  );
}

export default App;
