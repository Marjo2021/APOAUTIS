import { Component, OnInit } from '@angular/core';
import { PacageService } from './pacage.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as  printJS from  'print-js';
import { ConsultasService } from './../../../services/consultas.service';
import {ModalRegistroComponent} from './modal-registro/modal-registro.component'

@Component({
  selector: 'app-registro-social',
  templateUrl: './registro-social.component.html',
  styleUrls: ['./registro-social.component.css']
})
export class RegistroSocialComponent implements OnInit {

  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 5; //hasta donde
  buscar: any = '';
  campo: any = ['Cargo_principal'];



  constructor(private http:HttpClient,private toastr: ToastrService,
             public service:PacageService,
             private _dialog: MatDialog,
             private bitacora:ConsultasService) { }

  ngOnInit(): void {
    let params = {
      tipo:"post",
      Cod_usuario: 85,
      Cod_objeto:19,
      Accion:'Entro',
      Descripcion:'Objeto'
  }
  this.bitacora.crear(params).subscribe(resp=>{
    console.log(resp)
  })
     this.service.mostrar();   
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    let params = {
      tipo:"post",
      Cod_usuario: 85,
      Cod_objeto:19,
      Accion:'Salio',
      Descripcion:'Objetos'
  }
  this.bitacora.crear(params).subscribe(resp=>{
    console.log(resp)
  })
  }


  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '23%';
    this._dialog.open(ModalRegistroComponent, dialogConfig);
    this.service.popform(item);
  }

  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '23%';
    this._dialog.open(ModalRegistroComponent, dialogConfig);
    this.service.inicializarForm();
  }

  eliminar(id: any) {   
      let params = {
        tipo:"delete",
        Cod_registro_servicio_social: id,
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
   <h5><b>ASOCIACIÓN HONDUREÑA DE APOYO AL AUTISTA</b></h5>
   <h5>REPORTE</h5>
   <h5>Listado  de informe academico</h5>
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
