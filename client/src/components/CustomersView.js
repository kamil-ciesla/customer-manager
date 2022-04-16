import { useState } from 'react'


function CustomersView(props) {
    const customersList = props.customers.map((customer) =>
        <div className="customer-short" key={customer.id}>
            <div>
                {customer.name}
            </div>
            <div>
                {customer.vatNumber}
            </div>
            <div>
                {customer.countryCode}
            </div>
            <div>
                {customer.address}
            </div>
        </div>
    )
    return (
        <div className='CustomersView'>
            {customersList}
        </div>
    )
}

export default CustomersView