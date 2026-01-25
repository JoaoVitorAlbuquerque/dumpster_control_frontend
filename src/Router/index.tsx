import { Routes, Route, BrowserRouter } from "react-router-dom";

import { AuthGuard } from "./AuthGuard";
import { Login } from "../view/pages/Login/indes";
import { AuthLayout } from "../view/layouts/AuthLayout";
import { Button } from "../view/components/Button";
import { useAuth } from "../app/hooks/useAuth";
import { WrappedScreen } from "../view/layouts/WrappedScreen";

export function Router() {
  const { signout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<h1>Forgot-password</h1>} />
          </Route>

          <Route element={<WrappedScreen />}>
            <Route path="reset-password" element={<h1>Reset-password</h1>} />
            <Route path="/" element={<h1>Orders</h1>} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<WrappedScreen />}>
            <Route
              path="admin"
              element={
                <h1>
                  <Button onClick={signout}>Sair</Button>
                </h1>
              }
            />
            <Route path="users" element={<h1>Admin Users</h1>} />
            <Route path="settings" element={<h1>Admin Settings</h1>} />
            <Route path="orders" element={<h1>Admin Orders</h1>} />
            <Route path="reports" element={<h1>Admin Reports</h1>} />
            <Route path="map" element={<h1>Admin Map</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
