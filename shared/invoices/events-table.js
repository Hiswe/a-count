import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import { Table, Row, Cell, TableFooter, RowFooter } from '../ui-table'
import {    BtnIcon        } from '../ui/buttons'
import {    DatePicker     } from '../ui/date-picker'
import {    Amount         } from '../ui/format'

const eventsColumns = [
  {id: `id`         , label: `invoices.event.#`          , type: `id`           },
  {id: `event`      , label: `invoices.event`            , type: `text`         },
  {id: `description`, label: `invoices.event.description`, type: `input`        },
  {id: `date`       , label: `invoices.event.date`       , type: `input date`   },
  {id: `amount`     , label: `invoices.event.amount`     , type: `input amount` },
  {id: `action`     , label: false                       , type: `action`       },
]

function InvoiceEventsFooter( props ) {
  const { invoice, hideColumns } = props


  return (
    <TableFooter>
      <RowFooter>
        <Cell colSpan="4">
          <FormattedMessage id="table.amount.paid" />
        </Cell>
        <Cell type="amount">
          <Amount value={ invoice.get(`totalPaid`) } />
        </Cell>
        { !hideColumns && <Cell /> }
      </RowFooter>
      <RowFooter>
        <Cell colSpan="4">
          <FormattedMessage id="table.amount.left-to-pay" />
        </Cell>
        <Cell type="amount">
          <Amount value={ invoice.get(`totalLeft`) } />
        </Cell>
        { !hideColumns && <Cell /> }
      </RowFooter>
    </TableFooter>
  )
}

export function InvoiceEvents( props ) {
  const { children, ...rest } = props
  return (
    <Table
      columns={ eventsColumns }
      footer={ <InvoiceEventsFooter {...rest} /> }
      {...rest}
    >
      { children }
    </Table>
  )
}
