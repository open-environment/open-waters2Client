/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {
    owUrl: 'https://localhost:44327',
  },
};
export const globals = {
  projectConfig: [
    { name: 'SAMP_DESIGN_TYPE_CD', value: false },
    { name: 'QAPP_APPROVAL', value: false },
  ],
  monlocConfig: [
    { name: 'HUC_EIGHT', value: false },
    { name: 'HUC_TWELVE', value: false },
    { name: 'TRIBAL_LAND', value: false },
    { name: 'OURCE_MAP_SCALE', value: false },
    { name: 'HORIZ_COLL_METHOD', value: false },
    { name: 'HORIZ_REF_DATUM', value: false },
    { name: 'ERT_MEASURE', value: false },
    { name: 'COUNTRY_CODE', value: false },
    { name: 'STATE_CODE', value: false },
    { name: 'COUNTY_CODE', value: false },
    { name: 'WELL_TYPE', value: false },
    { name: 'AQUIFER_NAME', value: false },
    { name: 'FORMATION_TYPE', value: false },
    { name: 'WELLHOLE_DEPTH', value: false },
  ],
  activityConfig: [
    { name: 'SAMP_ACT_END_DT', value: false },
    { name: 'SAMP_COLL_METHOD', value: false },
    { name: 'SAMP_COLL_EQUIP', value: false },
    { name: 'SAMP_PREP', value: false },
    { name: 'SAMP_DEPTH', value: false },
  ],
};
