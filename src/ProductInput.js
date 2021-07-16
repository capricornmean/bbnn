export default function ProductInput(props) {
  const { index, value, onInputChange } = props;
  return (
    <select className="w-full py-1 border border-teal rounded-lg" onChange={e => onInputChange(e, index)} required>
      <option value="">Choose...</option>
      <option value="Chocolate">Chocolate</option>
      <option value="Coconut">Coconut</option>
      <option value="Mint">Mint</option>
    </select>
  );
}