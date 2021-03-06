import   React    from 'react'
import { Helmet } from 'react-helmet'

import './boarding.scss'
const BASE_CLASS = `boarding`

export default function LayoutBoarding( props ) {
  return (
    <main role="main" className={ `${BASE_CLASS}` }>
      <Helmet>
        <html className="dark-background" />
      </Helmet>
      <div className={ `${BASE_CLASS}__card` }>
        { props.title && (<h2 className={ `${BASE_CLASS}__title` }>{props.title}</h2>) }
        <div  className={ `${BASE_CLASS}__content` }>
          { props.children }
        </div>
      </div>
    </main>
  )
}
