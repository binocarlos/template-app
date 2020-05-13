import React from 'react'

import Window from '../dialog/Window'
import FormWrapper from './Wrapper'
import Render from './Render'

const FormDialog = ({
  schema,
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
          onSetFieldValue,
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
                error={ error }
                isValid={ isValid }
                values={ values }
                errors={ errors }
                touched={ touched }
                showErrors={ showErrors }
                onSubmit={ onSubmit }
                onCancel={ onCloseWindow }
                onSetFieldValue={ onSetFieldValue }
              />
            </Window>
          )
        }
      }
    </FormWrapper>
  )
}

export default FormDialog