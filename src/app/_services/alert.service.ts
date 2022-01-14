import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

// declare var swal: any;
@Injectable({
  providedIn: 'root'
})
export class AlertService {
    constructor() { }

    error(message: string, title?: string) {
        swal.fire({
            title: title || 'Error',
            text: message,
            confirmButtonColor: '#EF5350',
            icon: 'error'
        });


    }
    info(message: string, title?: string) {
        swal.fire({
            title: title || 'Información',
            text: message,
            confirmButtonColor: '#2196F3',
            icon: 'info'
        });
    }
    warning(message: string, title?: string) {
        swal.fire({
            title: title || 'Advertencia',
            text: message,
            confirmButtonColor: '#FF7043',
            icon: 'warning'
        });
    }
    success(message: string, title?: string) {
        return swal.fire({
            title: title || 'Éxito',
            text: message,
            confirmButtonColor: '#66BB6A',
            icon: 'success'
        });
    }
}
