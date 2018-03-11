import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const ButtonList = () => (
  <Link to="/customers" className="btn-secondary">list</Link>
)

const ButtonNew = () => (
  <Link to="/customers/new" className="btn-secondary">new</Link>
)

export {
  ButtonList,
  ButtonNew,
}
