import { useState } from "react";

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [numOfItems, setNumOfItems] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { id: Date.now(), description, numOfItems, packed: false };
    onAddItem(newItem);
    setDescription("");
    setNumOfItems(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🤩 trip?</h3>
      <select
        value={numOfItems}
        onChange={(e) => {
          //using number function to change default e.target.value string datatype before update the state.
          setNumOfItems(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button>ADD</button>
    </form>
  );
}
