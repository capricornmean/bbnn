export default function QuantityInput(props) {
  const { index, value, onInputChange } = props;
  return (
    <label>
      <input className="form-control  my-input" min="1" step="1" type="number" placeholder="1, 2, ..." value={value} onChange={(e) => onInputChange(e, index)} />
    </label>
  );
}