import React, { PureComponent, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { Percent } from './format.jsx'

import './pie-chart.scss'
const BASE_CLASS = `pie-chart`

// don't repeat the defs on every SVG
export function PieChartDefs( props ) {
  return (
    <svg viewBox="-1 -1 2 2" className={`${BASE_CLASS}__defs`}>
      <defs>
        <clipPath id="pie-clip-all">
          <circle cx="0" cy="0" r="1" />
        </clipPath>
      </defs>
    </svg>
  )
}

export class PieChart extends PureComponent {
  constructor( props ) {
    super( props )

    const total = props.slices.reduce( (total, slice) => slice.value + total, 0 )

    this.state = {
      total,
      slices:  props.slices.map( slice => ({
        value: slice.value,
        label: slice.label,
        percent: slice.value / total,
      })),
    }
  }

  static getCoordinates( percent ) {
    const x = Math.cos(2 * Math.PI * percent)
    const y = Math.sin(2 * Math.PI * percent)
    return [ x, y ]
  }

  createSlices() {
    const { slices } = this.state
    let cumulativePercent = 0
    return slices.map( (slice, index) => {
      const [ startX, startY ] = PieChart.getCoordinates( cumulativePercent )
      // each slice starts where the last slice ended, so keep a cumulative percent
      cumulativePercent = cumulativePercent + slice.percent
      const [endX, endY] = PieChart.getCoordinates( cumulativePercent )
      // if the slice is more than 50%, take the large arc (the long way around)
      const largeArcFlag = slice.percent > .5 ? 1 : 0
      const pathData = [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        // in case we want to make a filled pie-chart
        // `L 0 0`,
      ].join(` `)
      return <path key={ index } d={ pathData } />
    })
  }

  createLabels() {
    const { slices } = this.state
    return (
      <ol className={`${BASE_CLASS}__list`}>
        { slices.map( (slice, index) => (
          <li key={index} className={`${BASE_CLASS}__list_item`}>
            <p className={`${BASE_CLASS}__label`}>
              <FormattedMessage id={ slice.label } />
            </p>
            <Percent className={`${BASE_CLASS}__value`} value={ slice.percent } />
          </li>
        ))}
      </ol>
    )
  }

  render() {
    const { props } = this
    return (
      <div className={BASE_CLASS}>
        <p className={`${BASE_CLASS}__title`}>
          <FormattedMessage id={ props.title } />
        </p>
        <figure className={`${BASE_CLASS}__pie-wrapper`}>
          <svg viewBox="-1 -1 2 2" className={`${BASE_CLASS}__pie`}>
            <g clipPath="url(#pie-clip-all)">
              { this.createSlices() }
            </g>
          </svg>
          { props.children && (
            <figcaption className={`${BASE_CLASS}__pie-caption`}>
              { props.children }
            </figcaption>
          )}
        </figure>
        { this.createLabels() }
      </div>
    )
  }
}