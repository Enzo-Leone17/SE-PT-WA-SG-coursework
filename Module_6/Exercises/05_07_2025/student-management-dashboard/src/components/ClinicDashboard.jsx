import { useEffect, useState } from "react";
import FilterBar from "./common/FilterBar";
import DoctorTable from "./DoctorTable";
import Loading from "./common/Loading";
import Pagination from "./Pagination";
import FormSubmit from "./FormSubmit";
import axios from "axios";

//  https://mocki.io/v1/088a8c05-fd3e-47f2-a09c-7d1495b1015e

export default function ClinicDashboard() {
  const [filteredSpecialty, setFilteredSpecialty] = useState("All");
  const [specialtyList, setSpecialtyList] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); //Handling loading state while fetching data
  const [error, setError] = useState(null); // Handling error state => store data from API call
  const clinicAPI = "http://localhost:8000/api/clinic/doctors";
  // This hook will allways run when the component mounts (before the first render)
  useEffect(() => {
    initializeDoctorData();
    fetchUniqueSpecialties();
  }, []);

  const initializeDoctorData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(`${clinicAPI}`);
      if (response.status == 200 && response.data) {
        console.log("Doctor data fetched from clinic API:", response.data);
        setDoctorData(response.data.doctors);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.page);
        setLoading(false); // Set loading to false after data is fetched
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error fetching data from clinic API:", error);
    }
  };

  const fetchDoctorData = async (filterQueries = "") => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(`${clinicAPI}?${filterQueries}`);
      if (response.status == 200 && response.data) {
        console.log("Doctor data fetched from clinic API:", response.data);
        setDoctorData(response.data.doctors);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.page);
        setLoading(false); // Set loading to false after data is fetched
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error fetching data from clinic API:", error);
    }
  };

  const fetchUniqueSpecialties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${clinicAPI}/specialties/listUnique`);
      if (response.status == 200 && response.data) {
        setSpecialtyList(response.data);
        console.log("Specialties fetched from clinic API:", response.data);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching specialties from clinic API:", error);
    }
  };

  const specialtyOptions = ["All", ...specialtyList]; // Make a new array, combining All option and the unique classes from students

  //event handlers

  const handleSpecialtyFilter = (specialty) => {
    if (specialty === "All") {
      fetchDoctorData();
      setFilteredSpecialty(specialty);
    } else {
      fetchDoctorData(`specialty=${specialty}`);
      setFilteredSpecialty(specialty);
    }
  };

  const handlePageChange = async (newPage) => {
    if (newPage !== currentPage) {
      await fetchDoctorData(`page=${newPage}`);
      setCurrentPage(newPage);
    }
  };

  const handleFormSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await axios.post(`${clinicAPI.replace("doctors", "patients")}/`, data);
       console.log('Response from server:', response);
       if(response && response.status === 200) {
         console.log('Patient added successfully', response.data);
         setLoading(false);
       }
    } catch (error) {
      console.error('Error adding patient:', error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error fetching data: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="grid gap-4">
          <div className="bg-white rounded shadow p-4">
            <FilterBar
              filterName="Specialty"
              selectedClass={filteredSpecialty}
              availableClasses={specialtyOptions}
              onChangeClass={handleSpecialtyFilter}
            />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <DoctorTable doctors={doctorData} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <FormSubmit setFormData={handleFormSubmit}/>
    </div>
  );
}
