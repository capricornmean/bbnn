export default function Form({ fromInput, toInput, onFromInputChange, onToInputChange, onFormSubmit }) {
  return (
    <form className="w-max border border-teal-500 rounded px-3 py-3" onSubmit={e => onFormSubmit(e)}>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <label for="totalProductFrom">From Row</label>
        </div>
        <div className="ml-3 col-span-2">
          <input type="number" id="totalProductFrom" value={fromInput} onChange={e => onFromInputChange(e)} className="w-14 border border-teal-500" required />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 my-1.5">
          <label for="totalProductFrom">To Row</label>
        </div>
        <div className="ml-3 col-span-2 my-1.5">
          <input type="number" id="totalProductFrom" value={toInput} onChange={e => onToInputChange(e)} className="w-14 border border-teal-500" required />
        </div>
      </div>
      <button type="submit" className="mt-3.5 py-1 px-2 bg-teal-500 rounded-md text-white">Calculate</button>
    </form>
  );
}