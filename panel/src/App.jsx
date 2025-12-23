import { Routes, Route, Link } from "react-router-dom";
import Home from "./router/Home";
import Tasks from "./router/Tasks";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import UnderLayerHalo from "./components/UnderLayerHalo";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ToggleDark";
import TaskDetails from "./router/TaskDetails";
import { TaskProvider } from "./context/TaskContext";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TaskProvider>
        <ThemeProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="none"
            toastClassName={(prop) =>
              prop.defaultClassName +
              " " +
              "font-[Yekan]! bg-white/5! dark:text-white! text-black! backdrop-blur-xl!"
            }
          />
          <div className="flex font-['Yekan'] transition-colors h-screen duration-500 dark:bg-[#1d1e22]">
            <div className="flex flex-col z-10 flex-1 p-6">
              <Navbar />
              <div className="bg-[#fafafa] w-full h-full rounded-xl relative overflow-auto scroll-hidden transition-colors duration-500 dark:bg-[#22262b]">
                <UnderLayerHalo />
                <Routes location={backgroundLocation || location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/tasks/:category" element={<Tasks />}>
                    <Route path=":id" element={<TaskDetails />} />
                  </Route>
                </Routes>
              </div>
            </div>
            <Sidebar />
          </div>
        </ThemeProvider>
      </TaskProvider>
    </LocalizationProvider>
  );
}

export default App;
