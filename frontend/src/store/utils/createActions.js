import CreateAction from './createAction'

const CreateActions = ({
  prefix,
  reducers,
  sideEffects,
}) => {
  const reducerActions = Object.keys(reducers || {}).reduce((all, key) => {
    all[key] = CreateAction(prefix ? `${prefix}/${key}` : key)
    return all
  }, {})

  const sideEffectActions = Object.keys(sideEffects || {}).reduce((all, key) => {
    const handler = sideEffects[key]

    if(typeof(handler) === 'string') {
      all[key] = CreateAction(prefix ? `${prefix}/${handler}` : handler)
    }
    else if(typeof(handler) === 'function') {
      all[key] = handler
    }
    else {
      throw new Error(`unknown sideEffect type for ${key} of type ${typeof(handler)}`)
    }
    
    return all
  }, {})

  return Object.assign({}, reducerActions, sideEffectActions)
}

export default CreateActions