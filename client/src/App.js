import './App.css';
import CustomerForm from './components/CustomerForm'
import CustomersView from './components/CustomersView'
import Navigation from './components/Navigation'
import Header from './components/Header'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'

import axios from 'axios';
import * as constants from './constants'

function App() {
  const [customers, setCustomers] = useState([]);
  const [usersSend, setUsersSend] = useState(1);
  const updateCustomers = useCallback(async () => {
    console.log('updating');
    const result = await axios(constants.SERVER_BASE_LINK + '/customers');
    setCustomers(result.data);
  }, [])

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    console.log(usersSend);
    updateCustomers()
      // make sure to catch any error
      .catch(console.error);;
  }, [usersSend])
  function incrementUS() {
    setUsersSend(usersSend + 1);
  }

  return (
    <div className="App">
      <Header title={`Customer Manager ${usersSend}`} />
      <div className="main-content">
        <div className="left-side">
          <CustomerForm action={() => { incrementUS(); }} />
        </div>
        <div className="right-side  ">
          {customers.length && <CustomersView customers={customers} />}
        </div>
      </div>
    </div >
  );
}

export default App;
