import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../store/slices/authSlice";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    navigate("/signin");
    dispatch(signOutUser());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-700 text-base">
          Welcome, User <span className="font-semibold">{userId}</span>!
        </p>
        <Button variant="destructive" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};
