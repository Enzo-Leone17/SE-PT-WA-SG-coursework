export default function DoctorTable({ doctors }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Specialty</th>
            <th className="text-left p-2">Phone</th>
            <th className="text-left p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="p-2">{doctor.id}</td>
              <td className="p-2">{doctor.name}</td>
              <td className="p-2">{doctor.specialty}</td>
              <td className="p-2">{doctor.phone}</td>
              <td className="p-2">{doctor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
