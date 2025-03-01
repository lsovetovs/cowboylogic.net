import styles from "./Portfolio.module.css";
import PortfolioIcon from "../../assets/images/change.jpg";

export default function Portfolio() {
  return (
    <div className={styles.container}>
      <img
        className={styles.portfolio_image}
        src={PortfolioIcon}
        alt="Portfolio"
      />
      <p className={styles.portfolio_text}>
      Without change, there is no life. Life requires change, and change requires taking a change. My career mandate is to live. This has made me a lifetime learner and a qualified agent of change. During the last stage of my career, I have evolved to become a teacher, mentor, motivator, and retooler of people who want to keep up with and initiate innovative change. This has become a passion for me, and my career has become a catalyst for many people who have seen the end of a 40-year career become an end to a 7-year career, as technology is moving so fast now, one must move with it… or even drive it faster in a world where destructive innovation is the norm. 
    </p>
    </div>
  );
}
