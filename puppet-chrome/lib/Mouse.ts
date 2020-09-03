import { CDPSession } from '../process/CDPSession';
import { Keyboard } from './Keyboard';

/**
 * The Mouse class operates in main-frame CSS pixels
 * relative to the top-left corner of the viewport.
 * @remarks
 * Every `page` object has its own Mouse, accessible with [`page.mouse`](#pagemouse).
 *
 * @example
 * ```js
 * // Using ‘page.mouse’ to trace a 100x100 square.
 * await page.mouse.move(0, 0);
 * await page.mouse.down();
 * await page.mouse.move(0, 100);
 * await page.mouse.move(100, 100);
 * await page.mouse.move(100, 0);
 * await page.mouse.move(0, 0);
 * await page.mouse.up();
 * ```
 *
 * **Note**: The mouse events trigger synthetic `MouseEvent`s.
 * This means that it does not fully replicate the functionality of what a normal user
 * would be able to do with their mouse.
 *
 * For example, dragging and selecting text is not possible using `page.mouse`.
 * Instead, you can use the {@link https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/getSelection | `DocumentOrShadowRoot.getSelection()`} functionality implemented in the platform.
 *
 * @example
 * For example, if you want to select all content between nodes:
 * ```js
 * await page.evaluate((from, to) => {
 *   const selection = from.getRootNode().getSelection();
 *   const range = document.createRange();
 *   range.setStartBefore(from);
 *   range.setEndAfter(to);
 *   selection.removeAllRanges();
 *   selection.addRange(range);
 * }, fromJSHandle, toJSHandle);
 * ```
 * If you then would want to copy-paste your selection, you can use the clipboard api:
 * ```js
 * // The clipboard api does not allow you to copy, unless the tab is focused.
 * await page.bringToFront();
 * await page.evaluate(() => {
 *   // Copy the selected content to the clipboard
 *   document.execCommand('copy');
 *   // Obtain the content of the clipboard as a string
 *   return navigator.clipboard.readText();
 * });
 * ```
 * **Note**: If you want access to the clipboard API,
 * you have to give it permission to do so:
 * ```js
 * await browser.defaultBrowserContext().overridePermissions(
 *   '<your origin>', ['clipboard-read', 'clipboard-write']
 * );
 * ```
 * @public
 */
export default class Mouse {
  private cdpSession: CDPSession;
  private keyboard: Keyboard;
  private x = 0;
  private y = 0;
  private button: MouseButton | 'none' = 'none';

  constructor(cdpSession: CDPSession, keyboard: Keyboard) {
    this.cdpSession = cdpSession;
    this.keyboard = keyboard;
  }

  /**
   * Dispatches a `mousemove` event.
   * @param x - Horizontal position of the mouse.
   * @param y - Vertical position of the mouse.
   * @param options - Optional object. If specified, the `steps` property
   * sends intermediate `mousemove` events when set to `1` (default).
   */
  async move(x: number, y: number, options: { steps?: number } = {}): Promise<void> {
    const { steps = 1 } = options;
    const fromX = this.x;
    const fromY = this.y;
    this.x = x;
    this.y = y;
    for (let i = 1; i <= steps; i += 1) {
      await this.cdpSession.send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        button: this.button,
        x: fromX + (this.x - fromX) * (i / steps),
        y: fromY + (this.y - fromY) * (i / steps),
        modifiers: this.keyboard.modifiers,
      });
    }
  }

  /**
   * Shortcut for `mouse.move`, `mouse.down` and `mouse.up`.
   * @param x - Horizontal position of the mouse.
   * @param y - Vertical position of the mouse.
   * @param options - Optional `MouseOptions`.
   */
  async click(
    x: number,
    y: number,
    options: MouseOptions & { delay?: number } = {},
  ): Promise<void> {
    const { delay = null } = options;
    if (delay !== null) {
      await Promise.all([this.move(x, y), this.down(options)]);
      await new Promise(resolve => setTimeout(resolve, delay));
      await this.up(options);
    } else {
      await Promise.all([this.move(x, y), this.down(options), this.up(options)]);
    }
  }

  /**
   * Dispatches a `mousedown` event.
   * @param options - Optional `MouseOptions`.
   */
  async down(options: MouseOptions = {}): Promise<void> {
    const { button = 'left', clickCount = 1 } = options;
    this.button = button;
    await this.cdpSession.send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      button,
      x: this.x,
      y: this.y,
      modifiers: this.keyboard.modifiers,
      clickCount,
    });
  }

  /**
   * Dispatches a `mouseup` event.
   * @param options - Optional `MouseOptions`.
   */
  async up(options: MouseOptions = {}): Promise<void> {
    const { button = 'left', clickCount = 1 } = options;
    this.button = 'none';
    await this.cdpSession.send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      button,
      x: this.x,
      y: this.y,
      modifiers: this.keyboard.modifiers,
      clickCount,
    });
  }

  /**
   * Dispatches a `mousewheel` event.
   * @param options - Optional: `MouseWheelOptions`.
   *
   * @example
   * An example of zooming into an element:
   * ```js
   * await page.goto('https://mdn.mozillademos.org/en-US/docs/Web/API/Element/wheel_event$samples/Scaling_an_element_via_the_wheel?revision=1587366');
   *
   * const elem = await page.$('div');
   * const boundingBox = await elem.boundingBox();
   * await page.mouse.move(
   *   boundingBox.x + boundingBox.width / 2,
   *   boundingBox.y + boundingBox.height / 2
   * );
   *
   * await page.mouse.wheel({ deltaY: -100 })
   * ```
   */
  async wheel(options: MouseWheelOptions = {}): Promise<void> {
    const { deltaX = 0, deltaY = 0 } = options;
    await this.cdpSession.send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: this.x,
      y: this.y,
      deltaX,
      deltaY,
      modifiers: this.keyboard.modifiers,
      pointerType: 'mouse',
    });
  }
}

/**
 * @public
 */
export type MouseButton = 'left' | 'right' | 'middle';

/**
 * @public
 */
export interface MouseOptions {
  button?: MouseButton;
  clickCount?: number;
}

/**
 * @public
 */
export interface MouseWheelOptions {
  deltaX?: number;
  deltaY?: number;
}
