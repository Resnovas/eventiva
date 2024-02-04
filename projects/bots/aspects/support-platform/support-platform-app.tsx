/**
* @format
* -----
* Project: @eventiva/eventiva
* File: support-platform-app.tsx
* Path: \projects\bots\aspects\support-platform\support-platform-app.tsx
* Created Date: Sunday, January 28th 2024
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

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Route as RouteType } from './route'; 

export type SupportPlatformAppProps = {
  /**
   * root routes to use.
   */
  routes: RouteType[],
}

export function SupportPlatformApp({ routes }: SupportPlatformAppProps) {
  return (
    <div>
      <div>Header</div>
      <Routes>
        {routes.map((route) => {
          const RouteComponent = route.component;
          return <Route key={route.path} path={route.path} element={<RouteComponent />} />;
        })}
        <Route path='*' element={<>Page not found!</>} />
      </Routes>
      <div>Footer</div>
    </div>
  );
}    