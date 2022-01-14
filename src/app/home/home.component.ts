import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaBancariaService } from '../_services/cuentaBancaria.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  userInfo: any;
  cuentasBancarias: any;
  isLoading: boolean = true;

  constructor(
    private cuentaBancariaService : CuentaBancariaService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      let username = this.tokenStorage.getUser();
      this.userInfo = username;
      console.log(this.userInfo);
      
    }

    this.cuentaBancariaService.getAccountbyId(this.userInfo.id).subscribe({
      next: data => {
        this.cuentasBancarias = data;
        this.isLoading = false;        
      },
      error: err => {
        console.log(err)
      }
    });
  }

  showTransactions(cuentaBancaria: any) {
    this.router.navigate(['/ViewTransactions'],{state: {cuentaBancaria: cuentaBancaria}});
  }

  onDeposit (cuentaBancaria : any) {
    this.router.navigate(['/depositOrWithdraw'],{state: {cuentaBancaria: cuentaBancaria}});
  }

}
