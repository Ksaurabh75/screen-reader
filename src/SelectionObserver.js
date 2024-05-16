class ListenerCollection {
    constructor() {
      this._listeners = new Map();
    }
  
    /**
     * Add a listener and return an ID that can be used to remove it later
     */
    add(eventTarget, eventType, listener, options) {
      eventTarget.addEventListener(eventType, listener, options);
      const symbol = Symbol();
      this._listeners.set(symbol, {
        eventTarget,
        eventType,
        listener,
        options,
      });
      return symbol;
    }
  
    /**
     * Remove a specific listener.
     */
    remove(listenerId) {
      const event = this._listeners.get(listenerId);
      if (event) {
        const { eventTarget, eventType, listener, options } = event;
        eventTarget.removeEventListener(eventType, listener, options);
        this._listeners.delete(listenerId);
      }
    }
  
    removeAll() {
      this._listeners.forEach(({ eventTarget, eventType, listener, options }) => {
        eventTarget.removeEventListener(eventType, listener, options);
      });
      this._listeners.clear();
    }
  }

function unionRanges(a, b) {
    const result = document.createRange();
  
    if (a.compareBoundaryPoints(Range.START_TO_START, b) <= 0) {
      result.setStart(a.startContainer, a.startOffset);
    } else {
      result.setStart(b.startContainer, b.startOffset);
    }
  
    if (a.compareBoundaryPoints(Range.END_TO_END, b) >= 0) {
      result.setEnd(a.endContainer, a.endOffset);
    } else {
      result.setEnd(b.endContainer, b.endOffset);
    }
  
    return result;
  }
function selectedRange(selection) {
    selection = selection || document.getSelection();
  
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
  
    let range = selection.getRangeAt(0);
  
    // Work around a Firefox issue [1] where a selection can have multiple ranges,
    // in contradiction to the Selection API [2] spec. The workaround is to
    // union the ranges to produce the same single range as other browsers.
    //
    // [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1773065
    // [2] https://w3c.github.io/selection-api/#dom-selection-rangecount
    for (let i = 1; i < selection.rangeCount; i++) {
      range = unionRanges(range, selection.getRangeAt(i));
    }
  
    if (range.collapsed) {
      return null;
    }
    return range;
  }
  

/**
 * An observer that watches for and buffers changes to the document's current selection.
 */
export class SelectionObserver {
  /** Tracks the timeout ID of the last scheduled callback */
  constructor(callback, nodeElement, document_ = document) {
    let isMouseDown = false;

    this._pendingCallback = null;

    const scheduleCallback = (delay = 10) => {
      this._pendingCallback = setTimeout(() => {
        callback(selectedRange(document_.getSelection()));
      }, delay);
    };

    const eventHandler = (event) => {
      if (event.type === "mousedown") {
        isMouseDown = true;
      }
      if (event.type === "mouseup") {
        isMouseDown = false;
      }

      // If the user makes a selection with the mouse, wait until they release
      // it before reporting a selection change.
      if (isMouseDown) {
        return;
      }

      this._cancelPendingCallback();

      // Schedule a notification after a short delay. The delay serves two
      // purposes:
      //
      // - If this handler was called as a result of a 'mouseup' event then the
      //   selection will not be updated until the next tick of the event loop.
      //   In this case we only need a short delay.
      //
      // - If the user is changing the selection with a non-mouse input (eg.
      //   keyboard or selection handles on mobile) this buffers updates and
      //   makes sure that we only report one when the update has stopped
      //   changing. In this case we want a longer delay.

      const delay = event.type === "mouseup" ? 10 : 100;
      scheduleCallback(delay);
    };

    const handleOutsideClick = (event) => {
      const portalElement = document.getElementById(
        "collab-widget-portal"
      );

      if (
        !nodeElement.contains(event.target) &&
        !portalElement?.contains(event.target)
      ) {
        const selection = document_.getSelection();

        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          if (range.intersectsNode(nodeElement)) {
            const delay = event.type === "mouseup" ? 10 : 100;
            scheduleCallback(delay);
          }
        }
      }
    };

    this._document = document_;
    this._nodeElement = nodeElement;
    this._listeners = new ListenerCollection();

    this._listeners.add(nodeElement, "selectionchange", eventHandler);

    // Mouse events are handled on the body because propagation may be stopped
    // before they reach the document in some environments (eg. VitalSource).
    this._listeners.add(document_, "mouseup", handleOutsideClick);
    this._listeners.add(nodeElement, "mousedown", eventHandler);
    this._listeners.add(nodeElement, "mouseup", eventHandler);

    // Report the initial selection.
    scheduleCallback(1);
  }

  disconnect() {
    this._listeners.removeAll();
    this._cancelPendingCallback();
  }

  _cancelPendingCallback() {
    if (this._pendingCallback) {
      clearTimeout(this._pendingCallback);
      this._pendingCallback = null;
    }
  }
}