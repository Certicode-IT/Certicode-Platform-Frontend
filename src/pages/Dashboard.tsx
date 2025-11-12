import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {user?.username ?? "Guest"}
      </h1>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}
