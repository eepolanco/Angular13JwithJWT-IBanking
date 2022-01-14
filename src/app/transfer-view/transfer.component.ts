import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferenciaBancariaService } from '../_services/transferenciaBancaria.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  cuentaBancaria: any;
  isLoading: boolean = true;
  displayedColumns: string[] = ['position', 'NumeroCuentaOrigen', 'NumeroCuentaDestino', 'MontoTransaccion'];
  dataSource = [];

  constructor(private transferenciaBancariaService : TransferenciaBancariaService,
    private router: Router) { }

  ngOnInit(): void {

    this.cuentaBancaria = history.state.cuentaBancaria;
    !this.cuentaBancaria && this.router.navigate([`/home`]);

    this.transferenciaBancariaService.getTransferbyId(this.cuentaBancaria.numeroCuenta).subscribe({
      next: data => { 
        this.dataSource = data;
        this.isLoading = false;       
      },
      error: err => {
        console.log(err)
      }
    });
  }

}
