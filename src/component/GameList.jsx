import styles from "./GameList.module.css";

function GameList({ items, onClick }) {
  // تابع random رو به کامپوننت parent بردم
  //   چون با تایمر همش عکس ها عوض میشدن
  return (
    <ul className={styles["item-list"]}>
      {items.map((item) => (
        <li className={styles["item"]} key={item.id}>
          <div
            className={`${styles["card"]} ${
              item.display ? styles["revealed"] : ""
            }`}
            onClick={() => onClick(item)}
          >
            <span className={styles["layout"]}></span>
            <img
              className={styles["item-image"]}
              src={item.src}
              alt={item.text}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default GameList;
