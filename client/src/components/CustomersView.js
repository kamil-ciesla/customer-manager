import { useState } from 'react'

function CustomersView(props) {
    const customersList = props.customers.map((customer) =>
        <li key={customer.id}>{customer.name}</li>
    )
    return (
        <div>
            {customersList}
        </div>
    )
}

export default CustomersView