import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import styles from "./App.module.css";

import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
// const Portfolio = lazy(() => import("./pages/Portfolio/Portfolio"));
// const Education = lazy(() => import("./pages/Education/Education"));
// const WorkHistory = lazy(() => import("./pages/WorkHistory/WorkHistory"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const BookStore = lazy(() => import("./pages/BookStore/BookStore"));
const BookDetails = lazy(() => import("./pages/BookDetails/BookDetails"));
const CLStrategies = lazy(() => import("./pages/CLStrategies/CLStrategies"));
const CLPublishing = lazy(() => import("./pages/CLPublishing/CLPublishing"));

const App = () => {
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
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
