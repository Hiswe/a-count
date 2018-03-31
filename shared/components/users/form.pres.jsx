import React, { Fragment } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import Main from '../layout/main.jsx'
import { PaperSheet, Party, Reference, Mentions } from '../layout/paper-sheet.jsx'
import Form from '../ui/form.jsx'
import { Button } from '../ui/buttons.jsx'
import { Input, Textarea, Select } from '../ui/field.jsx'
import ProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'
import { ButtonSubmit } from'./secondary-nav-actions.jsx'

import './form.pres.scss'
export const BASE_CLASS = `profile-form`

const customerExample = {
  name: `Customer name`,
  address: `123 6th St.
__Melbourne, FL 32904__
AUSTRALIA
`
}

function UserFormPres( props ) {
  const {
    intl,
    formData,
    handleFormChange,
    handleSubmit,
  } = props
  const { isSaving } = formData
  const {
    defaultProduct,
    defaultQuotation,
    defaultInvoice,
  } = formData
  const fakeQuotationReference = {
    type: `quotation`,
    product: {
      updatedAt: new Date().toUTCString(),
      reference: `${defaultQuotation.prefix}${defaultQuotation.startAt}`,
    },
  }
  const fakeInvoiceReference = {
    type: `invoice`,
    product: {
      updatedAt: new Date().toUTCString(),
      reference: `${defaultInvoice.prefix}${defaultInvoice.startAt}`,
    },
  }
  const fakeProduct = {
    description: `a *product* example`,
    quantity: 2,
    price: defaultProduct.price,
  }
  const fakeProducts = [
    fakeProduct,
    defaultProduct
  ]
  const currencies = [
    {value: `USD`, label: `USD`},
    {value: `EUR`, label: `EUR`},
  ]
  const languages = [
    {value: `fr`, label: `français`},
    {value: `en`, label: `english`},
  ]
  const submitMessage = isSaving ? `saving…` : `update`

  return (
    <Form
      id={ `${BASE_CLASS}` }
      action={ `/users/${formData.id}` }
      isSaving={ isSaving === true }
      onChange={ handleFormChange }
      onSubmit={ handleSubmit }
    >
      <input type="hidden" name="id" defaultValue={formData.id} />
      <input type="hidden" name="defaultQuotation[id]" defaultValue={ defaultQuotation.id } />
      <input type="hidden" name="defaultInvoice[id]" defaultValue={ defaultInvoice.id } />
      <input type="hidden" name="defaultProduct[id]" defaultValue={ defaultInvoice.id } />
      <Tabs>
        <main role="main" className={`${BASE_CLASS}__main`}>

          <TabList>
            <Tab>
              <FormattedMessage id="configuration.tab.from" />
            </Tab>
            <Tab>
              <FormattedMessage id="configuration.tab.default-product" />
            </Tab>
            <Tab>
              <FormattedMessage id="configuration.tab.mentions" />
            </Tab>
            <Tab>
              <FormattedMessage id="configuration.tab.reference" />
            </Tab>
          </TabList>

          {/* USER */}
          <TabPanel>
            <div className={`${BASE_CLASS}__user`}>
              <Select
                name="lang"
                label={intl.formatMessage({ id: `field.language` })}
                value={ formData.lang }
              >{ languages.map( c => (
                <option key={ c.value } value={ c.value }>{ c.label }</option>
              ))}
              </Select>
              <PaperSheet part="top-left">
                <Party title="from" {...formData} />
              </PaperSheet>
              <div className={`${BASE_CLASS}__user-form`}>
                <Input
                  name="name"
                  label={intl.formatMessage({ id: `field.name` })}
                  value={ formData.name }
                />
                <Textarea
                  name="address"
                  label={intl.formatMessage({ id: `field.address` })}
                  value={ formData.address }
                />
              </div>
            </div>
          </TabPanel>

          {/* PRODUCT */}
          <TabPanel>
            <div className={`${BASE_CLASS}__product`}>
              <div className={`${BASE_CLASS}__product-form`}>
                <Textarea
                  name="defaultProduct[description]"
                  label={intl.formatMessage({ id: `field.description` })}
                  value={ defaultProduct.description }
                />
                <Input
                  name="defaultProduct[quantity]"
                  label={intl.formatMessage({ id: `field.quantity` })}
                  type="number"
                  value={ defaultProduct.quantity }
                />
                <Input
                  name="defaultQuotation[tax]"
                  label={intl.formatMessage({ id: `field.tax` })}
                  type="number"
                  value={ defaultQuotation.tax }
                />
                <Select
                  name="defaultQuotation[currency]"
                  label={intl.formatMessage({ id: `field.currency` })}
                  value={ defaultQuotation.currency }
                >{ currencies.map( c => (
                  <option key={ c.value } value={ c.value }>{ c.label }</option>
                ))}
                </Select>
              </div>
              <PaperSheet part="center">
                <ProductTable
                  products={ fakeProducts }
                  tax={ defaultQuotation.tax }
                  currency={ defaultQuotation.currency }
                >
                  <ProductLine readOnly
                    product={ fakeProduct }
                    currency={ defaultQuotation.currency }
                  />
                  <ProductLine readOnly
                    product={ defaultProduct }
                    currency={ defaultQuotation.currency }
                  />
                </ProductTable>
              </PaperSheet>
            </div>
          </TabPanel>

          {/* MENTIONS */}
          <TabPanel>
            <div className={`${BASE_CLASS}__mentions`}>
              <Textarea
                name="defaultQuotation[mentions]"
                label={intl.formatMessage({ id: `configuration.mentions.quotations` })}
                value={ defaultQuotation.mentions }
              />
              <PaperSheet part="bottom">
                <Mentions content={ defaultQuotation.mentions }/>
              </PaperSheet>
              <Textarea
                name="defaultInvoice[mentions]"
                label={intl.formatMessage({ id: `configuration.mentions.invoices` })}
                value={ defaultInvoice.mentions }
              />
              <PaperSheet part="bottom">
                <Mentions content={ defaultInvoice.mentions }/>
              </PaperSheet>
            </div>
          </TabPanel>

          {/* REFERENCES */}
          <TabPanel>
            <p className={`${BASE_CLASS}__warning`}>
              <FormattedHTMLMessage id="configuration.reference.warning" />
            </p>
            <div className={`${BASE_CLASS}__references`}>
              <dl className={`${BASE_CLASS}__references-section`}>
                <dt className={`${BASE_CLASS}__sub-title`}>
                  <FormattedMessage id="page.quotations" />
                </dt>
                <dd className={`${BASE_CLASS}__references-content`}>
                  <div className={`${BASE_CLASS}__references-form`}>
                    <Input
                      name="defaultQuotation[prefix]"
                      label={intl.formatMessage({ id: `field.prefix` })}
                      value={ defaultQuotation.prefix }
                    />
                    <Input
                      name="defaultQuotation[startAt]"
                      label={intl.formatMessage({ id: `field.start-at` })}
                      value={ defaultQuotation.startAt }
                      type="number"
                      min="0"
                      step="1"
                    />
                  </div>
                  <PaperSheet part="top-right">
                    <Reference {...fakeQuotationReference} />
                  </PaperSheet>
                </dd>
              </dl>
              <dl className={`${BASE_CLASS}__references-section`}>
                <dt className={`${BASE_CLASS}__sub-title`}>
                  <FormattedMessage id="page.invoices" />
                </dt>
                <dd className={`${BASE_CLASS}__references-content`}>
                  <div className={`${BASE_CLASS}__references-form`}>
                    <Input
                      name="defaultInvoice[prefix]"
                      label={intl.formatMessage({ id: `field.prefix` })}
                      value={ defaultInvoice.prefix }
                    />
                    <Input
                      name="defaultInvoice[startAt]"
                      label={intl.formatMessage({ id: `field.start-at` })}
                      value={ defaultInvoice.startAt }
                      type="number"
                      min="0"
                      step="1"
                    />
                  </div>
                  <PaperSheet part="top-right">
                    <Reference {...fakeInvoiceReference} />
                  </PaperSheet>
                </dd>
              </dl>
            </div>
          </TabPanel>

          {/* ACTIONS */}
          <div className={`${BASE_CLASS}__actions`}>
            <Button type="submit">
              <FormattedMessage id="configuration.button.save" />
            </Button>
          </div>

        </main>
      </Tabs>
    </Form>
  )
}

export default injectIntl( UserFormPres )
