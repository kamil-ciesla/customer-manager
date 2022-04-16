import './App.css';
import CustomerForm from './components/CustomerForm'
import CustomersView from './components/CustomersView'
import Navigation from './components/Navigation'
import Header from './components/Header'
import CheckedList from './components/CheckedList'
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
  const customerFormButton = (
    <button onClick={() => { setCurrentView('CustomerForm') }}
      key={1}>
      Add Customer
    </button>
  )
  const customersViewButton = (
    <button onClick={() => {
      updateCustomers();
      setCurrentView('CustomersView');
    }}
      key={2}>
      Customers list
    </button>
  )

  return (
    <div className="App">
      <Header title='Customer Manager' />
      <div className="main-content">
        <div className="leftSide">
          <Navigation options={[customerFormButton, customersViewButton]} />
          <CustomerForm />
        </div>
        <div className="rightSide">
          <CustomersView customers={customers} />
        </div>
      </div>
    </div >
  );
}

export default App;
