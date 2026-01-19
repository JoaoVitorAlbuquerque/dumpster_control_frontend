import { Routes, Route, BrowserRouter } from "react-router-dom";

import { AuthGuard } from "./AuthGuard";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="login" element={<h1>Login</h1>} />
          <Route path="forgot-password" element={<h1>Forgot-password</h1>} />
          <Route path="reset-password" element={<h1>Reset-password</h1>} />
          <Route path="/" element={<h1>Orders</h1>} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="admin" element={<h1>Admin Home</h1>} />
          <Route path="users" element={<h1>Admin Users</h1>} />
          <Route path="settings" element={<h1>Admin Settings</h1>} />
          <Route path="orders" element={<h1>Admin Orders</h1>} />
          <Route path="reports" element={<h1>Admin Reports</h1>} />
          <Route path="map" element={<h1>Admin Map</h1>} />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
