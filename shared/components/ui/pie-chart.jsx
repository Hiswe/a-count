import React, { PureComponent, Fragment } from 'react'

import './pie-chart.scss'
const BASE_CLASS = `pie-chart`

export class PieChart extends PureComponent {
  constructor( props ) {
    super( props )
  }

  static getCoordinates( percent ) {
    const x = Math.cos(2 * Math.PI * percent)
    const y = Math.sin(2 * Math.PI * percent)
    return [ x, y ]
  }

  createSlices() {
    const { slices } = this.props
    let cumulativePercent = 0
    const total = slices.reduce( (total, slice) => slice.value + total, 0 )
    return slices.map( (slice, index) => {
      const percent = slice.value / total
      const [startX, startY] = PieChart.getCoordinates( cumulativePercent )
      // each slice starts where the last slice ended, so keep a cumulative percent
      cumulativePercent = cumulativePercent + percent
      const [endX, endY] = PieChart.getCoordinates( cumulativePercent )
      // if the slice is more than 50%, take the large arc (the long way around)
      const largeArcFlag = percent > .5 ? 1 : 0
      const pathData = [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      ].join(` `)
      return <path key={ index } d={ pathData } />
    })
  }

  createLabels() {
    const { slices } = this.props
    return (
      <ol className={`${BASE_CLASS}__list`}>
        { slices.map( (slice, index) => (
          <li key={index} className={`${BASE_CLASS}__list_item`}>
            { slice.label }
          </li>
        ))}
      </ol>
    )
  }

  render() {
    return (
      <div className={BASE_CLASS}>
        <p className={`${BASE_CLASS}__title`}>{ this.props.title } </p>
        <svg viewBox="-1 -1 2 2" className={`${BASE_CLASS}__pie`}>
          <defs>
            <clipPath id="pie-clip-all">
              <circle cx="0" cy="0" r="1"/>
            </clipPath>
          </defs>
          <g clipPath="url(#pie-clip-all)">
            { this.createSlices() }
          </g>
        </svg>
        { this.createLabels() }
      </div>
    )
  }
}
