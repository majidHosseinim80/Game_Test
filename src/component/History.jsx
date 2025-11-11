import styles from "./History.module.css";

function History({ matchedItems }) {
  // تو این کامپوننت تاریخچه رو نمایش میدم
  return (
    <div className={styles[`history-container`]}>
      <h4 className={styles[`header`]}>تاریخچه حرکات درست</h4>
      {matchedItems.length === 0 ? (
        <p className={styles[`text`]}>هیچ موردی تطابق داده نشده</p>
      ) : (
        <ul className={styles[`history-list`]}>
          {matchedItems.map((pair, index) => (
            <li key={index} className={styles[`history-item`]}>
              {pair.text || `جفت شماره ${index + 1}`}
            </li>
          ))}
        </ul>
      )}
      <p className={styles[`history-resulte`]}>
        تطابق‌ها: {matchedItems.length}
      </p>
    </div>
  );
}

export default History;
