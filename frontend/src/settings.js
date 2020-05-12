import snackbarActions from 'store/modules/snackbar'

export const MENU = [{
  title: 'Home',
  link: 'home',
}, {
  title: 'Help',
  link: 'help',
}, {
  title: 'Store handler',
  handler: (dispatch, getState) => {
    dispatch(snackbarActions.setSuccess('menu item clicked'))
  },
}]

const settings = {
  MENU,
}

export default settings