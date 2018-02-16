import React from 'react'

const Settings = props => {
  return (
    <div>
      <h1>Settings</h1>
      <section>
        <h1>Reset</h1>
        <form method="post" action="/reset">
          <button className="btn" type="submit">yes sure</button>
        </form>
      </section>
    </div>
  )
}

export { Settings as default }
