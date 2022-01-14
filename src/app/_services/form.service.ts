import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class FormService {
  constructor(private fb: FormBuilder) {}

  depositForm() {
    return this.fb.group({
      NumeroCuenta: [{ value: 0, disabled: true }],
      IdTipoAccion: [{ value: null, disabled: false }],
      Monto: [{ value: null, disabled: false }],
  });
}

transferForm() {
  return this.fb.group({
    NumeroCuentaOrigen: [{ value: null, disabled: false }, Validators.required],
    NumeroCuentaDestino: [{ value: null, disabled: false }, [Validators.minLength(8)] ],
    IdTipoTransaccion: [{ value: 1, disabled: false }], 
    MontoTransaccion: [{ value: null, disabled: false }]
});
}
}