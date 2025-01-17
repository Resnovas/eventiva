/*
 * Project: Eventiva
 * File: abstract-endpoint.ts
 * Last Modified: 07/09/2024, 03:55
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 * (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 * in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 * functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 * be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 * copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 * licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 * https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 * or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 * License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 * Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 * https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { ContentType } from '@eventiva/utilities.helpers.content-types'
import type { Method } from '@eventiva/utilities.helpers.http-methods'
import type { Security } from '@eventiva/utilities.helpers.http-security'
import type { LogicalContainer } from '@eventiva/utilities.helpers.logical-container'
import type { NormalizedResponse } from '@eventiva/utilities.helpers.zod.api-response'
import { IOSchema } from '@eventiva/utilities.helpers.zod.io-schema'
import { Request, Response } from 'express'
import { z } from 'zod'

export type DescriptionVariant = 'short' | 'long';
export type IOVariant = 'input' | 'output';
export type ResponseVariant = 'positive' | 'negative';
export type MimeVariant = Extract<IOVariant, 'input'> | ResponseVariant;

export abstract class AbstractEndpoint {
    public abstract execute ( params: {
        request: Request;
        response: Response;
        // logger: ActualLogger;
        // TODO: implement logger
        siblingMethods?: ReadonlyArray<Method>;
    } ): Promise<void>;

    public abstract getDescription (
        variant: DescriptionVariant
    ): string | undefined;

    public abstract getMethods (): ReadonlyArray<Method>;

    public abstract getSchema ( variant: IOVariant ): IOSchema;
    public abstract getSchema ( variant: ResponseVariant ): z.ZodTypeAny;

    public abstract getMimeTypes ( variant: MimeVariant ): ReadonlyArray<string>;

    public abstract getResponses (
        variant: ResponseVariant
    ): ReadonlyArray<NormalizedResponse>;

    public abstract getSecurity (): LogicalContainer<Security>;

    public abstract getScopes (): ReadonlyArray<string>;

    public abstract getTags (): ReadonlyArray<string>;

    public abstract getOperationId ( method: Method ): string | undefined;

    public abstract getRequestType (): ContentType;
}
