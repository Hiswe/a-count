import React from 'react'

import * as Format  from '../ui/format'

import * as KeyPres from '../ui/key-presentation'
import { Progress } from '../ui/progress'

export function CustomerHeader( props ) {
  const { customer } = props

  return (
    <KeyPres.Wrapper>
      <KeyPres.Label id="customer.total.quotation" />
      <KeyPres.Value>
        <Format.Amount value={ customer.get(`quotationsTotal`) } />
      </KeyPres.Value>
      <KeyPres.Label id="customer.total.invoice" />
      <KeyPres.Value>
        <Format.Amount value={ customer.get(`invoicesTotal`) } />
      </KeyPres.Value>
      <KeyPres.Label id="customer.total.to-be-paid" />
      <KeyPres.Value>
        <Format.Amount value={ customer.get(`invoicesTotalLeft`) } />
      </KeyPres.Value>
      <KeyPres.Label id="customer.total.progress" />
      <KeyPres.Value>
        <Progress
          value={ customer.get(`invoicesTotalPaid`) }
          max={ customer.get(`invoicesTotal`) }
        />
      </KeyPres.Value>
    </KeyPres.Wrapper>
  )
}
