import React, { useMemo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SelectField from './Select'
import DragDropList from '../../widgets/DragDropList'

import childrenUtils from '../../../utils/children'
import contentSelectors from '../../../store/selectors/content'
import icons from '../../../icons'

const MoveIcon = icons.movevert
const useStyles = makeStyles(theme => ({
  dragDropRoot: {
    border: '1px solid #cccccc',
  },
}))

const SortingEditorTypeEditor = ({
  value,
  onChange,
}) => {

  const fieldConfig = useMemo(() => {
    return {
      name: 'sortType',
      value,
      onChange: (e) => onChange(e.target.value),
    }
  }, [value, onChange])

  const item = useMemo(() => ({
    title: 'Sort Contents By',
    helperText: 'Choose the method by which the contents will be sorted',
    options: [{
      title: 'Manually (drag and drop)',
      value: 'manual',
    }, {
      title: 'By Name',
      value: 'name',
    }, {
      title: 'By Date',
      value: 'date',
    }]
  }), [])

  return (
    <SelectField
      field={ fieldConfig }
      item={ item }
    />
  )
}

const SortingEditorDirectionEditor = ({
  value,
  onChange,
}) => {

  const fieldConfig = useMemo(() => {
    return {
      name: 'direction',
      value,
      onChange: (e) => onChange(e.target.value),
    }
  }, [value, onChange])

  const item = useMemo(() => ({
    title: 'Sort Contents Direction',
    helperText: 'Choose the direction the contents will be sorted in',
    options: [{
      title: 'Ascending',
      value: 'asc',
    },{
      title: 'Descending',
      value: 'desc',
    }]
  }), [])
  
  return (
    <SelectField
      field={ fieldConfig }
      item={ item }
    />
  )
}

const SortingEditorDragDropEditor = ({
  id,
  value,
  onChange,
}) => {

  const classes = useStyles()
  const itemChildrenSelector = useMemo(contentSelectors.itemChildren, [])
  const children = useSelector(state => itemChildrenSelector(state, id))
  const getTitle = useCallback((item, i) => `${i + 1}. ${item.name}`, [])
  const items = useMemo(() => {
    return childrenUtils
      .sortById({
        items: children,
        ids: value,
      })
  }, [
    children,
    value,
  ])

  return (
    <div>
      <Typography gutterBottom>
        Drag and drop the items into the order you want them to appear...
      </Typography>
      <DragDropList
        items={ items }
        theme={{
          root: classes.dragDropRoot,
        }}
        getTitle={ getTitle }
        IconClass={ MoveIcon }
        onChange={ onChange }
      />
    </div>
  )
}

const SortingEditor = ({
  field: {
    name,
    value = {},
  },
  values,
  onSetFieldValue,
}) => {
  const useType = value.type || 'name'
  const useDirection = value.direction || 'asc'
  const useIds = value.ids || []
  const editId = values.id
  
  const onUpdate = (updates = {}) => {
    onSetFieldValue(name, Object.assign({}, value, updates))
  }

  const editor = useMemo(() => {
    return useType == 'manual' ? (
      <SortingEditorDragDropEditor
        id={ editId }
        value={ useIds }
        onChange={ (ids) => onUpdate({ids}) }
      />
    ) : (
      <SortingEditorDirectionEditor
        value={ useDirection }
        onChange={ (direction) => onUpdate({direction}) }
      />
    )
  }, [value])

  return (
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 } sm={ 6 }>
        <SortingEditorTypeEditor
          value={ useType }
          onChange={ (type) => onUpdate({type}) }
        />
      </Grid>
      <Grid item xs={ 12 } sm={ 6 }>
        {
          editor
        }
      </Grid>
    </Grid>
  )
}

export default SortingEditor
