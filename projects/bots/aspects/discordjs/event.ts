/**
* @format
* -----
* Project: @eventiva/eventiva
* File: event.ts
* Path: \projects\bots\aspects\discordjs\event.ts
* Created Date: Monday, January 29th 2024
* Author: Jonathan Stevens, jonathan@resnovas.com
* Github: https://github.com/TGTGamer
* -----
* Contributing: Please read through our contributing guidelines.
* Included are directions for opening issues, coding standards,
* and notes on development. These can be found at
* https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
* -----
* Code of Conduct: This project abides by the Contributor Covenant, v2.0
* Please interact in ways that contribute to an open, welcoming, diverse,
* inclusive, and healthy community. Our Code of Conduct can be found at
* https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
* -----
* Copyright (c) 2024 Resnovas - All Rights Reserved
* LICENSE: Creative Commons Zero v1.0 Universal (CC0-1.0)
* -----
* This program has been provided under confidence of the copyright holder and
* is licensed for copying, distribution and modification under the terms of
* the Creative Commons Zero v1.0 Universal (CC0-1.0) published as the License,
* or (at your option) any later version of this license.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* Creative Commons Zero v1.0 Universal for more details.
* You should have received a copy of the Creative Commons Zero v1.0 Universal
* along with this program. If not, please write to: jonathan@resnovas.com,
* or see https://creativecommons.org/publicdomain/zero/1.0/legalcode
* -----
* DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
*/

import type { ClientEvents, Awaitable } from 'discord.js';
import type { DiscordjsNode } from './discordjs.node.runtime';
import type { SlotRegistry } from '@bitdev/harmony.harmony';


/**
 * The interface ExtendedClientEvents extends the ClientEvents interface and includes additional events for logging levels: debug, trace, info, warn, fatal, alert, and emergency. Each event has a single parameter 'message' of type string.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @interface ExtendedClientEvents
 * @typedef {ExtendedClientEvents}
 * @extends {ClientEvents}
 */
export interface ExtendedClientEvents extends ClientEvents {
  /**
   * The `debug` property is a method that takes a `message` parameter of type string. It is used for debugging purposes and can be used to log messages to the console.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {[message: string]}
   */
  debug: [message: string];
  /**
   * An array that stores trace messages. Each message is a string.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {[message: string]}
   */
  trace: [message: string];
  /**
   * A property that holds information in the form of a message. The message is of type string.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {[message: string]}
   */
  info: [message: string];
  /**
   * The `warn` property is a function that accepts a `message` of type string. It is used to log warning messages.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {[message: string]}
   */
  warn: [message: string];
  /**
   * A property representing a fatal error message. The value should be a string.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {[message: string]}
   */
  fatal: [message: string];
  /**
   * A property that triggers an alert with the specified message.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {[message: string]}
   */
  alert: [message: string];
  /**
   * The emergency property represents a message for emergency situations.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {[message: string]}
   */
  emergency: [message: string];
}

/**
 * A generic event type that corresponds to a specific event key from the `ClientEvents` interface.
 * Properties:
 * - `data`: An object containing the event name and optional `once` flag.
 * - `execute`: Function that is called when the event is triggered, with arguments matching the corresponding event key from the `ClientEvents` interface.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @typedef {Event}
 * @template {keyof ClientEvents} E The type of event
 */
export interface Event<E extends keyof ExtendedClientEvents> {
  
  /**
   * The name of the property.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {E}
   */
  name: E;
  
  /**
   * Specifies whether the function should only be executed once. If set to true, the function will only be called the first time it is invoked, and subsequent calls will be ignored.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {?boolean}
   */
  once?: boolean;

  /**
   * A module key which gets defined when you register the module
   * @author Jonathan Stevens (@TGTGamer)
   */
  module?: string
  
  /**
   * A method that executes a given function with the provided arguments. The function is determined by the event type, 'E', from the 'ExtendedClientEvents' object. The arguments are passed as parameters to the function. The return value is an 'Awaitable' Promise that resolves to 'void'.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {(...args: ExtendedClientEvents[E]) => Awaitable<void>}
   */
  execute: (this: DiscordjsNode, ...args: ExtendedClientEvents[E]) => Awaitable<void>;
};

/**
 * A generic type representing an event slot.
 * It is a mapping from an event key in the ExtendedClientEvents union to a SlotRegistry of that event.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @typedef {EventSlot}
 * @template {keyof ExtendedClientEvents} E The key of the extended client events.
 */
export type EventSlot<E extends keyof ExtendedClientEvents> = SlotRegistry<Event<E>[]>;