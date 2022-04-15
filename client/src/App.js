import './App.css';
import CustomerForm from './components/CustomerForm'
import CustomersView from './components/CustomersView'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import * as constants from './constants'

function App() {
  const [currentView, setCurrentView] = useState(<CustomerForm />);
  const [customers, setCustomers] = useState([]);

  useEffect(() => { updateCustomers() }, [])

  async function updateCustomers() {
    const result = await axios(constants.SERVER_BASE_LINK + '/customers');
    setCustomers(result.data);
    console.log('Updated customers');
  }

  return (
    <div className="App">
      <div id="mainContainer">
        <div id="navigation">
          <button onClick={() => { setCurrentView(<CustomerForm />) }}>
            Add Customer
          </button>
          <button onClick={async () => {
            await updateCustomers();
            console.log(customers);
            setCurrentView(<CustomersView customers={customers} />)
          }}>
            Customers list
          </button>
        </div>
        {currentView}
      </div>
    </div >
  );
}

export default App;
