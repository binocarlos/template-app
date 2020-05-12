import React, { useMemo } from 'react'
import withMenuButton from '../hooks/withMenuButton'

const MenuButton = ({
  // the classname for the root item
  className,
  // a function that is called (onClick) to render the button
  getButton,
  ...props
}) => {

  const {
    menus,
    onClick,
  } = withMenuButton(props)
  
  const button = useMemo(
    () => getButton(onClick),
    [
      getButton,
      onClick,
    ]
  )

  return (
    <div className={ className }>
      { button }
      { menus }
    </div>
  )
}

export default MenuButton