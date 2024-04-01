/*
 * Project: Eventiva
 * File: ping.discord.runtime.ts
 * Last Modified: 3/29/24, 10:15 PM
 *
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import {
    type Command,
    DiscordJSAspect,
    type DiscordJSDiscord,
    DiscordJsModule,
    type Event,
    type Resources
} from '@eventiva/discordjs.discordjs'
import type { PingConfig } from './ping-config.js'


export class PingDiscord
    extends DiscordJsModule<PingConfig> {
    static readonly dependencies = [ DiscordJSAspect ]

    static readonly defaultConfig: PingConfig = {
        name: 'PingModule',
        logger: {
            level: 'info'
        }
    }

    public resources: Resources = {}

    constructor (
        protected config: PingConfig,
        discordJSDiscord: DiscordJSDiscord
    ) {
        super( config, discordJSDiscord )
    }

    static async provider (
        [ discordJS ]: [ DiscordJSDiscord ],
        config: PingConfig
    ) {
        const ping = new PingDiscord( config, discordJS )
        ping.log.trace( ping.discord.i18n.t( 'discord:modules.registering', { name: ping.name } ) )
        ping.discord.registerModule( ping )
        ping.log.trace( ping.discord.i18n.t( 'discord:modules.registered', { name: ping.name } ) )
        return ping
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public registerEvents ( reload?: true ) {
        this.discord.registerEvent( this, [
            // add any events here
        ] as Event<any>[] )
        return this
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public registerCommands ( reload?: true ) {
        this.discord.registerCommand( this, [
            // add any commands here
        ] as Command[] )
        return this
    }
}

export default PingDiscord