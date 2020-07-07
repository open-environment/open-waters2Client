/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  api: {
    owUrl: 'https://localhost:44327'
  }
};
export const globals = {
  projectConfig: [
    {name: 'SAMP_DESIGN_TYPE_CD', value: false},
    {name: 'QAPP_APPROVAL', value: false},
  ],
  monlocConfig: [
    {name: 'HUC_EIGHT', value: false},
    {name: 'HUC_TWELVE', value: false},
    {name: 'TRIBAL_LAND', value: false},
    {name: 'OURCE_MAP_SCALE', value: false},
    {name: 'HORIZ_COLL_METHOD', value: false},
    {name: 'HORIZ_REF_DATUM', value: false},
    {name: 'ERT_MEASURE', value: false},
    {name: 'COUNTRY_CODE', value: false},
    {name: 'STATE_CODE', value: false},
    {name: 'COUNTY_CODE', value: false},
    {name: 'WELL_TYPE', value: false},
    {name: 'AQUIFER_NAME', value: false},
    {name: 'FORMATION_TYPE', value: false},
    {name: 'WELLHOLE_DEPTH', value: false},
  ],
};
