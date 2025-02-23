import './App.css';
import { AuthProvider } from './context/AuthContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import {
  Landing,
  Login,
  Dashboard,
  Register,
  Inventory,
  Shop,
  Settings,
  Transactions,
  Budget,
} from './pages';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFound from './pages/NotFound/NotFound';
import PublicRoute from './routes/PublicRoute';
import Layout from './layout/Layout';
import { AlertProvider } from './context/AlertContext';

function App() {
  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route
                  element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </AlertProvider>
    </>
  );
}

export default App;
