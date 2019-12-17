
import events from './events'
export default function (store) {
  events.mixTo(store)
  store.registerModule('myEvents', {
    mutations: {
      setEvent () {
      }
    }
  })
  store.$emit = function (evt, ...arg) {
    if (!this.events[evt]) return
    this.trigger(evt, ...arg)
    this.commit('setEvent', evt)
  }
}
