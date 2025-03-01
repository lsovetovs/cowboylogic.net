import Hero from "../../components/Hero/Hero";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.container}>
      <Hero title="Home" />

      <h2 className={styles.content}>Featured Content</h2>

      <p className={styles.contentText}>Elevator Pitch</p>
      <Link to="/about">About Roger Haller </Link>
      <p className={styles.about}>
        Roger Haller was born in the little coastal town of Tillamook in Oregon
        but was raised in South Central British Columbia, Canada. Roger spent 48
        years building a life in B.C., but when he needed to break out and do a
        re-do… (Perhaps it was a mid-life crisis). In 1998 he went back to
        school at Royal Roads University in Victoria, B.C. to become a Network
        Engineer. With that certification tucked neatly into his belt, he found
        no one in B.C. needed a paper engineer, so he looked farther afield.
        With about 12 or 13 other new grads, he checked out Washington State and
        was welcomed by Bill Gates and company. It seems, Roger was right on
        queue to fight the Year 2000 bug. The whole class was hired and Roger
        started his new job, back in the land of his birth, on January 1st,
        2000. Since that time, Roger built a career along the following path:
        <ul>
          <li>
            Microsoft – Technical Support for Microsoft Project for Fortune 200
            companies – 2000 – 2001{" "}
          </li>
          <li>
            Primus Knowledge Solutions – Technical Support for Fortune 500
            companies – 2001 – 2004{" "}
          </li>
          <li>Cowboy Logic Press – Author – 2004 </li>
          <li>AT&T-Wireless – Software Tester – 2004 – 2005</li>
          <li>Boeing – Software Test Lead – 2005 – 2006</li>
          <li>Cingular – AT&T Test Lead – 2006 – 2007</li>
          <li>AT&T – Sr. Manager 2007 – 2013</li>
          <li>T-Mobile – Product Manager – 2014 – 2016</li>
          <li>T-Mobile – Program Manager – UAT Manager – 2016 – 2018</li>
        </ul>
        This is where Roger went back to school again, to add a Management
        degree to his portfolio, with a certification in Leadership.
        <p>More to come – Stay tuned…</p>
      </p>
    </div>
  );
};

export default Home;
