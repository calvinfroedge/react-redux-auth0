import consts from 'namespaced-constants'

export const token = "auth.token"
export const profile = "auth.profile"
export const auth = consts('auth')('submitting', 'logout', 'signin', 'error', 'check');
