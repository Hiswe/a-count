import   React              from 'react'
import   classNames         from 'classnames'
import { FormattedMessage } from 'react-intl'
import { withRouter       } from 'react-router-dom'

import { Icon } from './svg-icons'

const BASE_CLASS = `table__head`

function Th( props ) {
  const {
    column,
    onClick,
    isSorted,
    dir,
  }  = props
  const { label, sort, type, ...rest } = column

  const COMP_CLASS = classNames(
    `${BASE_CLASS}_col`,
    type.split(` `).map(t => `${BASE_CLASS}_col--is-${ t }`),
  )

  return (
    <th {...rest} onClick={ onClick } className={ COMP_CLASS }>
      { isSorted && <Icon svgId={ dir === `ASC` ? `arrow-upward` : `arrow-downward` } /> }
      { label && <FormattedMessage id={label.trim()} /> }
    </th>
  )
}

export class TableThead extends React.PureComponent {

  constructor( props ) {
    super( props )

    this.state = {}
    this.handleSort = this.handleSort.bind( this )
  }

  static computeSortQuery( currentSorting, sort ) {
    const isSameSort = currentSorting.sort === sort
    if ( !isSameSort ) return { sort, dir: `ASC` }
    const isAscDir   = currentSorting.dir === `ASC`
    if ( isAscDir )    return { sort, dir: `DESC` }
    return {}
  }

  handleSort( event, sort ) {
    event.preventDefault()
    if ( !sort ) return
    const { handlePageSort, match } = this.props
    if ( !handlePageSort ) return
    const query = Thead.computeSortQuery( this.state, sort )
    handlePageSort({
      query,
      ...match.params,
    })
    this.setState( prevState => ({
      sort: query.sort,
      dir:  query.dir,
    }))
  }

  render() {
    const { columns, match, location } = this.props
    const { sort, dir } = this.state
    return (
      <thead className={ BASE_CLASS }>
        <tr className={`${BASE_CLASS}_row`}>
          { columns.map( (c, i) => (
            <Th
              key={ i }
              column={ c }
              isSorted={ c.sort && sort === c.sort }
              dir={ dir }
              onClick={ !c.sort ? null : event => this.handleSort(event, c.sort ) }
            />)) }
        </tr>
      </thead>
    )
  }
}

export const Thead = withRouter( TableThead )
