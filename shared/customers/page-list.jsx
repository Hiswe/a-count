import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { Link               } from 'react-router-dom'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import      ConnectDataFetcher            from '../connect-data-fetcher.js'
import * as customers                     from '../ducks/customers.js'
import {    Main              , Content } from '../layout/main.jsx'
import      NavSecondary                  from '../nav/secondary.jsx'
import {    ButtonNew          }          from '../nav/secondary-buttons.jsx'
import {    ActiveCustomers    }          from './list.jsx'

const TYPE = `customers`

function Customers( props ) {
  const titleProps  = { id:`page.customers` }

  return (
    <React.Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonNew type={ TYPE } message="customer.button.new" />
      </NavSecondary>
      <Main>
        <Content>
          <ActiveCustomers />
        </Content>
      </Main>
    </React.Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: Customers,
  actionCreators: [
    customers.getAll,
  ],
}) )
