import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItemFromStorage(keyValue: string) {
    return localStorage.getItem(keyValue);
  }

  setItemInStorage(keyValue: string, data: any) {
    return localStorage.setItem(keyValue, data);
  }
  removeItemInStorage(keyValue:string){
    return localStorage.removeItem(keyValue)
  }
  constructor() {}
}
