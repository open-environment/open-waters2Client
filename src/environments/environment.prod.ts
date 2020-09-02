/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  api: {
    owUrl: 'https://localhost:44327',
    // owUrl: 'http://208.109.10.214:89',
  },
};
export const globals = {
  projectConfig: [
    { name: 'SAMP_DESIGN_TYPE_CD', value: false, field: 'sampDesignTypeCd', header: 'Sampling Design Type' },
    { name: 'QAPP_APPROVAL', value: false, field: 'qappApproval', header: 'QAPP Approval' },
  ],
  monlocConfig: [
    { name: 'HUC_EIGHT', value: false, field: 'hucEight', header: '8-Digit HUC' },
    { name: 'HUC_TWELVE', value: false, field: 'hucTwelve', header: '12-Digit HUC' },
    { name: 'TRIBAL_LAND', value: false, field: 'tribalLandName', header: 'Tribal Land' },
    { name: 'SOURCE_MAP_SCALE', value: false, field: 'sourceMapScale', header: 'Source Map Scale' },
    { name: 'HORIZ_COLL_METHOD', value: false, field: 'horizCollMethod', header: 'Horiz. Collection Method' },
    { name: 'HORIZ_REF_DATUM', value: false, field: 'horizRefDatum', header: 'Horiz. Datum' },
    { name: 'VERT_MEASURE', value: false, field: 'vertCollMethod', header: 'Vertical Collection Method' },
    { name: 'COUNTRY_CODE', value: false, field: 'countryCode', header: 'Country' },
    { name: 'STATE_CODE', value: false, field: 'stateCode', header: 'State' },
    { name: 'COUNTY_CODE', value: false, field: 'countyCode', header: 'County' },
    { name: 'WELL_TYPE', value: false, field: 'wellType', header: 'Well Type' },
    { name: 'AQUIFER_NAME', value: false, field: 'aquiferName', header: 'Aquifer Name' },
    { name: 'FORMATION_TYPE', value: false, field: 'formationType', header: 'Formation' },
    { name: 'WELLHOLE_DEPTH', value: false, field: 'wellholeDepthMsr', header: 'Wellhole Depth' },
  ],
  activityConfig: [
    { name: 'SAMP_ACT_END_DT', value: false, field: 'acT_END_DT', header: 'End Date' },
    { name: 'SAMP_COLL_METHOD', value: false, field: 'samP_COLL_METHOD', header: 'Sample Collection Method' },
    { name: 'SAMP_COLL_EQUIP', value: false, field: 'samP_COLL_EQUIP', header: 'Collection Equipment' },
    { name: 'SAMP_PREP', value: false, field: 'samP_PREP_METHOD', header: 'Sample Prep Method' },
    { name: 'SAMP_DEPTH', value: false, field: 'acT_DEPTHHEIGHT_MSR', header: 'Depth' },
  ],
};
