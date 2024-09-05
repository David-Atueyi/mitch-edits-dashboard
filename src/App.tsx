import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { GlobalAuthPageLayout } from "./layouts/GlobalAuthPageLayout";
import { GlobalPageLayout } from "./layouts/GlobalPageLayout";
import { LogInPage } from "./pages/LogInPage";
import { ClientTablePage } from "./pages/ClientTablePage";
import { CreateClientPage } from "./pages/CreateClientPage";
import { AddProjectPage } from "./pages/AddProjectPage";


function App() {
  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<GlobalAuthPageLayout />}>
          <Route index element={<LogInPage />} />
        </Route>
        <Route path="/home" element={<GlobalPageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="add-project" element={<AddProjectPage />} />
          <Route path="client-table" element={<ClientTablePage />} />
          <Route path="add-client" element={<CreateClientPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
