import React from 'react'

const LayoutOnboard = props => (
  <main className="main main--with-onboard">
    <div className="onboard">
      { props.title && (<h2 className="onboard__title">{props.title}</h2>) }
      <div className="onboard__content">
        { props.children }
      </div>
    </div>
  </main>
)

export default LayoutOnboard
