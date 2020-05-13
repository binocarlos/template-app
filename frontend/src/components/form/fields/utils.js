export const getProps = (props) => {
  const handlers = props.handlers || {}
  const newProps = Object.assign({}, props)
  const newField = Object.assign({}, props.field)
  const handlerProps = {
    name: props.field.name,
    value: props.field.value,
    values: props.values,
  }
  newField.value = handlers.value ?
    handlers.value(handlerProps) :
    newField.value
  newProps.disabled = handlers.disabled ?
    handlers.disabled(handlerProps) :
    false
  newProps.field = newField
  return newProps
}