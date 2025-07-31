import { useAuth } from "../hooks/useAuth";
import { useApi } from "../hooks/useApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";
import TableComponent from "../components/common/CustomTable";
import LogoutButton from "../components/Logout";
import UpdateProfile from "../components/UpdateProfile";
import { type UpdatedUserProfile } from "../components/UpdateProfile";
import axios from "axios";

interface ProfileData {
  id: number;
  full_name: string;
  phone: string;
  role: "staff" | "manager";
  has_forklift_license?: boolean;
  has_punched_in?: boolean;
}

export default function Profile() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const authContext = useAuth();
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (authContext?.user?.user?.id !== parseInt(id || "")) {
      console.log("Unauthorized access", authContext?.user?.user?.id, id);
      navigate("/profile/" + authContext?.user?.user?.id);
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      const roleType = authContext?.user?.user?.role;
      try {
        const result = await api.get(
          `http://localhost:8000/api/warehouse/${roleType}s/user/${id}${
            roleType === "manager" ? "" : "/assignments"
          }`,
          { signal }
        );
        if (result.status === 200 && result.data) {
          const data =
            roleType === "manager"
              ? result.data.manager[0]
              : result.data.staffs[0];
          console.log(data);
          setProfileData(data);
          setLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setLoading(false);
        } else if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          setLoading(false);
        } else {
          setError("Something went wrong");
          setLoading(false);
        }
      }
    };

    fetchProfileData();

    return () => controller.abort();
  }, [authContext, navigate, id, api]);

  const handleUpdate = async (data: UpdatedUserProfile) => {
    setLoading(true);
    if(Object.keys(data).length === 0){
      setIsEditing(false);
      setLoading(false);
      return
    }
    try {
      const roleType = authContext?.user?.user?.role;
      const result = await api.put(
        `http://localhost:8000/api/warehouse/${roleType}s/${id}`,
        data
      );
      if (result.status !== 200) {
        setIsEditing(false);
        setLoading(false);
        const newData = await api.get(
          `http://localhost:8000/api/warehouse/${roleType}s/${id}${
            roleType === "manager" ? "" : "/assignments"
          }`
        );
        const data =
          roleType === "manager"
            ? newData.data.manager[0]
            : newData.data.staffs[0];
        setProfileData(data);
      }
    } catch (error) {
      setIsEditing(false);
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    setTimeout(() => {
      setError(null);

      navigate("/profile/" + authContext?.user?.user?.id);
    }, 3000);

    return <ErrorComponent message={error} />;
  }

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center flex-col">
      {!isEditing ? (
        <TableComponent
          tableName="Profile"
          data2={
            authContext?.user?.user?.role === "manager"
              ? [
                  { name: "Full Name", value: profileData?.full_name || "" },
                  { name: "Phone", value: profileData?.phone || "" },
                  { name: "Role", value: "Manager" },
                ]
              : [
                  { name: "Full Name", value: profileData?.full_name || "" },
                  { name: "Phone", value: profileData?.phone || "" },
                  { name: "Role", value: "Staff" },
                  {
                    name: "Has Forklift License",
                    value: profileData?.has_forklift_license ? "Yes" : "No",
                  },
                  {
                    name: "Has Punched In",
                    value: profileData?.has_punched_in ? "Yes" : "No",
                  },
                ]
          }
        />
      ) : (
        <UpdateProfile
          onSubmit={handleUpdate}
          userData={{
            user: {
              // username: authContext?.user?.user?.username || "",
              // email: authContext?.user?.user?.email || "",
              role:
                authContext?.user?.user?.role === "manager"
                  ? "manager"
                  : "staff",
            },
            data: {
              phone: profileData?.phone || "",
              full_name: profileData?.full_name || "",
              has_forklift_license: profileData?.has_forklift_license,
              has_punched_in: profileData?.has_punched_in,
            },
          }}
        />
      )}
      <div className="flex items-center justify-center gap-4">
        <LogoutButton />
        <button
          className="py-2 px-4 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
    </div>
  );
}
