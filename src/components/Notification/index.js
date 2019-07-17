import Notification from './Notification'
import { emit } from './emitter'
import { SHOW } from './event'

export const Toast = message => {
  emit(SHOW, message)
}

export default Notification