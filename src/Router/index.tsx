import { Routes, Route, BrowserRouter } from "react-router-dom";

import { AuthGuard } from "./AuthGuard";
import { Login } from "../view/pages/Login/indes";
import { AuthLayout } from "../view/layouts/AuthLayout";
import { WrappedScreen } from "../view/layouts/WrappedScreen";
import { Request } from "../view/pages/Request";
import { ForgotPassword } from "../view/pages/ForgotPassword/indes";
import { ResetPassword } from "../view/pages/ResetPassword/indes";
import { OrderPage } from "../view/pages/Order";
import { AdminRequest } from "../view/pages/AdminRequest";
import { RequestsMap } from "../view/pages/RequestsMap";
import { Dashboard } from "../view/pages/Dashboard";
import { ProtocolConsultPage } from "../view/ProtocolConsultPage";
import { NotFoundPage } from "../view/components/NotFoundPage";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route element={<WrappedScreen />}>
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="/" element={<Request />} />
            <Route path="/consult-protocol" element={<ProtocolConsultPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<WrappedScreen />}>
            <Route path="admin" element={<Dashboard />} />
            <Route path="users" element={<h1>Admin Users</h1>} />
            <Route path="settings" element={<h1>Admin Settings</h1>} />
            <Route path="orders" element={<AdminRequest />} />
            <Route path="reports" element={<OrderPage />} />
            <Route
              path="admin/consult-protocol"
              element={<ProtocolConsultPage />}
            />
            <Route path="map" element={<RequestsMap />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
