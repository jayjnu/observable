import { SafeObserver, destination } from './SafeObserver'

export type subscribe = (observer: SafeObserver) => void

export class Observable{
  _subscribe: subscribe
  constructor(_subscribe: subscribe) {
    this._subscribe = _subscribe
  }

  subscribe(observer: destination) {
    const safeObserver = new SafeObserver(observer)
    return this._subscribe(safeObserver)
  }
}