import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx'; 
import { PageEvent } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { PacageService} from './pacage.service'
import {ModalEspecialidadComponent} from './modal-especialidad/modal-especialidad.component'
import * as printJS from 'print-js';
import { NavService } from 'src/app/services/nav.service';
@Component({
  selector: 'app-tipo-especialidad',
  templateUrl: './tipo-especialidad.component.html',
  styleUrls: ['./tipo-especialidad.component.scss']
})
export class TipoEspecialidadComponent implements OnInit {
  loading=true;
  loadingConfig=true;
  mostrarModal=false;
  data:any;
  temp:any;
  mostrarInsert=true;
  codObjeto=12;
  user="USER";

  permisoinsertar:boolean;
  permisoeliminar:boolean;
  permisoactualizar:boolean;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 5; //hasta donde
  buscar: any = '';
  campo: any = ['Tipo_especialidad'];

  constructor(private http:HttpClient,private toastr: ToastrService,
             public service:PacageService,
             private _dialog: MatDialog,
             private navpermiso:NavService) {
               
              let params = {
                rol: 1,
                objeto: 14
              }

              this.navpermiso.menuspermiso(params).subscribe(resp=>{
                 console.log(resp)
                 this.permisoinsertar = resp[0].Permiso_insertar == '1' ?  true : false;
                 this.permisoeliminar = resp[0].Permiso_eliminar == '1' ?  true : false;
                 this.permisoactualizar = resp[0].Permiso_actualizar == '1' ?  true : false;
                 console.log(this.permisoinsertar )
              });
              }

  ngOnInit(): void {
    this.service.mostrar();
  }


  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '15%';
    this._dialog.open(ModalEspecialidadComponent, dialogConfig);
    this.service.popform(item);
  }

  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '15%';
    this._dialog.open(ModalEspecialidadComponent, dialogConfig);
    this.service.inicializarForm();
  }

  eliminar(id: any) {
    console.log(id)
  
      let params = {
        tipo:"delete",
        Cod_tipo_especialidad: id,
      }
      this.service.eliminar(params).subscribe((resp: any) => {
        this.service.mostrar();
        this.toastr.error('Eliminado correctamente');
      });
    
  }

  impo() {

    let url = 'assets/logooo.jpeg';
    let rawHTML = `
   <div id="otra">
  
   <div class="parraf">
   <img src="${url}">
   <h5>ASOCIACIÓN HONDUREÑA DE APOYO AL AUTISTA</h5>
   <h5>REPORTE</h5>
   <h5>Listado Tipos de Especialidades</h5>
   </div>
   </div><br>`;
    printJS({
      printable: 'reporte',
      type: 'html',
      header: rawHTML,
      css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      style: '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
      scanStyles: false,
      documentTitle: 'Servicios',
      font_size: '10pt',
      ignoreElements: ['d']
    })
  
  }
}
