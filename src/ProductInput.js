export default function ProductInput(props) {
  const { index, value, onInputChange } = props;
  return (<div class="input-group">
    <select className="custom-select" onChange={(e) => onInputChange(e, index)} required>
      <option value="">Choose...</option>
      <option value="Chocolate">Chocolate</option>
      <option value="Coconut">Coconut</option>
      <option value="Mint">Mint</option>
    </select>
  </div>);
}