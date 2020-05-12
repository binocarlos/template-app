import React from 'react'
import TextField from './Text'

const TextArea = (props) => {
  const item = props.item

  const inputProps = Object.assign({}, item.inputProps, {
    multiline: true,
    rows: item.rows || 3,
  })

  const useItem = Object.assign({}, item, {
    inputProps,
  })

  const useProps = Object.assign({}, props, {
    item: useItem,
  })

  return (
    <TextField
      { ...useProps }
    />
  )
}

export default TextArea