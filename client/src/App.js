import './App.css';
import CustomerForm from './components/CustomerForm'
import CustomersView from './components/CustomersView'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import * as constants from './constants'

function App() {
  const [currentView, setCurrentView] = useState('CustomerForm');
  const [customers, setCustomers] = useState([]);

  useEffect(() => { updateCustomers() }, [])
  async function updateCustomers() {
    const result = await axios(constants.SERVER_BASE_LINK + '/customers');
    setCustomers(result.data);
  }

  return (
    <div className="App">
      <div id="mainContainer">
        <div id="navigation">
          <button onClick={() => { setCurrentView('CustomerForm') }}>
            Add Customer
          </button>
          <button onClick={() => {
            updateCustomers();
            setCurrentView('CustomersView');
          }}>
            Customers list
          </button>
        </div>
        {currentView === 'CustomerForm' && <CustomerForm />
          || currentView === 'CustomersView' && <CustomersView customers={customers} />}
      </div>
    </div >
  );
}

export default App;
