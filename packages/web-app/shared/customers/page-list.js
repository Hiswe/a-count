import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { Link               } from 'react-router-dom'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import      ConnectDataFetcher            from '../connect-data-fetcher'
import * as customers                     from '../ducks/customers'
import {    Main              , Content } from '../layout/main'
import      NavSecondary                  from '../nav/secondary'
import {    ButtonNew          }          from '../nav/secondary-buttons'
import {    ActiveCustomers    }          from './list'

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
