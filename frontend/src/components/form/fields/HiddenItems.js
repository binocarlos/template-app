import React, { useMemo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonList from '../../widgets/ButtonList'

import Actions from '../../../utils/actions'
import contentActions from '../../../store/modules/content'
import contentSelectors from '../../../store/selectors/content'
import icons from '../../../icons'

const HideIcon = icons.hide

const useStyles = makeStyles(theme => ({
  hiddenRoot: {
    border: '1px solid #cccccc',
  },
}))

const HiddenItemsEditor = ({
  values,
}) => {
  const classes = useStyles()

  const actions = Actions(useDispatch(), {
    onShowContent: contentActions.showContent,
  })

  const editId = values.id

  const [ _, section ] = editId.split(':')

  const hiddenItemsSelector = useMemo(contentSelectors.sectionHiddenItems, [])
  const hiddenItems = useSelector(state => hiddenItemsSelector(state, section))

  const getButtons = useCallback((node) => {
    return (
      <Button
        size="small"
        variant="contained"
        onClick={ () => actions.onShowContent({
          id: node.id,
          name: node.name,
        })}
      >
        Show
      </Button>
    )
  }, [])

  return (
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 } sm={ 6 }>
        <Typography>
          Shown is the list of hidden items in this section.
        </Typography>
        <Typography>
          You can choose to re-show items by clicking on the "Show" button for each item.
        </Typography>
      </Grid>
      <Grid item xs={ 12 } sm={ 6 }>
        <ButtonList
          items={ hiddenItems }
          theme={{
            root: classes.hiddenRoot,
          }}
          IconClass={ HideIcon }
          getButtons={ getButtons }
        />
      </Grid>
    </Grid>
  )
}

export default HiddenItemsEditor
