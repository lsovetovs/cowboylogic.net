import Hero from "../../components/Hero/Hero";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Hero title="Home" />
    </div>
  );
};

export default Home;
