import { Injectable } from '@angular/core';

import * as UIkit from 'uikit';

@Injectable()
export class ToastService {

  constructor() { }

  toast(message: string, icon: string, status: string, timeout: string) {

    UIkit.notification(
      {
        message: '<i class="fas ' + icon + '"></i> ' + message,
        status: status,
        timeout: timeout
      }
    );
  }

}
