import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class HelperService {

    formatCurrency(value?: any, pattern: any = ',') {
        if (value) {
            return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + pattern) + '.00';
        } else {
            return '0.00';
        }
    }

    formatNumber(value?: any, pattern: any = ',') {
        if (value) {
            return value.replace(new RegExp(pattern, 'g'), '').toFixed(0);
        } else {
            return '0';
        }
    }

    toJson(jsonData: any) {
        let response: any = '';
        try {
            response = JSON.parse(jsonData);
        } catch (e) {
            response = jsonData;
        }
        return response;
    }

    toString(jsonData: any) {
        let response: any = '';
        if (typeof(jsonData) === 'object') {
            try {
              response = JSON.stringify(jsonData);
            } catch (e) {
              response = jsonData;
            }
        } else {
            response = jsonData;
        }
        return response;
    }

    createStorage(name: string, value: any, param: string = 'local') {
      let returnValue: boolean = false;
      if (localStorage) {
          value = this.toString(value);
          switch (param) {
              case 'local':
                  localStorage.setItem(name, value);
                  break;
              case 'session':
                  sessionStorage.setItem(name, value);
                  break;
              default:
                  localStorage.setItem(name, value);
          }
          returnValue = true;
      }

      return returnValue;
    }

    readStorage(name: string, param: string = 'local') {
        let returnValue: any = '';
        if (localStorage) {
            switch (param) {
                case 'local':
                    returnValue = localStorage.getItem(name);
                    break;
                case 'session':
                    returnValue = sessionStorage.getItem(name);
                    break;
                default:
                    returnValue = localStorage.getItem(name);
            }
        } else {
            returnValue = '';
        }
        return this.toJson(returnValue);
    }

    eraseStorage(name: string, param: string = 'local') {
        let returnValue: boolean = false;
        if (localStorage) {
            switch (param) {
                case 'local':
                    localStorage.removeItem(name);
                break;
                case 'session':
                    sessionStorage.removeItem(name);
                break;
                default:
                    localStorage.removeItem(name);
            }
            returnValue = true;
        }

        return returnValue;
    }

    clearStorage(param: string = 'local') {
        let returnValue: boolean = false;
        if (localStorage) {
            switch (param) {
                case 'local':
                    localStorage.clear();
                break;
                case 'session':
                    sessionStorage.clear();
                break;
                default:
                    localStorage.clear(); sessionStorage.clear();
            }
            returnValue = true;
        }

        return returnValue;
    }

    formatDate(date: Date) {
        let month: string = (date.getMonth() + 1).toString(),
            day: string = date.getDate().toString(),
            year: string = date.getFullYear().toString();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return [month, day, year].join('-');
    }

    cleanData(data: any) {
        if (typeof(data) === 'object') {
            _.forEach(data, (value, key) => {
                if (typeof(value) === 'object') {
                    this.cleanData(value);
                } else {
                    if (typeof(value.replace) !== 'undefined') {
                        data[key] = value.replace(/[^A-Za-z0-9 @._,-]/g, '').trim();
                    }
                }
            });
            return data;
        } else {
            if (typeof(data.replace) !== 'undefined') {
                return data.replace(/[^A-Za-z0-9 @._,-]/g, '').trim();
            } else {
                return data;
            }
        }
    }
}
