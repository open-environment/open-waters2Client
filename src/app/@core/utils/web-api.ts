import { environment } from '../../../environments/environment';

export module WebApi {
  export class ImportApi {
    public static readonly processWqxImportData =
      () => `${environment.api.owUrl}/api/import/processWqxImportData`
    public static readonly getWqxImportTempMonloc =
      (userIdx: number) =>
        `${environment.api.owUrl}/api/import/getWqxImportTempMonlocByUserIdx?userIdx=${userIdx}`
    public static readonly getWqxImportTempSample =
      (userIdx: number) =>
        `${environment.api.owUrl}/api/import/getWqxImportTempSampleByUserIdx?userIdx=${userIdx}`
    public static readonly processImportTempMonloc =
      () =>
        `${environment.api.owUrl}/api/import/processImportTempMonloc`
    public static readonly processImportTempSample =
      () =>
        `${environment.api.owUrl}/api/import/processImportTempSample`
    public static readonly cancelProcessImportTempMonloc =
      () =>
        `${environment.api.owUrl}/api/import/cancelProcessImportTempMonloc`
    public static readonly cancelProcessImportTempSample =
      () =>
        `${environment.api.owUrl}/api/import/cancelProcessImportTempSample`
  }
  export class UtilityApi {
    public static readonly checkUserAuthentication =
      (payload: string) =>
        `${environment.api.owUrl}/api/auth/CheckUserAuthentication?payload=${payload}`
    public static readonly createAndGetNewUserData =
      (userid: string) =>
        `${environment.api.owUrl}/api/auth/CreateAndGetNewUserData?userid=${userid}`
  }
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
    public static readonly getWQXOrganization =
      () => `${environment.api.owUrl}/api/org/getWQXOrganization`
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
    public static readonly canUserEditOrg =
      (userIdx: number, orgId: string) =>
        `${environment.api.owUrl}/api/org/canUserEditOrg?UserIDX=${userIdx}&OrgID=${orgId}`
  }
  export class TWQXMonlocApi {
    public static readonly getWQXMonLoc =
      (actInd: boolean, orgId: string, wqxPending: boolean) =>
        `${environment.api.owUrl}/api/monloc/getWQXMonLoc?ActInd=${actInd}&OrgID=${orgId}&WQXPending=${wqxPending}`
    public static readonly GetWQXMonLocByID =
      (monlocIdx: number) =>
        `${environment.api.owUrl}/api/monloc/GetWQXMonLocByID?MonLocIDX=${monlocIdx}`
    public static readonly getWqxMonlocByOrgId =
      (orgId: string) =>
        `${environment.api.owUrl}/api/monloc/getWqxMonlocByOrgId?OrgID=${orgId}`
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
    public static readonly getTWqxRefDataActivityTypeUsed =
      (orgId: string) =>
        `${environment.api.owUrl}/api/activity/getTWqxRefDataActivityTypeUsed?OrgID=${orgId}`
    public static readonly getWqxActivityById =
      (activityIdx: number) =>
        `${environment.api.owUrl}/api/activity/getWqxActivityById?ActivityIDX=${activityIdx}`
    public static readonly getTWqxResult =
      (activityIdx: number) =>
        `${environment.api.owUrl}/api/activity/getTWqxResult?ActivityIDX=${activityIdx}`
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
    public static readonly getTWqxRefDataCount =
      () =>
        `${environment.api.owUrl}/api/refdata/getTWqxRefDataCount`
    public static readonly GetTWqxRefCharOrgCount =
      (orgName: string) =>
        `${environment.api.owUrl}/api/refdata/getTWqxRefDataCount?orgName=${orgName}`
    public static readonly GetTWqxRefSampColMethodByContext =
      (context: string) =>
        `${environment.api.owUrl}/api/refdata/GetTWqxRefSampColMethodByContext?Context=${context}`
    public static readonly insertOrUpdateWqxActivity =
      (activityIdx: number, orgId: string, projectIdx: number, monlocIdx: number, activityId: string,
        actType: string, actMedia: string, actSubMedia: string, actStartDate: string, actEndDt: string,
        actTimeZone: string, relativeDepthName: string, actDepthHeightMsr: string, actDepthHeightMsrUnit: string,
        topDepthHeightMsr: string, topDepthHeightMsrUnit: string, botDepthHeightMsr: string, botDepthHeightMsrUnit: string,
        depthRefPoint: string, actComment: string, bioAssemblageSampled: string, bioDurationMsr: string,
        bioDurationMsrUnit: string, bioSampComponent: string, bioSampComponentSeq: number, bioReachLenMsr: string,
        bioReachLenMsrUnit, bioReachWidMsr: string, bioReachWidMsrUnit: string, bioPassCount: number,
        bioNetType: string, bioNetAreaMsr: string, bioNetAreaMsrUnit: string, bioNetMeshsizeMsr: string,
        bioMeshsizeMsrUnit, bioBoatSpeedMsr: string, bioBoatSpeedMsrUnit: string, bioCurrSpeedMsr: string,
        bioCurrSpeedMsrUnit, bioToxicityTestType: string, sampCollMethodIdx: number, sampCollEquip: string, sampCollEquipComment: string,
        sampPrepIdx: number, sampPrepCountType: string, sampPrepContColor: string, sampPrepChemPeserv: string, sampPrepThermPreserv: string,
        sampPrepStorageDesc, wqxSubmitStatus: string, actInd: boolean, wqxInd: boolean, creatUser: string, entryType: string) =>
        `${environment.api.owUrl}/api/activity/insertOrUpdateWqxActivity?aCTIVITY_IDX=${activityIdx}&oRG_ID=${orgId}&pROJECT_IDX=${projectIdx}&mONLOC_IDX=${monlocIdx}&aCTIVITY_ID=${activityId}&aCT_TYPE=${actType}&aCT_MEDIA=${actMedia}&aCT_SUBMEDIA=${actSubMedia}&aCT_START_DT=${actStartDate}&aCT_END_DT=${actEndDt}&aCT_TIME_ZONE=${actTimeZone}&rELATIVE_DEPTH_NAME=${relativeDepthName}&aCT_DEPTHHEIGHT_MSR=${actDepthHeightMsr}&aCT_DEPTHHEIGHT_MSR_UNIT=${actDepthHeightMsrUnit}&tOP_DEPTHHEIGHT_MSR${topDepthHeightMsr}&tOP_DEPTHHEIGHT_MSR_UNIT=${topDepthHeightMsrUnit}&bOT_DEPTHHEIGHT_MSR=${botDepthHeightMsr}&bOT_DEPTHHEIGHT_MSR_UNIT=${botDepthHeightMsrUnit}&dEPTH_REF_POINT=${depthRefPoint}&aCT_COMMENT=${actComment}&bIO_ASSEMBLAGE_SAMPLED=${bioAssemblageSampled}&bIO_DURATION_MSR=${bioDurationMsr}&bIO_DURATION_MSR_UNIT=${bioDurationMsrUnit}&bIO_SAMP_COMPONENT=${bioSampComponent}&bIO_SAMP_COMPONENT_SEQ=${bioSampComponentSeq}&bIO_REACH_LEN_MSR=${bioReachLenMsr}&bIO_REACH_LEN_MSR_UNIT=${bioReachLenMsrUnit}&bIO_REACH_WID_MSR=${bioReachWidMsr}&bIO_REACH_WID_MSR_UNIT=${bioReachWidMsrUnit}&bIO_PASS_COUNT=${bioPassCount}&bIO_NET_TYPE=${bioNetType}&bIO_NET_AREA_MSR=${bioNetAreaMsr}&bIO_NET_AREA_MSR_UNIT=${bioNetAreaMsrUnit}&bIO_NET_MESHSIZE_MSR=${bioNetMeshsizeMsr}&bIO_MESHSIZE_MSR_UNIT=${bioMeshsizeMsrUnit}&bIO_BOAT_SPEED_MSR=${bioBoatSpeedMsr}&bIO_BOAT_SPEED_MSR_UNIT=${bioBoatSpeedMsrUnit}&bIO_CURR_SPEED_MSR=${bioCurrSpeedMsr}&bIO_CURR_SPEED_MSR_UNIT=${bioCurrSpeedMsrUnit}&bIO_TOXICITY_TEST_TYPE=${bioToxicityTestType}&sAMP_COLL_METHOD_IDX=${sampCollMethodIdx}&sAMP_COLL_EQUIP=${sampCollEquip}&sAMP_COLL_EQUIP_COMMENT=${sampCollEquipComment}&sAMP_PREP_IDX=${sampPrepIdx}&sAMP_PREP_CONT_TYPE=${sampPrepCountType}&sAMP_PREP_CONT_COLOR=${sampPrepContColor}&sAMP_PREP_CHEM_PRESERV=${sampPrepChemPeserv}&sAMP_PREP_THERM_PRESERV=${sampPrepThermPreserv}&sAMP_PREP_STORAGE_DESC=${sampPrepStorageDesc}&wQX_SUBMIT_STATUS=${wqxSubmitStatus}&aCT_IND=${actInd}&wQX_IND=${wqxInd}&cREATE_USER=${creatUser}&eNTRY_TYPE=${entryType}`
    public static readonly getTWqxRefCharacteristicByOrg =
      (orgId: string, rbpInd: boolean) =>
        `${environment.api.owUrl}/api/refdata/getTWqxRefCharacteristicByOrg?OrgID=${orgId}&RBPInd=${rbpInd}`
    public static readonly insertOrUpdateTWqxResult =
      (resultIdx: number, activityIdx: number, resultDetectCondition: string,
        charName: string, resultSampFraction: string, resultMsr: string, resultMsrUnit: string,
        resultStatus: string, resultValueType: string, resultComment: string,
        bioIntentName: string, bioIndividualId: string, bioTaxonomy: string, bioSampleTissueAnatomy: string,
        analyticMethodIdx: number, labIdx: number, labanalysisStartDt: string, detectionLimit: string, pql: string,
        lowerQuantLimit: string, upperQuantLimit: string, labSampPrepIdx: number, labSampPrepStartDt: string, dilutionFactor: string,
        freqClassCode: string, freqClassUnit: string, createUser: string) =>
        `${environment.api.owUrl}/api/refdata/insertOrUpdateTWqxResult?rESULT_IDX=${resultIdx}&aCTIVITY_IDX=${activityIdx}&rESULT_DETECT_CONDITION=${resultDetectCondition}&cHAR_NAME=${charName}&rESULT_SAMP_FRACTION=${resultSampFraction}&rESULT_MSR=${resultMsr}&rESULT_MSR_UNIT=${resultMsrUnit}&rESULT_STATUS=${resultStatus}&rESULT_VALUE_TYPE=${resultValueType}&rESULT_COMMENT=${resultComment}&bIO_INTENT_NAME=${bioIntentName}&bIO_INDIVIDUAL_ID=${bioIndividualId}&bIO_TAXONOMY=${bioTaxonomy}&bIO_SAMPLE_TISSUE_ANATOMY=${bioSampleTissueAnatomy}&aNALYTIC_METHOD_IDX=${analyticMethodIdx}&lAB_IDX=${labIdx}&lAB_ANALYSIS_START_DT=${labanalysisStartDt}&dETECTION_LIMIT=${detectionLimit}&pQL=${pql}&lOWER_QUANT_LIMIT=${lowerQuantLimit}&uPPER_QUANT_LIMIT=${upperQuantLimit}&lAB_SAMP_PREP_IDX=${labSampPrepIdx}&lAB_SAMP_PREP_START_DT=${labSampPrepStartDt}&dILUTION_FACTOR=${dilutionFactor}&fREQ_CLASS_CODE=${freqClassCode}&fREQ_CLASS_UNIT=${freqClassUnit}&cREATE_USER=${createUser}`
    public static readonly getTWqxRefTaxaByOrg =
      (orgId: string) =>
        `${environment.api.owUrl}/api/refdata/getTWqxRefTaxaByOrg?OrgID=${orgId}`
    public static readonly getTWqxRefCharLimitsByNameUnit =
      (charName: string, unitName: string) =>
        `${environment.api.owUrl}/api/refdata/getTWqxRefCharLimitsByNameUnit?CharName=${charName}&UnitName=${unitName}`
    public static readonly updateWqxActivityWqxStatus =
      (activityIdx: number, wqxSubmitStatus, actInd: boolean, wqxInd: boolean, createUser: string) =>
        `${environment.api.owUrl}/api/activity/updateWqxActivityWqxStatus?aCTIVITY_IDX=${activityIdx}&wQX_SUBMIT_STATUS=${wqxSubmitStatus}&aCT_IND=${actInd}&wQX_IND=${wqxInd}&cREATE_USER=${createUser}`
    public static readonly deleteTWqxResult =
      (resultIdx: number) =>
        `${environment.api.owUrl}/api/refdata/deleteTWqxResult?ResultIdx=${resultIdx}`
  }
}
