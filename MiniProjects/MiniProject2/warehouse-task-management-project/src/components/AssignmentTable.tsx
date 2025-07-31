import { useEffect } from "react";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import Card from "./common/CustomCard";

interface Assignment {
  id: number;
  staff_id: number;
  task_id: number;
  status: "assigned" | "in progress" | "completed" | "cancelled";
  notes: string;
}

interface AssignmentTableProps {
  assignments: Assignment[];
  setCurrentUrl: React.Dispatch<React.SetStateAction<string>>;
  handleAssignmentOnclick: (assignment: Assignment) => Promise<void>;
  currentPage: number;
  totalPages: number;
  currentLimit: number;
  handlePagination: (page: number) => Promise<void>;
  handleLimit: (limit: number) => Promise<void>;
}

const AssignmentTable: React.FC<AssignmentTableProps> = ({
  assignments,
  setCurrentUrl,
  handleAssignmentOnclick,
  currentPage,
  totalPages,
  currentLimit,
  handlePagination,
  handleLimit,
}) => {
  useEffect(() => {
    setCurrentUrl(`http://localhost:8000/api/warehouse/assignments`);
  }, [setCurrentUrl]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {assignments?.length > 0 ? (
              assignments?.map((assignment) => (
                <Card
                  title={`Assignment ID: ${assignment.id}`}
                  icon={BookOpenIcon}
                  iconPosition="top"
                  className="mb-4"
                  subtitle={"Status: " + assignment.status}
                  description={assignment.notes || "No notes"}
                  actions={[
                    {
                      label: "View Task",
                      onClick: () => handleAssignmentOnclick(assignment),
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

export default AssignmentTable;
