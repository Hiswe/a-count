import React, { PureComponent } from 'react'

import './secondary.scss'
const BASE_CLASS = `nav-secondary`

export default class NavSecondary extends PureComponent {

  constructor( props ) {
    super( props )
    this.state = {
      isStuck: false,
    }
    this.handleIntersection = this.handleIntersection.bind( this )
  }

  componentDidMount() {
    this.observeIntersection()
  }

  componentWillUnmount() {
    this.unobserveIntersection()
  }

  //----- EVENTS

  handleIntersection( entries ) {
    const sentinelEntry = entries[ 0 ]
    const isStuck = sentinelEntry.intersectionRatio === 0
    this.setState( prevState => {
      return { isStuck }
    })
  }

  //----- UTILS

  observeIntersection() {
    if ( !window.IntersectionObserver ) return
    const { wrapper } = this
    if ( !wrapper ) return
    const sentinel = document.createElement( `div` )
    sentinel.classList.add( `${BASE_CLASS}__sentinel` )
    wrapper.insertBefore( sentinel, wrapper.firstChild )
    this.observer = new IntersectionObserver( this.handleIntersection )
    this.observer.observe( sentinel )
  }

  unobserveIntersection() {
    if ( !window.IntersectionObserver ) return
    this.observer.disconnect()
  }

  render() {
    const { title, children } = this.props
    const { isStuck } = this.state
    const stickyClass = [ `${BASE_CLASS}__sticky` ]
    if ( isStuck ) stickyClass.push( `${ stickyClass[ 0 ] }--is-stuck` )
    return (
      <header className={ BASE_CLASS } ref={ el => this.wrapper = el } >
        <div className={ stickyClass.join(' ') }>
          { title && (
            <h2 className={`${BASE_CLASS}__title`}>{title}</h2>
          ) }
          { children && (
            <div className={`${BASE_CLASS}__actions`}>
              { children }
            </div>
          )}
        </div>
      </header>
    )
  }
}
