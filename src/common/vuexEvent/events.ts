
function Events () {}
Events.prototype.events = {}
Events.prototype.on = function (evt, callback) {
  if (!callback || !evt) return this
  this.events[evt] = this.events[evt] || []
  this.events[evt].push(callback)
  return this
}
Events.prototype.once = function (evt, callback) {
  let that = this
  let cb = function () {
    that.off(evt, cb)
    callback(arguments)
  }
  return this.on(evt, cb)
}
Events.prototype.off = function (evt, callback) {
  if (!evt) {
    return this
  }
  let events = this.events[evt]
  if (!callback) {
    delete this.events[evt]
  } else {
    for (let i = 0; i < events.length; i++) {
      if (events[i] === callback) {
        events.splice(i, 1)
        return this
      }
    }
  }
}
Events.prototype.trigger = function (evt, ...arg) {
  let events = this.events[evt]
  if (!evt || !events) return this
  let len = events.length
  for (let i = 0; i < len; i++) {
    events[i](...arg)
  }
}

Events.prototype.emit = Events.prototype.trigger
Events.mixTo = function (receiver) {
  let proto = Events.prototype
  if (isFunction(receiver)) {
    for (let k in proto) {
      if (proto.hasOwnProperty(k)) {
        receiver.prototype[k] = proto[k]
      }
    }
  } else {
    for (let k in proto) {
      if (proto.hasOwnProperty(k)) {
        receiver[k] = proto[k]
      }
    }
  }
}
function isFunction (func) {
  return Object.prototype.toString.call(func) === '[object Function]'
}
export default Events
