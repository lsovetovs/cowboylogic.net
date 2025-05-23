import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import styles from "./App.module.css";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";

// 🌐 Public Pages
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const BookStore = lazy(() => import("./pages/BookStore/BookStore"));
const BookDetails = lazy(() => import("./pages/BookDetails/BookDetails"));
const CLStrategies = lazy(() => import("./pages/CLStrategies/CLStrategies"));
const CLPublishing = lazy(() => import("./pages/CLPublishing/CLPublishing"));

// ✅ CLStrategies Pages
const CLStrategiesHome = lazy(() =>
  import("./pages/CLStrategiesHome/CLStrategiesHome")
);
const CowboyCollegeConsulting = lazy(() =>
  import("./pages/CowboyCollegeConsulting/CowboyCollegeConsulting")
);
const CowboyCollegeStartup = lazy(() =>
  import("./pages/CowboyCollegeStartup/CowboyCollegeStartup")
);
const CowboyCollegeLeadership = lazy(() =>
  import("./pages/CowboyCollegeLeadership/CowboyCollegeLeadership")
);

// ✅ CLPublishing Pages
const CowboyCollegePubAuthor = lazy(() =>
  import("./pages/CowboyCollegePubAuthor/CowboyCollegePubAuthor")
);
const BooksBooks = lazy(() => import("./pages/BooksBooks/BooksBooks"));
const B2BBookstores = lazy(() => import("./pages/B2BBookstores/B2BBookstores"));

// 🔐 Auth
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const SuccessPage = lazy(() => import("./pages/SuccessPage/SuccessPage"));
const CancelPage = lazy(() => import("./pages/CancelPage/CancelPage"));

// 🔐 Private
const Orders = lazy(() => import("./pages/Orders/Orders"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage")); // ✅ новий маршрут

// 🔐 Admin
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const AddBook = lazy(() => import("./pages/Admin/AddBook"));
const EditBook = lazy(() => import("./pages/Admin/EditBook"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));
const Newsletter = lazy(() => import("./pages/Admin/Newsletter"));

const App = () => {
  const { isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <Header />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <main className={styles.page}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
            {/* Bookstore */}
            <Route path="/bookstore" element={<BookStore />} />
            <Route path="/bookstore/book/:id" element={<BookDetails />} />
            {/* CL Strategies */}
            <Route path="/clstrategies" element={<CLStrategies />} />
            <Route path="/clstrategies/home" element={<CLStrategiesHome />} />
            <Route
              path="/clstrategies/cowboy-college-consulting"
              element={<CowboyCollegeConsulting />}
            />
            <Route
              path="/clstrategies/cowboy-college-start-up"
              element={<CowboyCollegeStartup />}
            />
            <Route
              path="/clstrategies/cowboy-college-leadership"
              element={<CowboyCollegeLeadership />}
            />
            {/* CL Publishing */}
            <Route path="/clpublishing" element={<CLPublishing />} />
            <Route
              path="/clpublishing/cowboy-college-pub/author"
              element={<CowboyCollegePubAuthor />}
            />
            <Route path="/clpublishing/books-books" element={<BooksBooks />} />
            <Route
              path="/clpublishing/b2b-bookstores"
              element={<B2BBookstores />}
            />
            {/* Private */}
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
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />{" "}
            {/* ✅ */}
            {/* Admin */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
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
          </Routes>
        </main>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Footer />
    </div>
  );
};

export default App;
