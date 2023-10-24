import styles from "../sass/layouts/balls.module.scss";

export const Balls = () => {
  return (
    <div className={styles.container__ball}>
      <div className={styles.box__ball}>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.shadow}> </div>
        <div className={styles.shadow}> </div>
        <div className={styles.shadow}> </div>
      </div>
    </div>
  );
};
