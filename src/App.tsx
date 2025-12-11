import { AuthProvider } from "./context/authContext"
import Router from "./routes"
import {ToastProvider} from "./context/ToastContext.tsx";

export default function App() {
  return (
    <AuthProvider>
        <ToastProvider>
            <Router />
        </ToastProvider>
    </AuthProvider>
  )
}


