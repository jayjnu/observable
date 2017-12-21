export interface destination {
  next?: <T>(arg: T) => void
  error?: <T>(arg: T) => void
  complete?: <T>(arg: T) => void
}

export class SafeObserver {
  destination: destination
  isUnsubscribed?: boolean
  unsub?: () => void
  constructor(destination: destination) {
    this.destination = destination
  }

  next<T>(value:T) {
    if (this.isUnsubscribed && this.destination.next) {
      try {
        this.destination.next(value)
      } catch(err) {
        this.unsubscribe()
        throw err
      }
    }
  }

  error(err: Error) {
    if (!this.isUnsubscribed && this.destination.error) {
      try {
        this.destination.error(err)
      } catch (e2) {
        this.unsubscribe()
        throw e2
      }
      this.unsubscribe()
    }
  }

  complete() {

  }

  unsubscribe() {
    this.isUnsubscribed = true
    if (this.unsub) {
      this.unsub()
    }
  }
}