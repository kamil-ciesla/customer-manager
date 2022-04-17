import './App.css';
import CustomerForm from './components/CustomerForm'
import CustomersView from './components/CustomersView'
import Paper from '@mui/material/Paper'
import SearchAppBar from './components/SearchAppBar'
import { getCustomers, deleteCustomer } from './api/customer'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [customers, setCustomers] = useState([]);
  const [customersReloading, setCustomersReloading] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  useEffect(() => {
    getCustomers().then(customers => {
      setCustomers(customers);
      setCustomersReloading(false);
    })
  }, [customersReloading])

  function onCustomerDelete() {
    setCustomersReloading(true);
  }
  function onCustomerEdit(customer) {
    setCurrentCustomer(customer);
  }
  function onFormSubmit() {
    setCustomersReloading(true);
  }
  return (
    <div className="App">
      <Paper className="background" elevation={3}>
        <SearchAppBar title="Customer Manager"></SearchAppBar>
        <div className="main-content">
          <div className="left-side">
            <CustomerForm customer={currentCustomer} onSubmit={onFormSubmit} />
          </div>
          <div className="right-side">
            <CustomersView customers={customers} onCustomerDelete={onCustomerDelete}
              onCustomerEdit={onCustomerEdit} />
          </div>
        </div>
      </Paper>
    </div >
  );
}

export default App;
