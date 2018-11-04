import { Slot as $$ } from 'rimple'
export const account = $$(null).tag('account')
export const title = $$('foo').tag('title')

const KEY_USER = 'USER'
export const saveAccount = function saveAccount (account) {
  window.localStorage.setItem(KEY_USER, JSON.stringify(account))
}

export const loadAccount = function loadAccount (account) {
  let user = window.localStorage.getItem(KEY_USER)
  if (user) {
    user = JSON.parse(user)
  }
  return user
}

export const clearAccount = function clearAccount () {
  window.localStorage.removeItem(KEY_USER)
}
