import React from 'react'

import './tabs.scss'
const BASE_CLASS = `tabs`

export function Tabs( props ) {
  return (
    <div className={ BASE_CLASS }>
      { props.children }
    </div>
  )
}
export { Tabs as Wrapper }

export class TabList extends React.PureComponent {

  constructor( props ) {
    super( props )

    this.tabsIds = []
    this.makeTabs()

    this.state = {
      selected: 0,
    }

    this.handleChange = this.handleChange.bind( this )
  }

  handleChange( event ) {
    // we don't want the event to leak to main form
    event.stopPropagation()
    // change tab ^^
    const { value } = event.target
    this.setState( prevState => {
      return { selected: parseInt( value, 10 ) }
    })
  }

  makeTabs() {
    let count = 0
    this.tabsContent = React.Children.map( this.props.children, child => {
      const isTab = child.type === Tab
      if ( !isTab ) return child
      count     = count + 1
      const id  = `tabs-${count}`
      this.tabsIds.push( id )
      return React.cloneElement( child, {htmlFor: id} )
    })
  }

  render() {
    return (
      <React.Fragment>

        { this.tabsIds.map( (id, index) => (
          <input
            className={`${BASE_CLASS}__input`}
            key={ id }
            type="radio"
            name="tabs"
            value={ index }
            id={ id }
            checked={ index === this.state.selected }
            onChange={ this.handleChange }
          />
        )) }
        <header className={`${BASE_CLASS}__list`}>
          { this.tabsContent }
        </header>
      </React.Fragment>
    )
  }
}
export { TabList as List }

export function TabListHeader( props ) {
  return (
    <div className={`${BASE_CLASS}__list_header`}>
      { props.children }
    </div>
  )
}
export { TabListHeader as Header }

export function Tab( props ) {
  return (
    <label className={`${BASE_CLASS}__list_tab`} {...props}>
      { props.children }
    </label>
  )
}

export function TabPanel( props ) {
  return (
    <section className={`${BASE_CLASS}__panel`}>
      { props.children }
    </section>
  )
}
export { TabPanel as Panel }
