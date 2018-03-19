import React from 'react'

import './onboard.scss'

const LayoutOnboard = props => (
  <main role="main" className="onboard">
    <div className="onboard__card">
      { props.title && (<h2 className="onboard__title">{props.title}</h2>) }
      <div className="onboard__content">
        { props.children }
      </div>
    </div>
  </main>
)

export default LayoutOnboard
