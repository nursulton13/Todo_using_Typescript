import { ChangeEvent, useState } from "react";
import styles from "./home.module.css";
import { IData } from "./interfaces";

function App() {
  const data: IData[] = [
    {
      id: 1,
      title: "Omar",
      desc: "Descreption",
    },
    {
      id: 2,
      title: "Osman",
      desc: "Descreption",
    },
    {
      id: 3,
      title: "Abdulloh",
      desc: "Descreption",
    },
  ];

  const [btnTitle, setBtnTitle] = useState<string>("Add Todo");
  const [title, setTitle] = useState<string>();
  const [arr, setArr] = useState<IData[]>(data);
  const [changeId, setChangeId] = useState<number>(1);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setTitle(evt.target.value);
    if (!evt.target.value.length) {
      setBtnTitle("Add Todo");
    }
  };

  const handleClick = (): void => {    
    var uid = new Date().getTime();
    if (!title?.length) return;
    setBtnTitle("Add Todo");
    setTitle("");

    if (btnTitle === "Change Todo") {
      setArr([...arr, { desc: "Descreption", id: changeId, title: title }]);
    } else {
      setArr([...arr, { desc: "Descreption", id: uid, title: title }]);
    }
  };

  const deleteItem = (id: number): void => {
    setArr(arr.filter((item) => item.id !== id));
  };

  const changeItem = (id: number): void => {
    setBtnTitle("Change Todo");
    var data = arr.filter((item) => item.id === id);
    var dataTitle = data[0].title;
    setTitle(dataTitle);
    setChangeId(id);
    setArr(arr.filter((item) => item.id !== id));
  };  
  
  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>APP Todo</h1>
      <input
        type="text"
        className={styles.input}
        value={title}
        onChange={handleChange}
        placeholder="Enter Todo"
      />
      <button className={styles.button} onClick={handleClick}>
        {btnTitle}
      </button>

      <div className={styles.card}>
        {arr.sort((a,b)=>a.id-b.id)?.map((c) => (
          <div key={c.id} className={styles.cardItem}>
            <p>{c.title}</p>
            <div>
              <button
                className={styles.changeButton}
                onClick={() => changeItem(c.id)}
              >
                Change
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => deleteItem(c.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
