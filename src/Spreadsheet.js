export default function Spreadsheet() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-9">
          <iframe
            className="my-spreadsheet"
            src="https://docs.google.com/spreadsheets/d/1UcmNyg_nh6mhRt_5q6Pj7IXzkRDx4A1pL3F2H6WL8MU/edit?usp=sharing"
          />
        </div>
        <div className="col-3">
          <p>Tools</p>
          <h5>Total Product</h5>
          <form>
            <div className="row">
              <div className="col">
                <label for="totalProductFrom">From Row</label>
              </div>
              <div className="col">
                <input type="number" id="totalProductFrom" required />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="totalProductFrom">To Row</label>
              </div>
              <div className="col">
                <input type="number" id="totalProductFrom" required />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
          <h5>Total Per User</h5>
          <form>
            <div className="row">
              <div className="col">
                <label for="totalProductFrom">From Row</label>
              </div>
              <div className="col">
                <input type="number" id="totalProductFrom" required />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="totalProductFrom">To Row</label>
              </div>
              <div className="col">
                <input type="number" id="totalProductFrom" required />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}