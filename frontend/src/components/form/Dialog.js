import React from 'react'

import Window from '../dialog/Window'
import FormWrapper from './Wrapper'
import Render from './Render'

const FormDialog = ({
  schema,
  handlers = {},
  initialValues,
  error,
  loading,
  onSubmit,
  onCancel,
  ...windowProps
}) => {
  return (
    <FormWrapper
      schema={ schema }
      initialValues={ initialValues }
      handlers={ handlers }
      onSubmit={ onSubmit }
    >
      {
        ({
          isValid,
          values,
          errors,
          showErrors,
          touched,
          onSubmit,
        }) => {
          return (
            <Window
              open
              loading={ loaading }
              disabled={ isValid ? false : true }
              onSubmit={ onSubmit }
              onCancel={ onCancel }
              { ...windowProps }
            >
              <Render
                fullHeight
                schema={ schema }
                handlers={ handlers }
                error={ error }
                isValid={ isValid }
                values={ values }
                errors={ errors }
                touched={ touched }
                showErrors={ showErrors }
                onSubmit={ onSubmit }
                onCancel={ onCloseWindow }
              />
            </Window>
          )
        }
      }
    </FormWrapper>
  )
}

export default FormDialog