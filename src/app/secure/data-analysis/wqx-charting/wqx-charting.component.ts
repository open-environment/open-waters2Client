import { formatDate } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { ChartComponent } from 'angular2-chartjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { CharDisplay } from '../../../@core/wqx-data/wqx-activity';
import { WqxMonloc } from '../../../@core/wqx-data/wqx-monloc';
import { WQXActivityService } from '../../../@core/wqx-services/wqx-activity-service';
import { WqxMonlocService } from '../../../@core/wqx-services/wqx-monloc.service';

@Component({
  selector: 'ngx-wqx-charting',
  templateUrl: './wqx-charting.component.html',
  styleUrls: ['./wqx-charting.component.scss'],
})
export class WqxChartingComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('myChart', { static: true }) myChart: ChartComponent;

  user: User;
  currentOrgID: string = '';

  data: any;
  options: any;
  colors: any;
  themeSubscription: any;
  selectedChartType: string = 'SERIES';
  selectedDataInclude: string = '';
  selectedCharacteristic: string = '';
  selectedCharacteristic2: string = '';
  showSecondCharacteristic: boolean = false;

  characteristics: CharDisplay[];
  monlocs: WqxMonloc[] = [];
  monlocSelected: string = '';
  monlocSelectedMulti: string[] = [];
  txtStartDate: string = '';
  txtEndDate: string = '';
  txtDecimals: string = '';
  showChart: string = 'hide';
  chkZero: boolean = false;
  selectedChartStyle: string = 'line';


  constructor(private theme: NbThemeService,
    private monlocService: WqxMonlocService,
    private authService1: AuthService,
    private activityService: WQXActivityService,
    private toasterSerivce: NbToastrService) {

    const u = this.authService1.getUser();
    console.log(u.profile.sub);
    // this.currentUser = token.getPayload();
    // TODO: need to fix this
    if (this.user === undefined || this.user === null)
      this.user = {
        userIdx: 0,
        name: '',
        picture: '',
        UserIDX: '',
        OrgID: '',
        isAdmin: '',
      };
    this.user.userIdx = u.userIdx;
    this.user.name = u.name;
    this.user.OrgID = u.OrgID;
    this.user.isAdmin = u.isAdmin;
    this.currentOrgID = this.user.OrgID;
    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgID = localStorage.getItem('selectedOrgId');
    }

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          // position: 'bottom',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        hover: {
          mode: 'index',
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                // labelString: 'Month',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                // labelString: 'Value',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                beginAtZero: false,
              },
            },
          ],
        },
      };
    });
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit() {
    console.log(this.myChart);
    this.activityService.GetTWqxResultSampledCharacteristics(this.currentOrgID).subscribe(
      (result: CharDisplay[]) => {
        console.log('GetTWqxResultSampledCharacteristics: valid');
        console.log(result);
        this.characteristics = result;
      },
      (err) => {
        console.log('GetTWqxResultSampledCharacteristics: failed');
        console.log(err);
      },
    );
    this.monlocService.GetWQX_MONLOC(true, this.currentOrgID, false)
      .subscribe(
        (data) => {
          this.monlocs = data;
        },
      );
  }
  ngAfterViewInit() {
    // console.log(this.myChart);
    // this.myChart.chart.ctx.canvas.height = 500;
  }

  populateChart() {
    // this.options.scales.xAxes[0].type = this.selectedChartType === 'MLOC' ? 'bar' : 'line';
    // this.options.scales.yAxes[0].ticks.beginAtZero = this.chkZero;
    if (this.selectedChartType === 'MLOC') {
      this.selectedChartStyle = 'bar';
      const obj = this.options;
      obj.scales.xAxes[0].type = 'category';
      this.options = JSON.parse(JSON.stringify(obj));
    } else {
      this.selectedChartStyle = 'line';
      const obj = this.options;
      obj.scales.xAxes[0].type = 'time';
      this.options = JSON.parse(JSON.stringify(obj));
    }


    const charType = this.selectedChartType;
    const characteristic = encodeURIComponent(this.selectedCharacteristic);
    let characteristic2 = '';
    if (this.selectedCharacteristic2) {
      characteristic2 = encodeURIComponent(this.selectedCharacteristic2);
    }
    let begDt = '';
    if (this.txtStartDate) {
      begDt = this.txtStartDate;
    }
    let endDt = '';
    if (this.txtEndDate) {
      endDt = this.txtEndDate;
    }
    if (this.selectedChartType === 'SERIES') {
      this.monlocSelectedMulti = [];
      if (this.monlocSelected) {
        this.monlocSelectedMulti.push(this.monlocSelected);
      }
    }
    const monloc = this.monlocSelectedMulti;
    const decimal = this.txtDecimals;
    const wqxInd = this.selectedDataInclude;
    this.monlocService.GetChartData(this.currentOrgID,
      charType, characteristic, characteristic2,
      begDt, endDt, monloc, decimal, wqxInd).subscribe(
        (result) => {
          console.log('GetChartData: valid');
          const jsonResult = JSON.parse(result += '');
          if (jsonResult && jsonResult.length > 0) {
            const aLabels = Array.of(jsonResult[0]);
            let aDatasets1 = Array.of(jsonResult[1]);
            const aRawData = Array.of(jsonResult[2]);
            let unitText = '';
            if (aRawData[0][0].resulT_MSR_UNIT) {
              unitText = aRawData[0][0].resulT_MSR_UNIT;
            }
            const showLines: boolean = this.selectedChartStyle !== 'scatter';
            if (this.selectedChartType === 'MLOC') {
              const myNewDataset = {
                label: decodeURIComponent(characteristic),
                showLine: showLines,
                data: aDatasets1,
                lineTension: 0,
                borderColor: this.colors.primary,
                backgroundColor: this.colors.primary,
                fill: false,
                borderDash: [5, 5],
                pointRadius: 8,
                pointHoverRadius: 10,
              };
              this.data = {
                labels: aLabels,
                datasets: [myNewDataset],
              };
            } else {
              aDatasets1 = [];
              aRawData[0].forEach(element => {
                console.log(element);
                const xVal = element.acT_START_DT;
                // const xVal = new Date(element.acT_START_DT);
                // let formattedDt = formatDate(xVal, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US');
                let yVal: number = +element.resulT_MSR;
                if (decimal && +decimal > 0) {
                  yVal = +(parseFloat(element.resulT_MSR).toFixed(+decimal));
                }
                aDatasets1.push({ x: xVal, y: yVal });


                // xDatasets2.push('{x: -10, y: 0},{ x: 0, y: 10},{x: 10, y: 5 }');
              });
              const myNewDataset = {
                label: decodeURIComponent(characteristic),
                showLine: showLines,
                data: aDatasets1,
                lineTension: 0,
                borderColor: this.colors.primary,
                backgroundColor: this.colors.primary,
                borderWidth: 1,
              };
              this.data = {
                labels: aLabels,
                datasets: [myNewDataset],
              };
            }

          }
        },
        (err) => {
          console.log('GetChartData: failed');
          console.log(err);
        },
        () => {
          this.showChart = 'show';
        }
      );
  }
  onChageChartType(chartType: string) {
    console.log(chartType);
  }
  onChageDataInclude(dataInclude: string) {
    console.log(dataInclude);
  }
  showClicked() {
    console.log(this.monlocSelectedMulti);
    if (this.selectedCharacteristic) {
      this.populateChart();
    } else {
      this.toasterSerivce.danger('Characteristic is required.');
    }
  }
  onChkZeroChanged(chkZero) {
    const obj = this.options;
    obj.scales.yAxes[0].ticks.beginAtZero = chkZero;
    this.options = JSON.parse(JSON.stringify(obj));
  }
  onChageChartStyle(chartStyle) {
  }
  onChageCharacteristic(characteristic) {
    if (characteristic) {
      this.showSecondCharacteristic = true;
    }
  }
  private random() {
    return Math.round(Math.random() * 100);
  }
}
