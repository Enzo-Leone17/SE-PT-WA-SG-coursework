import { useEffect, useState } from 'react';
import FilterBar from './common/FilterBar';
import StudentTable from './StudentTable';
import StudentCard from './StudentCard';
import Loading from './common/Loading';
import axios from 'axios';

//  https://mocki.io/v1/088a8c05-fd3e-47f2-a09c-7d1495b1015e

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [filteredClass, setFilteredClass] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [viewType, setViewType] = useState('table');
  const [loading, setLoading] = useState(true); // Handling loading state while fetching data
  const [error, setError] = useState(null); // Handling error state => store data from API call


  // This hook will allways run when the component mounts (before the first render)
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get('https://mocki.io/v1/088a8c05-fd3e-47f2-a09c-7d1495b1015e');
      if (response.status == 200 && response.data) {
        console.log('Data fetched from API:', response);
        setStudents(response.data);
        setLoading(false); // Set loading to false after data is fetched
      }      
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error('Error fetching data from API:', error);
    }
  }

  

  const classes = ['All', ...new Set(students.map(s => s.class))];   // Make a new array, combining ALl option and the unique classes from students

  const filteredStudents = students
    .filter(s => filteredClass === 'All' || s.class === filteredClass)
    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const sortedStudents = [...filteredStudents]
    .sort((a, b) => {
      if (sortBy === 'age') return a.age - b.age;
      if (sortBy === 'math') return b.grades.math - a.grades.math;
      if (sortBy === 'science') return b.grades.science - a.grades.science;
      return 0;
    });

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    if (selectedStudent?.id === id) setSelectedStudent(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error fetching data: {error.message}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="grid gap-4">
          <div className="bg-white rounded shadow p-4">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full p-2 border rounded mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              className="mb-4 p-2 border rounded"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="age">Age</option>
              <option value="math">Math Grade</option>
              <option value="science">Science Grade</option>
            </select>
            <FilterBar
              filterName="Class"
              selectedClass={filteredClass}
              availableClasses={classes}
              onChangeClass={setFilteredClass}
            />

            <button
              className="mt-2 mb-2 p-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-500"
              onClick={() => setViewType(viewType === 'table' ? 'card' : 'table')}
            >
              Switch to {viewType === 'table' ? 'Card' : 'Table'} View
            </button>
          </div>
          <div className="bg-white p-4 rounded shadow">
            {viewType === 'table' ? (
              <StudentTable
                students={sortedStudents}
                onSelectStudent={setSelectedStudent}
                onDeleteStudent={handleDelete}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedStudents.map(student => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            )}
          </div>
          {viewType === 'table' && selectedStudent && (
            <div className="bg-white p-4 rounded shadow">
              <StudentCard student={selectedStudent} />
            </div>
          )}
        </div>
      </div>
      <div className="md:w-1/3">
        {selectedStudent && <StudentCard student={selectedStudent} />}
      </div>
    </div>
  );
}
