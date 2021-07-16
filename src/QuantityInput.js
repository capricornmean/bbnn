export default function QuantityInput(props) {
  const { index, value, onInputChange } = props;
  return (
    <input className="w-full py-1 border-b border-teal-500" min="1" step="1" type="number" placeholder="1, 2, ..." value={value} onChange={e => onInputChange(e, index)} />
  );
}