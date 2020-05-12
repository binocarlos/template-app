import fields, { defaultValues } from './fields'
import dotty from 'dotty'

const flattenSchema = (schema) => {
  return schema.reduce((all, row) => {
    return row.constructor === Array ?
      all.concat(row) :
      all.concat([row])
  }, [])
}

const getComponent = (component) => {
  let Component = typeof(component) === 'string' ?
      fields[component] :
      component

  if(!Component) Component = fields.text

  return Component
}

const getInitialValues = (schema, initialValues) => {
  const flatSchema = flattenSchema(schema)
  return flatSchema.reduce((all, field) => {
    const existing = dotty.get(all, field.id)
    const component = field.component || 'text'
    if(!existing && field.list) {
      dotty.put(all, field.id, [])
    }
    else if(!existing && typeof(component) === 'string') {
      dotty.put(all, field.id, defaultValues[component])
    }
    return all
  }, Object.assign({}, initialValues))
}

const utils = {
  flattenSchema,
  getComponent,
  getInitialValues,
}

export default utils