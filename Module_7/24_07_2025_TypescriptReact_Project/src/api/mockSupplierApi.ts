export type SupplierResponse =
  | {
      source: 'supplierA';
      amount_cents: number;
      currency_code: 'USD' | 'EUR';
    }
  | {
      source: 'supplierB';
      price: string; // USD assumed
    }
  | {
      source: 'supplierC';
      value: number;
      currency: 'AUD' | 'USD';
    };
// Helper to generate one record
const generateSingleSupplierResponse = (): SupplierResponse => {
  const suppliers: SupplierResponse[] = [
    {
      source: 'supplierA',
      amount_cents: Math.floor(Math.random() * 100000), // $0 - $1000
      currency_code: Math.random() > 0.5 ? 'USD' : 'EUR',
    },
    {
      source: 'supplierB',
      price: (Math.random() * 1000).toFixed(2),
    },
    {
      source: 'supplierC',
      value: parseFloat((Math.random() * 1000).toFixed(2)),
      currency: Math.random() > 0.5 ? 'AUD' : 'USD',
    },
  ];
  // Pick one randomly
  return suppliers[Math.floor(Math.random() * suppliers.length)];
};
// Main function
export const mockSupplierApi = async (): Promise<SupplierResponse[]> => {
  await new Promise((r) => setTimeout(r, 800)); // simulate API delay
  return Array.from({ length: 10 }, generateSingleSupplierResponse);
};
