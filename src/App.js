import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(itemId) {
    setItems((items) => items.filter((item) => item.id !== itemId));
  }

  function handleToggleItem(itemId) {
    setItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🎒</h1>;
}

function Form({ onAddItem }) {
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

function PackingList({ items, onDeleteItem, onCheckItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  switch (sortBy) {
    case "input":
      sortedItems = items;
      break;
    case "description":
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
      break;
    case "packed":
      sortedItems = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));
      break;
    default:
      break;
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onCheckItem={onCheckItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort items by input</option>
          <option value="description">Sort items by description</option>
          <option value="packed">Sort items by Packed Status</option>
        </select>
        <button onClick={() => onClearList()}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onCheckItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onCheckItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some item to your packing list 🚀</em>
      </footer>
    );
  }
  const numOfItems = items.length;
  const numOfPackingItems = items.filter((item) => item.packed === true).length;
  const numOfPackingItemsInPrc = numOfItems * (numOfPackingItems / 100) * 100;
  return (
    <footer className="stats">
      {numOfPackingItemsInPrc === 100
        ? `You got everything! Ready to go ✈️`
        : `🎒 You have ${numOfItems} items on your list, and you are already packed
        ${numOfPackingItems} (${numOfPackingItemsInPrc}%)}`}
    </footer>
  );
}
