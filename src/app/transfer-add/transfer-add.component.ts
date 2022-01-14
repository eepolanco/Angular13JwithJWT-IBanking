import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentaBancariaService } from '../_services/cuentaBancaria.service';
import { FormService } from '../_services/form.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { TransferenciaBancariaService } from '../_services/transferenciaBancaria.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-transfer-add',
  templateUrl: './transfer-add.component.html',
  styleUrls: ['./transfer-add.component.css']
})
export class TransferAddComponent implements OnInit {

  transferForm: FormGroup = this.formService.transferForm();
  isLoading: boolean = false;
  cuentasBancarias: any;
  userInfo:any;

  constructor(private router: Router,
    private formService: FormService,
    private cuentaBancariaService : CuentaBancariaService,
    private transferenciaBancariaService : TransferenciaBancariaService,
    private tokenStorage: TokenStorageService
    ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      let username = this.tokenStorage.getUser();
      this.userInfo = username;
      this.handlerAmount();
      
    }

    this.cuentaBancariaService.getAccountbyId(this.userInfo.id).subscribe({
      next: data => {
        this.cuentasBancarias = data;
        console.log(this.cuentasBancarias);
        
        this.isLoading = false;        
      },
      error: err => {
        console.log(err)
      }
    });
  }

  onSave() {
    this.isLoading = true;
    let cuentaDestino = this.transferForm.get('NumeroCuentaDestino')?.value
    let cuentaOrigen = this.transferForm.get('NumeroCuentaOrigen')?.value

    
    if(this.transferForm.valid && cuentaOrigen != cuentaDestino) {

      this.transferenciaBancariaService.addTransaccion(this.transferForm.getRawValue()).subscribe({
        next: data => { 
          this.isLoading = false;       
  
          swal.fire({
            title: 'Éxito',
            text: 'Será redireccionado a sus cuentas bancarias',
            confirmButtonColor: '#66BB6A',
            icon: 'success'
          }).then((result) => {
                this.router.navigate([`/home`])
          });
          
        },
        error: err => {
          console.log(err)
        }
      });
      
    } else {
      this.isLoading = false;       
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las cuenta destino no debe ser igual a la origen!'
      })
      
    }
  }

  handlerAmount() {
    this.transferForm.get('MontoTransaccion')?.valueChanges.subscribe((newValue) => {
      let selectedAccount = this.transferForm.get('NumeroCuentaOrigen')?.value;
      let findAccount = this.cuentasBancarias.find((element: any) => element.numeroCuenta === selectedAccount); 

      if(newValue > findAccount.montoActual) { 
        swal.fire(
          'No posee balance suficiente para este retiro, favor ingrese una cantidad menor',
          'Balance Disponible:' + findAccount.montoActual
        )

        this.transferForm.get('MontoTransaccion')?.setValue(undefined);
      }
    })
  }

}
