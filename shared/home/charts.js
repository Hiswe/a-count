import React from 'react'

import { PieChart , PieChartDefs } from '../ui/pie-chart'
import { Amount   , FormatNumber } from '../ui/format'

import './charts.scss'
const BASE_CLASS = `home-charts`

export function HomeCharts( props ) {
  const { statistics } = props
  return (
    <div className={ BASE_CLASS }>
      <PieChartDefs />
      <PieChart
        title="_.count"
        slices={[
          {label: `_.quotations` , value: statistics.quotationsCount },
          {label: `_.invoices`   , value: statistics.invoicesCount   },
        ]}
      >
        <FormatNumber
          wrapperProps={{style: {fontSize: `3rem`}}}
          value={statistics.quotationsCount + statistics.invoicesCount }
        />
      </PieChart>
      <PieChart
        title="_.amount"
        type="currency"
        slices={[
          {label: `_.quotations`    , value: statistics.quotationsTotal   },
          {label: `_.invoices.left` , value: statistics.invoicesTotalLeft },
          {label: `_.invoices.paid` , value: statistics.invoicesTotalPaid },
        ]}
      >
        <Amount value={ statistics.quotationsTotal + statistics.invoicesTotal } />
      </PieChart>
    </div>
  )
}
