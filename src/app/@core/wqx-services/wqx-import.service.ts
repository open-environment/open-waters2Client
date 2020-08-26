import { Injectable } from '@angular/core';
import { TWqxImportData, TWqxImportTempMonloc, ImportSampleResultDisplay } from '../wqx-data/wqx-import';
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
}
