import { environment } from '../../../environments/environment';

export module WebApi {
  export class TWQXOrganizationApi {
    public static readonly connectTest =
      (orgId: string, typ: string) =>
        `${environment.api.owUrl}/api/org/connectTest?orgId=${orgId}&typ=${typ}`
    public static readonly getTOeUsersNotInOrganization =
      (orgId: string) =>
        `${environment.api.owUrl}/api/org/getTOeUsersNotInOrganization?orgId=${orgId}`
    public static readonly getTOeUsersInOrganization =
      (orgId: string) =>
        `${environment.api.owUrl}/api/org/getTOeUsersInOrganization?orgId=${orgId}`
    public static readonly getTWqxRefData =
      (table: string, actInd: boolean, usedInd: boolean) =>
        `${environment.api.owUrl}/api/org/getTWqxRefData?table=${table}&actInd=${actInd}&usedInd=${usedInd}`
    public static readonly approveRejectTWqxUserOrgs =
      (orgID: string, userIDX: number, ApproveRejectCode: string) =>
        `${environment.api.owUrl}/api/org/ApproveRejectTWqxUserOrgs?orgID=${orgID}&userIDX=${userIDX}&ApproveRejectCode=${ApproveRejectCode}`
    public static readonly getUserOrgsByUserIDX =
      (userIDX: number, excludePendingInd: boolean) =>
        `${environment.api.owUrl}/api/org/getUserOrgsByUserIDX?userIDX=${userIDX}&excludePendingInd=${excludePendingInd}`
    public static readonly getVWQXAllOrgs =
      () => `${environment.api.owUrl}/api/org/getVWQXAllOrgs`
    public static readonly GetWQXOrganizationById =
      (orgID: string) =>
        `${environment.api.owUrl}/api/org/GetWQXOrganizationById?OrgID=${orgID}`
    public static readonly getTEPAOrgByOrgId =
      (orgID: number) =>
        `${environment.api.owUrl}/api/org/GetT_EPA_ORGS_ByOrgID?OrgID=${orgID}`
    public static readonly InsertOrUpdateTWQXOrganization =
      (oRG_ID: string, oRG_NAME: string, oRG_DESC: string, tRIBAL_CODE: string, eLECTRONIC_ADDRESS: string,
        eLECTRONICADDRESSTYPE: string, tELEPHONE_NUM: string, tELEPHONE_NUM_TYPE: string, TELEPHONE_EXT: string, cDX_SUBMITTER_ID: string,
        cDX_SUBMITTER_PWD: string, cDX_SUBMIT_IND: boolean, dEFAULT_TIMEZONE: string, cREATE_USER: string, mAIL_ADDRESS: string,
        mAIL_ADD_CITY: string, mAIL_ADD_STATE: string, mAIL_ADD_ZIP: string) =>
        `${environment.api.owUrl}/api/org/InsertOrUpdateTWQXOrganization?oRG_ID=${oRG_ID}&oRG_NAME=${oRG_NAME}&oRG_DESC=${oRG_DESC}&tRIBAL_CODE=${tRIBAL_CODE}&eLECTRONIC_ADDRESS=${eLECTRONIC_ADDRESS}&eLECTRONICADDRESSTYPE=${eLECTRONICADDRESSTYPE}&tELEPHONE_NUM=${tELEPHONE_NUM}&tELEPHONE_NUM_TYPE=${tELEPHONE_NUM_TYPE}&TELEPHONE_EXT=${TELEPHONE_EXT}&cDX_SUBMITTER_ID=${cDX_SUBMITTER_ID}&cDX_SUBMITTER_PWD=${cDX_SUBMITTER_PWD}&cDX_SUBMIT_IND=${cDX_SUBMIT_IND}&dEFAULT_TIMEZONE=${dEFAULT_TIMEZONE}&cREATE_USER=${cREATE_USER}&mAIL_ADDRESS=${mAIL_ADDRESS}&mAIL_ADD_CITY=${mAIL_ADD_CITY}&mAIL_ADD_STATE=${mAIL_ADD_STATE}&mAIL_ADD_ZIP=${mAIL_ADD_ZIP}`
    public static readonly GetWQXUserOrgsAdminsByOrg =
      (orgID: string) =>
        `${environment.api.owUrl}/api/org/GetWQXUserOrgsAdminsByOrg?OrgID=${orgID}`
    public static readonly insertTWQXUserOrgs =
      (orgID: string, userIDX: number, roleCD: string, createUser: string) =>
        `${environment.api.owUrl}/api/org/InsertTWQXUserOrgs?oRG_ID=${orgID}&uSER_IDX=${userIDX}&rOLE_CD=${roleCD}&cREATE_USER=${createUser}`
    public static readonly deleteTWqxUserOrgs =
      (orgID: string, userIDX: number) =>
        `${environment.api.owUrl}/api/org/deleteTWqxUserOrgs?orgId=${orgID}&userIdx=${userIDX}`
    public static readonly getAdminTaskData =
      (userName: string, OrgID: string) =>
        `${environment.api.owUrl}/api/org/GetAdminTaskData?userName=${userName}&OrgID=${OrgID}`
    public static readonly GetWqxImportTranslatebyOrg =
      (orgId: string) =>
        `${environment.api.owUrl}/api/org/GetWqxImportTranslatebyOrg?orgId=${orgId}`
  }
  export class TWQXMonlocApi {
    public static readonly getWQXMonLoc =
      (actInd: boolean, orgId: string, wqxPending: boolean) =>
        `${environment.api.owUrl}/api/monloc/getWQXMonLoc?ActInd=${actInd}&OrgID=${orgId}&WQXPending=${wqxPending}`
    public static readonly GetWQXMonLocByID =
      (monlocIdx: number) =>
        `${environment.api.owUrl}/api/monloc/GetWQXMonLocByID?MonLocIDX=${monlocIdx}`
  }
  export class TWQXProjectApi {
    public static readonly getAllProjects =
      () =>
        `${environment.api.owUrl}/api/project/getAllProjects`
    public static readonly getWQXProjectMyOrgCount =
      (userIDX: number) =>
        `${environment.api.owUrl}/api/project/getWQXProjectMyOrgCount?UserIDX=${userIDX}`
    public static readonly getWQXMonLocMyOrgCount =
      (userIDX: number) =>
        `${environment.api.owUrl}/api/monloc/getWQXMonlocMyOrgCount?UserIDX=${userIDX}`
    public static readonly getWqxProject =
      (actInd: boolean, orgId: string, wqxPending: boolean) =>
        `${environment.api.owUrl}/api/project/getWqxProject?ActInd=${actInd}&OrgID=${orgId}&WQXPending=${wqxPending}`
    public static readonly getWQXProjectByID =
      (projectIdx: number) =>
        `${environment.api.owUrl}/api/project/getWQXProjectByID?ProjectIDX=${projectIdx}`
    public static readonly InsertOrUpdateWQXProject =
      (projectIdx: number, orgId: string, projectId: string,
        projectName: string, projectDesc: string, sampDesignTypeCd: string, qAppApprovalInd: boolean,
        qAppApprovalAgency: string, wQxSubmitStatus: string, wQxSubmitDt: string, actInd: boolean, wqxInd: boolean, createUser: string) =>
        `${environment.api.owUrl}/api/project/InsertOrUpdateWQXProject?pROJECT_IDX=${projectIdx}&oRG_ID=${orgId}&pROJECT_ID=${projectId}&pROJECT_NAME=${projectName}&pROJECT_DESC=${projectDesc}&sAMP_DESIGN_TYPE_CD=${sampDesignTypeCd}&qAPP_APPROVAL_IND=${qAppApprovalInd}&qAPP_APPROVAL_AGENCY=${qAppApprovalAgency}&wQX_SUBMIT_STATUS=${wQxSubmitStatus}&wQX_SUBMIT_DT=${wQxSubmitDt}&aCT_IND=${actInd}&wQX_IND=${wqxInd}&cREATE_USER=${createUser}`
  }
  export class TWQXActivityApi {
    public static readonly getAllActivities =
      (ActInd: boolean, OrgID: string, MonLocIDX: number, startDt: string, endDt: string, ActType: string, WQXPending: boolean, ProjectIDX: number) =>
        `${environment.api.owUrl}/api/activity/getAllActivities?ActInd=${ActInd}&OrgID=${OrgID}&MonLocIDX=${MonLocIDX}&startDt=${startDt}&endDt=${endDt}&ActType=${ActType}&WQXPending=${WQXPending}&ProjectIDX=${ProjectIDX}`
    public static readonly getTWQXResulTCount =
      (OrgID: string) =>
        `${environment.api.owUrl}/api/activity/getTWQXResulTCount?OrgID=${OrgID}`
    public static readonly getWQXActivityMyOrgCount =
      (userIDX: number) =>
        `${environment.api.owUrl}/api/activity/getWQXActivityMyOrgCount?UserIDX=${userIDX}`
    public static readonly getWqxActivityDisplay =
      (actInd: boolean, orgId: string, monLocIdx: number, startDt: string, endDt: string, actType: string, wQXPending: boolean, projectIdx: number, wQXStatus: string) =>
        `${environment.api.owUrl}/api/activity/getWqxActivityDisplay?ActInd=${actInd}&OrgID=${orgId}&MonLocIDX=${monLocIdx}&startDt=${startDt}&endDt=${endDt}&ActType=${actType}&WQXPending=${wQXPending}&ProjectIDX=${projectIdx}&WQXStatus=${wQXStatus}`
    public static readonly deleteTWqxActivity =
      (activityIdx: number, userId: string) =>
        `${environment.api.owUrl}/api/activity/deleteTWqxActivity?ActivityIDX=${activityIdx}&UserID=${userId}`
  }
  export class TWQXRefDataApi {
    public static readonly getTWqxRefDefaultTimeZone =
      () =>
        `${environment.api.owUrl}/api/refdata/getTWqxRefDefaultTimeZone`
    public static readonly InsertOrUpdateTWQXOrganization =
      (orgId: string, orgName: string, orgDesc: string, tribalCode: string, electronicAddress: string,
        electtronicAddressType: string, telephoneNum: string, telephoneNumType: string, telephoneExt: string, cdxSubmitterId: string,
        cdxSubmitterPWD: string, cdxSubmitterInd: string, defaultTimeZone: string, createUser: string, mailAddress: string,
        mailAddCity: string, mailAddState: string, mailAddZip: string) =>
        `${environment.api.owUrl}/api/org/InsertOrUpdateTWQXOrganization?oRG_ID=${orgId}&oRG_NAME=${orgName}&oRG_DESC=${orgDesc}&tRIBAL_CODE=${tribalCode}&eLECTRONIC_ADDRESS=${electronicAddress}&eLECTRONICADDRESSTYPE=${electtronicAddressType}&tELEPHONE_NUM=${telephoneNum}&tELEPHONE_NUM_TYPE=${telephoneNumType}&TELEPHONE_EXT=${telephoneExt}&cDX_SUBMITTER_ID=${cdxSubmitterId}&cDX_SUBMITTER_PWD=${cdxSubmitterPWD}&cDX_SUBMIT_IND=${cdxSubmitterInd}&dEFAULT_TIMEZONE=${defaultTimeZone}&cREATE_USER=${createUser}&mAIL_ADDRESS${mailAddress}&mAIL_ADD_CITY=${mailAddCity}&mAIL_ADD_STATE=${mailAddState}&mAIL_ADD_ZIP=${mailAddZip}`
    public static readonly GetTWqxRefCharacteristic =
      (actInd: boolean, onlyUsedInd: boolean) =>
        `${environment.api.owUrl}/api/refdata/GetTWqxRefCharacteristic?ActInd=${actInd}&onlyUsedInd=${onlyUsedInd}`
    public static readonly GetTWqxRefAnalMethod =
      (actInd: boolean) =>
        `${environment.api.owUrl}/api/refdata/GetTWqxRefAnalMethod?ActInd=${actInd}`
    public static readonly GetTWqxRefData =
      (table: string, actInd: boolean, usedInd: boolean) =>
        `${environment.api.owUrl}/api/refdata/GetTWqxRefData?table=${table}&actInd=${actInd}&usedInd=${usedInd}`
    public static readonly InsertOrUpdateTWqxRefCharOrg =
      (charName: string, orgName: string, createUserId: string,
        defaultDetectLimit: string, defaultUnit: string, defaultAnalMethodIdx: number,
        defaultSampFraction: string, defaultResultStatus: string, defaultResultTypeValue: string,
        defaultLowerQuantLimit: string, defaultUpperQuantLimit: string) =>
        `${environment.api.owUrl}/api/refdata/InsertOrUpdateTWqxRefCharOrg?charName=${charName}&orgName=${orgName}&createUserId=${createUserId}&defaultDetectLimit=${defaultDetectLimit}&defaultUnit=${defaultUnit}&defaultAnalMethodIdx=${defaultAnalMethodIdx}&defaultSampFraction=${defaultSampFraction}&defaultResultStatus=${defaultResultStatus}&defaultResultTypeValue=${defaultResultTypeValue}&defaultLowerQuantLimit=${defaultLowerQuantLimit}&defaultUpperQuantLimit=${defaultUpperQuantLimit}`
    public static readonly insertOrUpdateTWqxRefTaxaOrg =
      (bioSubjectTaxanomy: string, orgName: string, createUserId: string) =>
        `${environment.api.owUrl}/api/refdata/insertOrUpdateTWqxRefTaxaOrg?bioSubjectTaxanomy=${bioSubjectTaxanomy}&orgName=${orgName}&createUserId=${createUserId}`
    public static readonly GetTWqxRefTaxaOrg =
      (orgName: string) =>
        `${environment.api.owUrl}/api/refdata/GetTWqxRefTaxaOrg?orgName=${orgName}`
    public static readonly getAllColumnBasic =
      (importType: string) =>
        `${environment.api.owUrl}/api/refdata/getAllColumnBasic?importType=${importType}`
    public static readonly insertOrUpdateWqxImportTranslate =
      (translateIdx: number, orgId: string, colName: string, dataFrom: string, dataTo: string, createUser: string) =>
        `${environment.api.owUrl}/api/refdata/insertOrUpdateWqxImportTranslate?translateIdx=${translateIdx}&orgId=${orgId}&colName=${colName}&dataFrom=${dataFrom}&dataTo=${dataTo}&createUser=${createUser}`
    public static readonly GetTWqxRefCharOrg =
      (orgName: string) =>
        `${environment.api.owUrl}/api/refdata/GetTWqxRefCharOrg?orgName=${orgName}`
    public static readonly GetTWqxRefCounty =
      (stateCode: string) =>
        `${environment.api.owUrl}/api/refdata/GetTWqxRefCounty?stateCode=${stateCode}`
    public static readonly InsertOrUpdateWQXMonLoc =
      (monlocIdx: number, orgId: string, monlocId: string, monlocName: string,
        monlocType: string, monlocDesc: string, hucHeight: string, hucTwelve: string, tribalLandInd: string,
        tribalLandName: string, latitudeMsr: string, longitudeMsr: string, sourceMapScale: number,
        horizAccuracy: string, horizAccuracyUnit: string, horizCollMethod: string, horizRefDatum: string,
        vertMeasure: string, vertMeasureUnit: string, vertCollMethod: string, vertRefDatum: string,
        countryCode: string, stateCode: string, countyCode: string, wellType: string, aquiferName: string,
        formationType: string, wellholeDepthMsr: string, wellholeDepthMsrUnit: string, wqxSubmitStatus: string,
        wqxUpdateDate: string, actInd: boolean, wqxInd: boolean, createUser: string) =>
        `${environment.api.owUrl}/api/monloc/InsertOrUpdateWQXMonLoc?mONLOC_IDX=${monlocIdx}&oRG_ID=${orgId}&mONLOC_ID=${monlocId}&mONLOC_NAME=${monlocName}&mONLOC_TYPE=${monlocType}&mONLOC_DESC=${monlocDesc}&hUC_EIGHT=${hucHeight}&HUC_TWELVE=${hucTwelve}&tRIBAL_LAND_IND=${tribalLandInd}&tRIBAL_LAND_NAME=${tribalLandName}&lATITUDE_MSR=${latitudeMsr}&lONGITUDE_MSR=${longitudeMsr}&sOURCE_MAP_SCALE=${sourceMapScale}&hORIZ_ACCURACY=${horizAccuracy}&hORIZ_ACCURACY_UNIT=${horizAccuracyUnit}&hORIZ_COLL_METHOD=${horizCollMethod}&hORIZ_REF_DATUM=${horizRefDatum}&vERT_MEASURE=${vertMeasure}&vERT_MEASURE_UNIT=${vertMeasureUnit}&vERT_COLL_METHOD=${vertCollMethod}&vERT_REF_DATUM=${vertRefDatum}&cOUNTRY_CODE=${countryCode}&sTATE_CODE=${stateCode}&cOUNTY_CODE=${countyCode}&wELL_TYPE=${wellType}&aQUIFER_NAME=${aquiferName}&fORMATION_TYPE=${formationType}&wELLHOLE_DEPTH_MSR=${wellholeDepthMsr}&wELLHOLE_DEPTH_MSR_UNIT=${wellholeDepthMsrUnit}&wQX_SUBMIT_STATUS=${wqxSubmitStatus}&wQXUpdateDate=${wqxUpdateDate}&aCT_IND=${actInd}&wQX_IND=${wqxInd}&cREATE_USER=${createUser}`
    public static readonly deleteTWqxRefTaxaOrg =
      (orgName: string, charName: string) =>
        `${environment.api.owUrl}/api/refdata/deleteTWqxRefTaxaOrg?orgName=${orgName}&charName=${charName}`
    public static readonly deleteTWqxImportTranslate =
      (translateId: number) =>
        `${environment.api.owUrl}/api/refdata/deleteTWqxImportTranslate?TranslateID=${translateId}`
    public static readonly deleteWqxRefCharOrg =
      (orgName: string, charName: string) =>
        `${environment.api.owUrl}/api/refdata/deleteWqxRefCharOrg?orgName=${orgName}&charName=${charName}`
  }
}
