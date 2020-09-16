import { Observable } from 'rxjs';

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
    TempSampleIdx: number;
    OrgId: string;
    ProjectId: string;
    MonlocId: string;
    ActivityId: string;
    ActType: string;
    ActMedia: string;
    ActSubmedia: string;
    ActStartDt: string;
    ActEndDt: string;
    ActTimeZone: string;
    RelativeDepthName: string;
    ActDepthheightMsr: string;
    ActDepthheightMsrUnit: string;
    TopDepthheightMsr: string;
    TopDepthheightMsrUnit: string;
    BotDepthheightMsr: string;
    BotDepthheightMsrUnit: string;
    DepthRefPoint: string;
    ActComment: string;
    BioAssemblageSampled: string;
    BioDurationMsr: string;
    BioDurationMsrUnit: string;
    BioSampComponent: string;
    BioSampComponentSeq: number;
    SampCollMethodId: string;
    SampCollMethodCtx: string;
    SampCollEquip: string;
    SampCollEquipComment: string;
    SampPrepId: string;
    SampPrepCtx: string;

    TempResultIdx: number;
    DataLoggerLine: string;
    ResultDetectCondition: string;
    CharName: string;
    MethodSpeciationName: string;
    ResultSampFraction: string;
    ResultMsr: string;
    ResultMsrUnit: string;
    ResultMsrQual: string;
    ResultStatus: string;
    StatisticBaseCode: string;
    ResultValueType: string;
    WeightBasis: string;
    TimeBasis: string;
    TempBasis: string;
    ParticlesizeBasis: string;
    PrecisionValue: string;
    BiasValue: string;
    ResultComment: string;
    RES_DEPTH_HEIGHT_MSG: string;
    RES_DEPTH_HEIGHT_MSR_UNIT: string;

    BioIntentName: string;
    BioIndividualId: string;
    BioSubjectTaxonomy: string;
    BioUnidentifiedSpeciesId: string;
    BioSampleTissueAnatomy: string;
    GrpSummCountWeightMsr: string;
    GrpSummCountWeightMsrUnit: string;
    FreqClassCode: string;
    FreqClassUnit: string;
    AnalyticMethodId: string;
    AnalyticMethodCtx: string;
    LabName: string;
    LabAnalysisStartDt: string;
    LabAnalysisEndDt: string;
    ResultLabCommentCode: string;
    MethodDetectionLevel: string;
    LabReportingLevel: string;
    Pql: string;
    LowerQuantLimit: string;
    UpperQuantLimit: string;
    DetectionLimitUnit: string;
    LabSampPrepStartDt: string;
    DilutionFactor: string;
    ImportStatusCd: string;
    ImportStatusDesc: string;

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
export abstract class TWqxImportData {
    abstract GetWQX_IMPORT_TEMP_MONLOCByUserIdx(userIdx: number): Observable<TWqxImportTempMonloc[]>;

}