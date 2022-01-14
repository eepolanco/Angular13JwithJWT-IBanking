import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../_services/form.service';
import { enumAccion } from './dataCombox';
import swal from 'sweetalert2';
import { CuentaBancariaService } from '../_services/cuentaBancaria.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  cuentaBancaria: any;
  comboxTipoAccion: any;
  isLoading: boolean = true;
  depositForm: FormGroup = this.formService.depositForm();

  constructor(private router: Router,
    private formService: FormService,
    private cuentaBancariaService: CuentaBancariaService
    ) { }

  ngOnInit(): void {

    this.cuentaBancaria = history.state.cuentaBancaria;
    !this.cuentaBancaria && this.router.navigate([`/home`]);

    this.depositForm.get('NumeroCuenta')?.setValue(this.cuentaBancaria.numeroCuenta);
    this.comboxTipoAccion = enumAccion;
    this.isLoading = false;

    this.handlerAmount();
  }

  


  onSave() {
    this.isLoading = true;
    this.cuentaBancariaService.depositOrWithdraw(this.depositForm.getRawValue()).subscribe({
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
  }


  handlerAmount() {
    this.depositForm.get('Monto')?.valueChanges.subscribe((newValue) => {
      if(this.depositForm.get('IdTipoAccion')?.value == 2
      && newValue > this.cuentaBancaria.montoActual) { 
        swal.fire(
          'No posee balance suficiente para este retiro, favor ingrese una cantidad menor',
          'Balance Disponible:' + this.cuentaBancaria.montoActual
        )

        this.depositForm.get('Monto')?.setValue(undefined);
      }
    })

    this.depositForm.get('IdTipoAccion')?.valueChanges.subscribe((idTipoAccion) => {
      if( idTipoAccion == 2
      && this.depositForm.get('Monto')?.value > this.cuentaBancaria.montoActual) { 
        swal.fire(
          'No posee balance suficiente para este retiro, favor ingrese una cantidad menor',
          'Balance Disponible:' + this.cuentaBancaria.montoActual
        )

        this.depositForm.get('Monto')?.setValue(undefined);
      }
    })
  }

}
