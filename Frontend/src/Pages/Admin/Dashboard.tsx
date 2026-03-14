
import { useGetCurrentUserQuery } from "@/api/UserApi";

const Dashboard = () => {
  const { data, isLoading, error } = useGetCurrentUserQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load user</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {data?.username}</p>
      <p>Email: {data?.email}</p>
      <p>Role: {data?.role}</p>

    </div>
  );
};

export default Dashboard;
