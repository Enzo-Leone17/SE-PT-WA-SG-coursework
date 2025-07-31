//custom hooks
import { useAuth } from "../hooks/useAuth";
import { useApi } from "../hooks/useApi";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Loading from "./common/Loading";
import ErrorComponent from "./common/Error";
import Card from "./common/CustomCard";
import Dashboard from "./common/CustomDashboard";
import { type Category } from "./common/CustomDashboard";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import TableComponent from "./common/CustomTable";

interface Assignment {
  id: number;
  staff_id: number;
  task_id: number;
  status: "assigned" | "in progress" | "completed" | "cancelled";
  notes: string;
}
interface Task {
  id: number;
  manager_id: string;
  destination_bin_id: number;
  status: "opened" | "pending" | "cancelled" | "closed";
  description: string;
  notes: string;
}

const StaffDashboard = () => {
  //custom hooks
  const authContext = useAuth();
  const api = useApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setLimit] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState("none");
  const [currentFilterValue, setCurrentFilterValue] = useState("none");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    //prevent access to others dashboard
    if (authContext?.user?.user?.id !== parseInt(id || "")) {
      console.log("Unauthorized access", authContext?.user?.user?.id, id);
      navigate("/dashboard/" + authContext?.user?.user?.id);
      return;
    }

    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const result = await api.get(
          `http://localhost:8000/api/warehouse/staffs/user/${id}/assignments`,
          { signal }
        );
        if (result.status === 200 && result.data) {
          setCurrentPage(result.data.page);
          setTotalPages(result.data.totalPages);
          console.log(result.data.staffs[0].Assignments);
          setAssignments(result.data.staffs[0].Assignments);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message);
          console.log(error.message);
        } else if (axios.isCancel(error)) {
          setError("Request canceled" + error.message);
          console.log("Request canceled", error.message);
        } else {
          setError("Something went wrong");
          console.log("Something went wrong");
        }
      }
    };
    fetchAssignments();

    //return () => controller.abort();
  }, [authContext, navigate, id, api]);

  const handleOnclick = async (assignment: Assignment) => {
    setLoading(true);
    try {
      const result = await api.get(
        `http://localhost:8000/api/warehouse/tasks/${assignment.task_id}`
      );
      if (result.status === 200 && result.data) {
        console.log(result.data.tasks[0]);
        setViewTask(result.data.tasks[0]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
        console.log(error.message);
      } else {
        setError("Something went wrong");
        console.log("Something went wrong");
      }
    }
  };

  const handlePagination = async (toPage = currentPage) => {
    setLoading(true);
    try {
      const result = await api.get(
        `http://localhost:8000/api/warehouse/staffs/user/${id}/assignments?limit=${currentLimit}&page=${toPage}`
      );
      if (result.status === 200 && result.data) {
        setCurrentPage(result.data.page);
        console.log(result.data.staffs[0].Assignments);
        setAssignments(result.data.staffs[0].Assignments);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
        console.log(error.message);
      } else {
        setError("Something went wrong");
        console.log("Something went wrong");
      }
    }
  };

  const handleLimit = async (limit = currentLimit) => {
    setLoading(true);
    try {
      const result = await api.get(
        `http://localhost:8000/api/warehouse/staffs/user/${id}/assignments?limit=${limit}&page=${currentPage}`
      );
      if (result.status === 200 && result.data) {
        setLimit(limit);
        console.log(result.data.staffs[0].Assignments);
        setAssignments(result.data.staffs[0].Assignments);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
        console.log(error.message);
      } else {
        setError("Something went wrong");
        console.log("Something went wrong");
      }
    }
  };

  const handleFiltering = async (filter: string) => {
    setLoading(true);
    console.log(filter);
    try {
      const result = await api.get(
        `http://localhost:8000/api/warehouse/staffs/user/${id}/assignments?limit=${currentLimit}&${filter}`
      );
      if (result.status === 200 && result.data) {
        setCurrentPage(result.data.page);
        setTotalPages(result.data.totalPages);
        console.log(result.data.staffs[0].Assignments);
        setAssignments(result.data.staffs[0].Assignments);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
        console.log(error.message);
      } else {
        setError("Something went wrong");
        console.log("Something went wrong");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    setTimeout(() => {
      // const toUrl = authContext?.user?.user?.id ? "/dashboard/" + authContext?.user?.user?.id : "/";
      navigate("/");
    }, 3000);
    return <ErrorComponent message={error} />;
  }

  if (viewTask) {
    return (
      <div className="flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
            <div className="overflow-hidden">
              <TableComponent
                tableName="Task"
                dataHeaders={["Task Details", "Values"]}
                data2={[
                  { name: "ID", value: viewTask.id.toString() },
                  { name: "Manager ID", value: viewTask.manager_id },
                  {
                    name: "Destination Bin ID",
                    value: viewTask.destination_bin_id.toString(),
                  },
                  { name: "Status", value: viewTask.status },
                  { name: "Description", value: viewTask.description },
                  { name: "Notes", value: viewTask.notes },
                ]}
              />
            </div>
            <button
              type="button"
              className="py-2 px-4 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm"
              onClick={() => setViewTask(null)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const dashboardCategories: Category[] = [
    {
      id: "assignments",
      label: "Assignments",
      icon: BookOpenIcon,
      component: AssignmentTable({
        assignments,
        handleOnclick,
        currentPage,
        totalPages,
        currentLimit,
        handlePagination,
        handleLimit,
      }),
      filterButton: (
        <FilterButton
          customFilters={[
            {
              label: "Status",
              property: "status",
              value: ["assigned", "in progress", "completed", "cancelled"],
            },
          ]}
          currentFilter={currentFilter}
          currentFilterValue={currentFilterValue}
          setCurrentFilter={setCurrentFilter}
          setCurrentFilterValue={setCurrentFilterValue}
          handleFiltering={handleFiltering}
        />
      ),
    },
  ];

  return (
    <Dashboard
      categories={dashboardCategories}
      collapsible={false}
      defaultCategory="assignments"
      title="Staff"
    />
  );
};

//#region filter button

interface CustomFilter {
  label?: string;
  property: string;
  value: string[];
}

interface FilterButtonProps {
  customFilters: CustomFilter[];
  currentFilter: string;
  currentFilterValue: string;
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrentFilterValue: React.Dispatch<React.SetStateAction<string>>;
  handleFiltering: (filter: string) => Promise<void>;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  customFilters,
  currentFilter,
  currentFilterValue,
  setCurrentFilter,
  setCurrentFilterValue,
  handleFiltering,
}) => {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-col items-center ml-4">
        <label htmlFor="filterBy" className="text-gray-800">
          Filter By:
        </label>
        <select
          id="filterBy"
          className="mx-1 px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"
          onChange={(e) => {
            setCurrentFilter(e.target.value);
            setCurrentFilterValue("none");
          }}
          value={currentFilter}
        >
          <option value="none">No Filter</option>
          {customFilters.map((f) => (
            <option value={f.property}>{f?.label || f.property}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-center ml-4">
        <label htmlFor="filterValue" className="text-gray-800">
          Value:
        </label>
        <select
          id="filterValue"
          className="mx-1 px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"
          onChange={(e) => {
            setCurrentFilterValue(e.target.value);
            handleFiltering(
              `${
                currentFilter === "none" || e.target.value === "none"
                  ? ""
                  : `${currentFilter}=${e.target.value}`
              }`
            );
          }}
          value={currentFilterValue}
        >
          <option value="none">No Filter</option>
          {customFilters.map(
            (f) =>
              f.property === currentFilter &&
              f.value.map((v) => <option value={v}>{v}</option>)
          )}
        </select>
      </div>
    </div>
  );
};

//#endregion

interface AssignmentTableProps {
  assignments: Assignment[];
  handleOnclick: (assignment: Assignment) => Promise<void>;
  currentPage: number;
  totalPages: number;
  currentLimit: number;
  handlePagination: (page: number) => Promise<void>;
  handleLimit: (limit: number) => Promise<void>;
}

const AssignmentTable: React.FC<AssignmentTableProps> = ({
  assignments,
  handleOnclick,
  currentPage,
  totalPages,
  currentLimit,
  handlePagination,
  handleLimit,
}) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {assignments?.length > 0 ? (
              assignments?.map((assignment) => (
                <Card
                  key={assignment.id}
                  title={`Assignment ID: ${assignment.id}`}
                  icon={BookOpenIcon}
                  iconPosition="top"
                  className="mb-4"
                  subtitle={"Status: " + assignment.status}
                  description={assignment.notes || "No notes"}
                  actions={[
                    {
                      label: "View Task",
                      onClick: () => handleOnclick(assignment),
                      variant: "primary",
                    },
                  ]}
                />
              ))
            ) : (
              <p className="text-gray-500">No assignments found</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`mx-1 px-2 py-1 ${
                page === currentPage
                  ? "bg-blue-500"
                  : "bg-gray-500 hover:bg-gray-600"
              } text-white rounded`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          )
        )}
        <div className="flex flex-col items-center ml-4">
          <label htmlFor="limit" className="text-gray-800">
            Limit:
          </label>
          <select
            id="limit"
            className="mx-1 px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"
            onChange={(e) => handleLimit(parseInt(e.target.value))}
            value={currentLimit}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
