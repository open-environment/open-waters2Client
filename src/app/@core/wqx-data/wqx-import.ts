import { Observable } from 'rxjs';
export interface TWqxImportTempProject {
    tempProjectIdx: number;
    userId: string;
    projectIdx: number;
    orgId: string;
    projectId: string;
    projectName: string;
    projectDesc: string;
    sampDesignTypeCd: string;
    qappApprovalInd: boolean;
    qappApprovalAgency: string;
    importStatusCd: string;
    importStatusDesc: string;
}
export interface TWqxImportTempMonloc {
    tempMonlocIdx: number;
    userId: string;
    monlocIdx: number;
    orgId: string;
    monlocId: string;
    monlocName: string;
    monlocType: string;
    monlocDesc: string;
    hucEight: string;
    hucTwelve: string;
    tribalLandInd: string;
    latitudeMsr: string;
    longitudeMsr: string;
    sourceMapScale: number;
    horizAccuracy: string;
    horizAccuracyUnit: string;
    horizCollMethod: string;
    horizRefDetum: string;
    vertMeasure: string;
    vertMeasureUnit: string;
    vertCollMethod: string;
    vertRefDetum: string;
    countryCode: string;
    stateCode: string;
    countyCode: string;
    wellType: string;
    aquiferName: string;
    formationType: string;
    wellHoleDepthMsr: string;
    wellHoleDepthMsrUnit: string;
    importStatusCd: string;
    importStatusDesc: string;
}

export interface ImportSampleResultDisplay {
    tempSampleIdx: number;
    orgId: string;
    projectId: string;
    monlocId: string;
    activityId: string;
    actType: string;
    actMedia: string;
    actSubmedia: string;
    actStartDt: string;
    actEndDt: string;
    ctTimeZone: string;
    relativeDepthName: string;
    actDepthheightMsr: string;
    actDepthheightMsrUnit: string;
    topDepthheightMsr: string;
    topDepthheightMsrUnit: string;
    botDepthheightMsr: string;
    botDepthheightMsrUnit: string;
    depthRefPoint: string;
    actComment: string;
    bioAssemblageSampled: string;
    bioDurationMsr: string;
    bioDurationMsrUnit: string;
    bioSampComponent: string;
    bioSampComponentSeq: number;
    sampCollMethodId: string;
    sampCollMethodCtx: string;
    sampCollEquip: string;
    sampCollEquipComment: string;
    sampPrepId: string;
    sampPrepCtx: string;

    tempResultIdx: number;
    dataLoggerLine: string;
    resultDetectCondition: string;
    charName: string;
    methodSpeciationName: string;
    resultSampFraction: string;
    resultMsr: string;
    resultMsrUnit: string;
    resultMsrQual: string;
    resultStatus: string;
    statisticBaseCode: string;
    resultValueType: string;
    weightBasis: string;
    timeBasis: string;
    tempBasis: string;
    particlesizeBasis: string;
    precisionValue: string;
    biasValue: string;
    resultComment: string;
    resDepthHeightMsg: string;
    resDepthHeightMsrUnit: string;

    bioIntentName: string;
    bioIndividualId: string;
    bioSubjectTaxonomy: string;
    bioUnidentifiedSpeciesId: string;
    bioSampleTissueAnatomy: string;
    grpSummCountWeightMsr: string;
    grpSummCountWeightMsrUnit: string;
    freqClassCode: string;
    freqClassUnit: string;
    analyticMethodId: string;
    analyticMethodCtx: string;
    labName: string;
    labAnalysisStartDt: string;
    labAnalysisEndDt: string;
    resultLabCommentCode: string;
    methodDetectionLevel: string;
    labReportingLevel: string;
    pql: string;
    lowerQuantLimit: string;
    upperQuantLimit: string;
    detectionLimitUnit: string;
    labSampPrepStartDt: string;
    dilutionFactor: string;
    importStatusCd: string;
    importStatusDesc: string;

}
export interface TWqxImportTemplate {
    templateId: number;
    orgId: string;
    typeCd: string;
    templateName: string;
    createDt: string;
    createUserId: string;
}
export interface TWqxImportTemplateDtl {
    templateDtlId: number;
    templateId: number;
    colNum: number;
    fieldMap: string;
    charName: string;
    charDefaultUnit: string;
    createDt: string;
    createUserId: string;
    charDefaultSampFraction: string;
}
export interface TWqxImportLog {
    importId: number;
    orgId: string;
    typeCd: string;
    fileName: string;
    fileSize: number;
    importStatus: string;
    importProgress: string;
    importProgressMsg: string;
    importFile: Uint8Array;
    createDt: string;
    createUserId: string;
}
export interface ImportStatusModel {
    importStatus: boolean;
    importStatusMsg: string;
}
export abstract class TWqxImportData {
    abstract GetWQX_IMPORT_TEMP_MONLOCByUserIdx(userIdx: number): Observable<TWqxImportTempMonloc[]>;

}
