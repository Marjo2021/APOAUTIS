import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MantenimientoService} from '../mantenimiento.service'

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent {

  constructor(public _servi: MantenimientoService,
    public _dialoref: MatDialogRef<ModalUserComponent>,
    private toas:ToastrService) {
      this._servi.mostrarroles();
      this._servi.mostrarsedes();
     }

  guardar() {


    if (!this._servi.form.get('id_usuario')?.value) {
      let params = {
        tipo: "post",
        id_usuario:this._servi.form.value.id_usuario,
        Cod_rol: this._servi.form.value.Cod_rol,
        Cod_sede: this._servi.form.value.Cod_sede,
        nombre_usuario:this._servi.form.value.nombre_usuario,
        pass: this._servi.form.value.pass,
        estado_usuario: this._servi.form.value.estado_usuario,
        correo_electronico: this._servi.form.value.correo_electronico,
      }
      this._servi.crear(params).subscribe(resp => {
        console.log(resp)
        this._servi.mostrar();
        this.cerrarmodal();
        this.toas.success('Creado correctamente');
      });
    } else {
      let params = {
        tipo: "update",
        id_usuario:this._servi.form.value.id_usuario,
        Cod_rol: this._servi.form.value.Cod_rol,
        Cod_sede: this._servi.form.value.Cod_sede,
        nombre_usuario:this._servi.form.value.nombre_usuario,
        pass: this._servi.form.value.pass,
        estado_usuario: this._servi.form.value.estado_usuario,
        correo_electronico: this._servi.form.value.correo_electronico
      }
      this._servi.actualizar(params).subscribe(resp => {
        console.log(resp)
        this._servi.mostrar();
      //  this.cerrarmodal();
        this.toas.success('Editado correctamente');
      });
    }
  }


  //limpia modal
  clear() {
    this._servi.form.reset();
    this._servi.inicializarForm();
  }

  //cerrarmodal
  cerrarmodal() {
    this._dialoref.close();
  }

}
