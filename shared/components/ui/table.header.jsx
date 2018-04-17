import   React              from 'react'
import { FormattedMessage } from 'react-intl'
import { withRouter       } from 'react-router-dom'

const BASE_CLASS = `table__head`

function Th( props ) {
  const { column, onClick  }  = props
  const { label, order, ...rest } = column
  return (
    <th {...rest} onClick={ onClick }>
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
    const isAscDir  = currentSorting.dir === `ASC`
    if ( isAscDir ) return { sort, dir: `DESC` }
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
    this.setState( prevState => query )
  }

  render() {
    const { columns, match, location } = this.props
    return (
      <thead className={ BASE_CLASS }>
        <tr className={`${BASE_CLASS}_row`}>
          { columns.map( (c, i) => (
            <Th
              key={ i }
              // location={ location }
              // match={ match }
              column={ c }
              onClick={ !c.sort ? null : event => this.handleSort(event, c.sort ) }
            />)) }
        </tr>
      </thead>
    )
  }
}

export const Thead = withRouter( TableThead )

