import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavService, Menu } from '../../../services/nav.service';
import { DataTabsService } from '../../../services/data-tabs.service';
import { BehaviorSubject, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface InfoMenu {
  parentMenu:string;
  childMenu:string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {

  public menuItems: Menu[];
  public PermisoMenus: any[] = [];
  public Nuevomenu:any[] = [];
  public url: any;
  public fileurl: any;
 
  infoMenu:InfoMenu = {childMenu:"",parentMenu:""};

  constructor(public dataTabsService:DataTabsService,private router: Router, public navServices: NavService,
  private  http:HttpClient) {

    this.menus();


    this.PermisoMenus 
 

 

    //this.navServices.items.subscribe(menuItems => {
   
      // this.menuItems = menuItems


     

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.menuItems.filter(items => {
             console.log(items)
            if (items.path === event.url)
              this.setNavActive(items,event)
            if (!items.children) return false
            items.children.filter(subItems => {
              if (subItems.path === event.url)
                this.setNavActive(subItems,event)
              if (!subItems.children) return false
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === event.url)
                  this.setNavActive(subSubItems,event)
              })
            })
          })
        }
      })


   // })
  }


 async menus(){
  await this.http.get('http://localhost/ApoautisApis/v1/permiso_mostrar').subscribe((resp:any[])=>{
			console.log(resp)
		
			console.log(resp[0].Permiso_consultar);
	
				let MENUITEMS = [
					{
						title: 'Mantenimientos', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
							
								resp[0].Permiso_consultar == 1 ? {  path: 'administracion/nivel_academico', title: 'Nivel Academico', type: 'link',id:6 } : {},
                resp[1].Permiso_consultar == 1 ? { path: 'administracion/nacionalidad', title: 'Nacionalidad', type: 'link' }  : {},
                resp[2].Permiso_consultar == 1 ?	{ path: 'administracion/sedes', title: 'Sedes', type: 'link' }: {},
                resp[3].Permiso_consultar == 1 ?	{ path: 'administracion/parentesco', title: 'Parentesco', type: 'link' }: {},
                resp[4].Permiso_consultar == 1 ? { path: 'administracion/genero', title: 'Genero', type: 'link' }: {},
                resp[5].Permiso_consultar == 1 ?{ path: 'administracion/tipo_persona', title: 'Tipo Persona', type: 'link' }: {},
                resp[6].Permiso_consultar == 1 ?{ path: 'administracion/tipo_evaluacion', title: 'Tipo Evaluacion', type: 'link' }: {},
                resp[7].Permiso_consultar == 1 ?{ path: 'administracion/tipo_inclusion', title: 'Tipo Inclusion', type: 'link' }: {},
                resp[8].Permiso_consultar == 1 ?{ path: 'administracion/tipo_especialidad', title: 'Tipo Especialidad', type: 'link' }: {},
                resp[9].Permiso_consultar == 1 ?{ path: 'administracion/modalidad_atencion', title: 'Modalidad Atencion', type: 'link' }: {},
                resp[10].Permiso_consultar == 1 ?{ path: 'administracion/modalidad_servicio', title: 'Modalidad Servicio', type: 'link' }: {},
                resp[11].Permiso_consultar == 1 ?{ path: 'administracion/servicio_social', title: 'Servicio Social', type: 'link' }: {},
							]
					},
					{
						title: 'modulo Seguridad', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
                resp[12].Permiso_consultar == 1 ?	{ path: 'mantenimientos/usuarios', title: 'Usuarios', type: 'link' }: {},
                resp[13].Permiso_consultar == 1 ?	{ path: 'modulo_seguridad/preguntas', title: 'Preguntas', type: 'link' }: {},
								resp[14].Permiso_consultar == 1 ?{ path: 'modulo_seguridad/objetos', title: 'Objetos', type: 'link' }: {},
                resp[15].Permiso_consultar == 1 ?	{ path: 'modulo_seguridad/roles', title: 'Roles', type: 'link' }: {},
                resp[16].Permiso_consultar == 1 ?	{ path: 'modulo_seguridad/permisos', title: 'Permisos', type: 'link' }: {},
								resp[17].Permiso_consultar == 1 ?{ path: 'modulo_seguridad/parametros', title: 'Parametros', type: 'link' }: {},
                resp[18].Permiso_consultar == 1 ?	{ path: 'modulo_seguridad/estados', title: 'Estados', type: 'link' }: {},
                resp[19].Permiso_consultar == 1 ?	{ path: 'modulo_seguridad/bitacora', title: 'Bitacora', type: 'link' }: {}
							]
					},
					{
						title: 'Personas', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
                resp[20].Permiso_consultar == 1 ? { path: 'beneficiarios/beneficiario', title: 'Personas', type: 'link' }: {},
							]
					},
					{
						title: 'Colaboradores', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
                resp[21].Permiso_consultar == 1 ?	{ path: 'colaboradores/depto-laboral', title: 'Departamento Laboral', type: 'link' }: {},
                resp[22].Permiso_consultar == 1 ?	{ path: 'colaboradores/colaborador', title: 'Colaborador', type: 'link' }: {}
							]
					},
					{
						title: 'Area Psicologica', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
                resp[23].Permiso_consultar == 1 ?	{ path: "area-psicologica/solicitud-evaluacion", title: "Solicitud Evaluacion", type: 'link' }: {},
                resp[24].Permiso_consultar == 1 ?		{ path: "area-psicologica/diagnostico-evaluacion", title: "Diagnostico Evaluacion", type: 'link' }: {}
							]
					},
					{
						title: 'Area Academica', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
                resp[25].Permiso_consultar == 1 ?		{ path: "area-academica/matricula", title: "Matricula", type: 'link' }: {},
                resp[26].Permiso_consultar == 1 ?	 { path: "area-academica/informe-academico", title: "Informe Academico", type: 'link' }: {},
                resp[26].Permiso_consultar == 1 ?	{ path: "area-academica/registro-servicio-social", title: "Registro Servicio Social", type: 'link' }: {}
							]
					}
				]
        this.menuItems = MENUITEMS
		})
  }

  // Active Nave state
  setNavActive(item,e) {
    this.menuItems.filter(menuItem => {
      menuItem.children.filter(submenuItems => {
        if(item.path===submenuItems.path){
          this.infoMenu.childMenu=submenuItems.title;
          return;
        }
      });
    });



    this.infoMenu.parentMenu=this.menuItems[0].title;
    //this.infoMenu.childMenu=this.menuItems[0].children[e.id-1].title;
    this.menuItems.filter(menuItem => {
      if (menuItem != item)
        menuItem.active = false
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true
            submenuItems.active = true
          }
        })
      }
    })
    //console.log(this.infoMenu);
  }

  setSubMenuActive(childrenItem,menuItem){
    this.dataTabsService.setTabActivoObs(childrenItem.title);
  }
  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item))
          a.active = false
        if (!a.children) return false
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false
          }
        })
      });
    }
    item.active = !item.active
  }

  //Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }
  InfoMenu = new BehaviorSubject<InfoMenu>(this.infoMenu);
}
