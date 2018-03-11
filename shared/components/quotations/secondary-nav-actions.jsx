import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const ButtonList = () => (
  <Link to="/quotations" className="btn-secondary">list</Link>
)

const ButtonNew = () => (
  <Link to="/quotations/new" className="btn-secondary">new</Link>
)

export {
  ButtonList,
  ButtonNew,
}
