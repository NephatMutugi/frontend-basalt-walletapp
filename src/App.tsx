import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RegisterForm from "./views/auth/Register";
import Activate from "./views/auth/ActivateUser";
import LoginPage from "./views/auth/LoginPage";
import DashboardLayout from "./layouts/DashBoardLayout";
import Dashboard from "./layouts/Dashboard";
import NotFound from "./components/MiisingPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-in" element={<RegisterForm />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
