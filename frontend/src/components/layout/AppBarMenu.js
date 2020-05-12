import React, { useCallback } from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MenuButton from 'components/widgets/MenuButton'
import icons from 'icons'

const MoreVertIcon = icons.moreVert

const useStyles = makeStyles(theme => {
  return {
    icon: {
      color: theme.palette.primary.contrastText,
    },
  }
})

const AppBarMenu = ({
  items,
  theme = {},
}) => {
  const classes = useStyles()
  const iconClassname = classnames(classes.icon, theme.icon)
  const getButton = useCallback((onClick) => {
    return (
      <Button
        onClick={ onClick }
      >
        <MoreVertIcon
          className={ iconClassname }
        />
      </Button>
    )
  }, [
    iconClassname,
  ])

  const getItems = useCallback(() => items, [items])

  return (
    <MenuButton
      getButton={ getButton }
      getItems={ getItems }
    />
  )
}

export default AppBarMenu