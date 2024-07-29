import EventEmitter from "eventemitter3";
import { AnyFunction } from "~shared/types/util-types";

class PostEventObserver extends EventEmitter {
  constructor() {
    super();
  }

  public addListenerRemovable(eventType: string, listener: AnyFunction) {
    this.addListener(eventType, listener);
    return () => {
      this.removeListener(eventType, listener);
    };
  }
}
export const postEventObserver = new PostEventObserver();
