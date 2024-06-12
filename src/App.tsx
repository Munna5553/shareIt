import { useEffect, useState } from "react";
import { authService } from "./appwrite/auth";
import { useAppDispatch } from "./store/hook/hook";
import { LogIn, Logout } from "./store/auth/authSlice"
import Button from "./components/Button";
import Input from "./components/Input";
import { Eye, Mail } from "lucide-react";

const App = () => {

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    authService.getUser()
      .then((data) => {
        if (data) {
          dispatch(LogIn({ data }))
        } else {
          dispatch(Logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Button>login</Button>
      <Input
        placeholder="Email address"
        startIcon={<Mail />}
        endIcon={<Eye />}
        value=""
      />
    </>
  )
}

export default App;