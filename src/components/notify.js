import {
  alert,
  error,
  info,
  defaultModules,
  success,
  defaults,
} from '../../node_modules/@pnotify/core/dist/PNotify.js'
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/Angeler.css'
import '@pnotify/core/Material.css'
import '@pnotify/mobile/dist/PNotifyMobile.css'
import * as PNotifyMobile from '@pnotify/mobile'

defaults.styling = 'angeler'
defaults.icons = 'angeler'
defaults.delay = 800
defaults.sticker = false
defaults.animateSpeed = 'slow'
defaults.shadow = false

export function notifyAlert(txt) {
  alert({
    text: txt,
    modules: new Map([
      ...defaultModules,
      [
        PNotifyMobile,
        {
          swipeDismiss: true,
        },
      ],
    ]),
  })
}
export function notifyError(txt) {
  error({
    text: txt,
    delay: 4000,
    modules: new Map([
      ...defaultModules,
      [
        PNotifyMobile,
        {
          swipeDismiss: true,
        },
      ],
    ]),
  })
}
export function notifyInfo(txt) {
  info({
    text: txt,
    modules: new Map([
      ...defaultModules,
      [
        PNotifyMobile,
        {
          swipeDismiss: true,
        },
      ],
    ]),
  })
}
export function notifySuccess(txt) {
  success({
    text: txt,
    delay: 1200,
    modules: new Map([
      ...defaultModules,
      [
        PNotifyMobile,
        {
          swipeDismiss: true,
        },
      ],
    ]),
  })
}
