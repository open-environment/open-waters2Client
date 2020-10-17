import { Injectable } from '@angular/core';
import { TWqxImportData, TWqxImportTempMonloc, ImportSampleResultDisplay, TWqxImportTemplate, TWqxImportTemplateDtl, TWqxImportLog, TWqxImportTempProject } from '../wqx-data/wqx-import';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WebApi } from '../utils/web-api';

@Injectable({
  providedIn: 'root',
})
export class WqxImportService extends TWqxImportData {



  constructor(private http: HttpClient) {
    super();
  }
  ProcessWqxImportData(userIdx: number, orgId: string, importType: string,
    importData: string, templateInd: string, projectId: number,
    projectName: string, templateId: number, template: string): Observable<string> {
    const httpOptions = { responseType: 'text' as 'json' };
    const body = {
      userIdx: userIdx,
      orgId: orgId,
      importType: importType,
      importData: importData,
      templateInd: templateInd,
      projectId: projectId,
      projectName: projectName,
      templateId: templateId,
      template: template,
    };
    return this.http.post<string>(WebApi.ImportApi.processWqxImportData(), body, httpOptions);
  }
  GetWQX_IMPORT_TEMP_MONLOCByUserIdx(userIdx: number): Observable<TWqxImportTempMonloc[]> {
    return this.http.get<TWqxImportTempMonloc[]>(WebApi.ImportApi.getWqxImportTempMonloc(userIdx));
  }
  GetWQX_IMPORT_TEMP_ProjectByUserIdx(userIdx: number): Observable<TWqxImportTempProject[]> {
    return this.http.get<TWqxImportTempProject[]>(WebApi.ImportApi.getWqxImportTempProject(userIdx));
  }
  GetWQX_IMPORT_TEMP_SAMPLEByUserIdx(userIdx: number): Observable<ImportSampleResultDisplay[]> {
    return this.http.get<ImportSampleResultDisplay[]>(WebApi.ImportApi.getWqxImportTempSample(userIdx));
  }
  ProcessImportTempMonloc(wqxImport: boolean, wqxSubmitStatus: string, selectedTempMonlocIds: string, userIdx: number): Observable<number> {
    const httpOptions = {};
    const body = {
      wqxImport: wqxImport,
      wqxSubmitStatus: wqxSubmitStatus,
      selectedTempMonlocIds: selectedTempMonlocIds,
      userIdx: userIdx,
    };
    return this.http.post<number>(WebApi.ImportApi.processImportTempMonloc(), body, httpOptions);
  }
  ProcessImportTempProject(wqxImport: boolean, wqxSubmitStatus: string, selectedTempProjectIds: string, userIdx: number): Observable<number> {
    const httpOptions = {};
    const body = {
      wqxImport: wqxImport,
      wqxSubmitStatus: wqxSubmitStatus,
      selectedTempMonlocIds: selectedTempProjectIds,
      userIdx: userIdx,
    };
    return this.http.post<number>(WebApi.ImportApi.processImportTempProject(), body, httpOptions);
  }
  ProcessImportTempSample(wqxSubmitStatus: string, activityReplaceType: string, userIdx: number): Observable<number> {
    const httpOptions = {};
    const body = {
      wqxImport: false,
      wqxSubmitStatus: wqxSubmitStatus,
      selectedTempMonlocIds: '',
      userIdx: userIdx,
      activityReplaceType: activityReplaceType,
    };
    return this.http.post<number>(WebApi.ImportApi.processImportTempSample(), body, httpOptions);
  }
  CancelProcessImportTempMonloc(userIdx: number): Observable<number> {
    const httpOptions = {};
    const body = {
      wqxImport: false,
      wqxSubmitStatus: '',
      selectedTempMonlocIds: '',
      userIdx: userIdx,
    };
    return this.http.post<number>(WebApi.ImportApi.cancelProcessImportTempMonloc(), body, httpOptions);
  }
  CancelProcessImportTempProject(userIdx: number): Observable<number> {
    const httpOptions = {};
    const body = {
      wqxImport: false,
      wqxSubmitStatus: '',
      selectedTempMonlocIds: '',
      userIdx: userIdx,
    };
    return this.http.post<number>(WebApi.ImportApi.cancelProcessImportTempProject(), body, httpOptions);
  }
  CancelProcessImportTempSample(userIdx: number): Observable<number> {
    const httpOptions = {};
    const body = {
      wqxImport: false,
      wqxSubmitStatus: '',
      selectedTempMonlocIds: '',
      userIdx: userIdx,
    };
    return this.http.post<number>(WebApi.ImportApi.cancelProcessImportTempSample(), body, httpOptions);
  }
  GetWQX_IMPORT_TEMPLATE(orgId: string): Observable<TWqxImportTemplate[]> {
    return this.http.get<TWqxImportTemplate[]>(WebApi.ImportApi.getWqxImportTemplate(orgId));
  }
  GetWQX_IMPORT_TEMPLATE_DTL_DynamicByTemplateID(templateId: number): Observable<TWqxImportTemplateDtl[]> {
    return this.http.get<TWqxImportTemplateDtl[]>(WebApi.ImportApi.getWqxImportTemplateDtlDynamicByTemplateId(templateId));
  }
  GetWQX_IMPORT_TEMPLATE_DTL_HardCodeByTemplateID(templateId: number): Observable<TWqxImportTemplateDtl[]> {
    return this.http.get<TWqxImportTemplateDtl[]>(WebApi.ImportApi.getWqxImportTemplateDtlHarCodeByTemplateId(templateId));
  }
  DeleteT_WQX_IMPORT_TEMPLATE(templateId: number): Observable<number> {
    return this.http.delete<number>(WebApi.ImportApi.deleteTWqxImportTemplate(templateId));
  }
  InsertOrUpdateWQX_IMPORT_TEMPLATE(data: TWqxImportTemplate): Observable<number> {
    const httpOptions = {};
    const body = {
      TemplateId: data.templateId,
      OrgId: data.orgId,
      TypeCd: data.typeCd,
      TemplateName: data.templateName,
      CreateUserid: data.createUserId,
    };
    return this.http.post<number>(WebApi.ImportApi.insertOrUpdateWqxImportTemplate(), body, httpOptions);
  }
  InsertOrUpdateWQX_IMPORT_TEMPLATE_DTL(data: TWqxImportTemplateDtl): Observable<number> {
    const httpOptions = {};
    const body = {
      TemplateDtlId: data.templateDtlId,
      TemplateId: data.templateId,
      ColNum: data.colNum,
      FieldMap: data.fieldMap,
      CharName: data.charName,
      CharDefaultUnit: data.charDefaultUnit,
      CreateUserid: data.createUserId,
      CharDefaultSampFraction: data.charDefaultSampFraction,
    };
    return this.http.post<number>(WebApi.ImportApi.insertOrUpdateWqxImportTemplateDtl(), body, httpOptions);
  }
  DeleteT_WQX_IMPORT_TEMPLATE_DTL(templateDtlId: number): Observable<number> {
    return this.http.delete<number>(WebApi.ImportApi.deleteTWqxImportTemplateDtl(templateDtlId));
  }
  GetWQX_IMPORT_LOG(orgId: string): Observable<TWqxImportLog[]> {
    return this.http.get<TWqxImportLog[]>(WebApi.ImportApi.getWqxImportLog(orgId));
  }
  DeleteTWqxImportLog(importId: number): Observable<number> {
    return this.http.delete<number>(WebApi.ImportApi.deleteTWqxImportLog(importId));
  }
  InsertOrUpdateTwqxImportLog(data: TWqxImportLog): Observable<number> {
    const httpOptions = {};
    const body = data;
    return this.http.post<number>(WebApi.ImportApi.insertOrUpdateTwqxImportLog(), body, httpOptions);
  }
  ImportActivityAsync(orgId: string, importId: number, userId: string): Observable<boolean> {
    return this.http.get<boolean>(WebApi.ImportApi.importActivity(orgId, importId, userId));
  }
}
