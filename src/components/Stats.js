export default function Stats({ items }) {
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
