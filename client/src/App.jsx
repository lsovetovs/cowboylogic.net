import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import styles from "./App.module.css";
import { useAuth } from "./context/AuthContext";

import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// ✅ Захист маршрутів
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const BookStore = lazy(() => import("./pages/BookStore/BookStore"));
const BookDetails = lazy(() => import("./pages/BookDetails/BookDetails"));
const CLStrategies = lazy(() => import("./pages/CLStrategies/CLStrategies"));
const CLPublishing = lazy(() => import("./pages/CLPublishing/CLPublishing"));
const Register = lazy(() => import("./pages/Register/Register"));
const AddBook = lazy(() => import("./pages/Admin/AddBook"));
const EditBook = lazy(() => import("./pages/Admin/EditBook"));
const Login = lazy(() => import("./pages/Login/Login"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));
const Newsletter = lazy(() => import("./pages/Admin/Newsletter"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const SuccessPage = lazy(() => import("./pages/SuccessPage/SuccessPage"));
const CancelPage = lazy(() => import("./pages/CancelPage/CancelPage"));

const App = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />; // Показуємо лоадер, поки не ініціалізовано user
  }

  return (
    <div className={styles.container}>
      <Header />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/clstrategies" element={<CLStrategies />} />
          <Route path="/clpublishing" element={<CLPublishing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookstore" element={<BookStore />} />
          <Route path="/bookstore/book/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />

          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          {/* 🔐 Адмінські сторінки */}
          <Route
            path="/admin/books/new"
            element={
              <AdminRoute>
                <AddBook />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/books/edit/:id"
            element={
              <AdminRoute>
                <EditBook />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/newsletter"
            element={
              <AdminRoute>
                <Newsletter />
              </AdminRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
