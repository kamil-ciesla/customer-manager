import './App.css';
import CustomerForm from './components/CustomerForm'
import CustomersView from './components/CustomersView'
import Paper from '@mui/material/Paper'
import SearchAppBar from './components/SearchAppBar'
import { getCustomers, deleteCustomer } from './customer'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [customers, setCustomers] = useState([]);
  const [customersReloading, setCustomersReloading] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [language, setLanguage] = useState('english')

  useEffect(() => {
    getCustomers().then(customers => {
      setCustomers(customers);
      setCustomersReloading(false);
    })
  }, [customersReloading])

  function onCustomerDelete(customerId) {

    if (currentCustomer?.id === customerId) {
      setCurrentCustomer(null);
    }
    deleteCustomer(customerId);
    setCustomersReloading(true);
  }
  function onCustomerEdit(customer) {
    setCurrentCustomer(customer);
  }
  function onFormSubmit() {
    setCustomersReloading(true);
    setCurrentCustomer(null);
  }
  function onClickBackButton() {
    setCurrentCustomer(null);
  }
  function onLanguageChange(language) {
    setLanguage(language);
  }
  return (
    <div className="App">
      <Paper className="background" elevation={3}>
        <SearchAppBar
          title="Customer Manager"
          language={language}
          onLanguageChange={onLanguageChange} />
        <div className="main-content">
          <div className="left-side">
            <CustomerForm
              customer={currentCustomer}
              onSubmit={onFormSubmit}
              onClickBackButton={onClickBackButton}
              language={language}
            />
          </div>
          <div className="right-side">
            <CustomersView
              customers={customers}
              onCustomerDelete={onCustomerDelete}
              onCustomerEdit={onCustomerEdit}
              language={language}
            />
          </div>
        </div>
      </Paper>
    </div >
  );
}

export default App;
