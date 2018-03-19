import React from 'react'
import marked from 'marked'

import './markdown.scss'

export default function Markdown( props ) {
  const { text }  = props
  const isText    = typeof text === `string`
  const __html    = isText ? marked( text, {breaks: true} ) : ``
  return (
    <div className="markdown" dangerouslySetInnerHTML={{__html}} />
  )
}
