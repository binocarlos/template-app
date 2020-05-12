import React from 'react'
import NavDrawer from 'components/widgets/NavDrawer'
import MenuList from 'components/widgets/MenuList'

const SideMenu = ({
  items,
}) => {
  return (
    <NavDrawer
      Component={ MenuList }
      props={{
        items,
      }}
    />
  )
}

export default SideMenu