import './App.css';

function App() {
  return (
    <div className="App">
      <form className="customer-form" action="http://localhost:5000/add-customer" method="POST">
        Name:
        <input type="text" name="name" />
        VAT number:
        <input type="text" name="vatNumber" />
        Country code:
        <input type="text" name="countryCode" />
        Address:
        <input type="text" name="address" />

        <button type="submit">
          Add customer
        </button>
      </form>
    </div>
  );
}

export default App;
