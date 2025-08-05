import { mockSupplierApi, type SupplierResponse } from "../api/mockSupplierApi";
import { useState, useEffect } from "react";
import { z } from "zod";



const ValidationSchema = z.object({
  source: z.string(),
  value: z.coerce.number(),
  currency: z.string().regex(/^[a-zA-Z]+$/, "Unknown currency code"),
});

type ValidatedSchema = z.infer<typeof ValidationSchema>[];

const validateData = async (data: SupplierResponse[])=> {
  return Promise.all(data.map((item) => {
    const value = 'value' in item ? item.value : 'price' in item ? item.price : 'amount_cents' in item ? item.amount_cents/100 : undefined;
    const currency = 'currency' in item ? item.currency : 'currency_code' in item ? item.currency_code : "USD";
    return ValidationSchema.parseAsync({
      source: item.source,
      value,
      currency,
    });
  }));
};

export default function useProducts() {
  const [supplierResponse, setSupplierResponse] = useState<
    ValidatedSchema | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSupplierResponse = async () => {
      try {
        const response = await mockSupplierApi();
        const validatedData = await validateData(response);
        setSupplierResponse(validatedData);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          setLoading(false);
        } else {
          setError("Something went wrong");
          setLoading(false);
        }
      }
    };
    fetchSupplierResponse();
  }, []);

  return { supplierResponse, loading, error };
}
