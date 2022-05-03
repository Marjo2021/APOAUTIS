import { HttpClient } from '@angular/common/http';
import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	id?:number;
	children?: Menu[];
}

export interface InfoMenu {
	parentMenu:string;
	childMenu:string;
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false
    permisos:any[] = [];
	MENUITEMS:Menu[] = [];
	prueba:boolean = false;
    items:any;

	constructor(private http:HttpClient) {

		this.http.get('http://localhost/ApoautisApis/v1/permiso_mostrar').subscribe((resp:any)=>{
			console.log(resp)
			this.permisos = resp;
			console.log(this.permisos[0]?.Permiso_consultar);

			let MENUITEMS:Menu[] = [
				{
					title: 'Mantenimientos', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
						[
						
							this.permisos[0]?.Permiso_consultar == 1 ?
							   {  path: 'administracion/nivel_academico', title: 'Nivel Academico', type: 'link',id:6 }
						  : {},
							{ path: 'administracion/nacionalidad', title: 'Nacionalidad', type: 'link' },
							{ path: 'administracion/sedes', title: 'Sedes', type: 'link' },
							{ path: 'administracion/parentesco', title: 'Parentesco', type: 'link' },
							{ path: 'administracion/genero', title: 'Genero', type: 'link' },
							{ path: 'administracion/tipo_persona', title: 'Tipo Persona', type: 'link' },
							{ path: 'administracion/tipo_evaluacion', title: 'Tipo Evaluacion', type: 'link' },
							{ path: 'administracion/tipo_inclusion', title: 'Tipo Inclusion', type: 'link' },
							{ path: 'administracion/tipo_especialidad', title: 'Tipo Especialidad', type: 'link' },
							{ path: 'administracion/modalidad_atencion', title: 'Modalidad Atencion', type: 'link' },
							{ path: 'administracion/modalidad_servicio', title: 'Modalidad Servicio', type: 'link' },
							{ path: 'administracion/servicio_social', title: 'Servicio Social', type: 'link' }
						]
				},
				{
					title: 'modulo Seguridad', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
						[
							{ path: 'mantenimientos/usuarios', title: 'Usuarios', type: 'link' },
							{ path: 'modulo_seguridad/preguntas', title: 'Preguntas', type: 'link' },
							{ path: 'modulo_seguridad/objetos', title: 'Objetos', type: 'link' },
							{ path: 'modulo_seguridad/roles', title: 'Roles', type: 'link' },
							{ path: 'modulo_seguridad/permisos', title: 'Permisos', type: 'link' },
							{ path: 'modulo_seguridad/parametros', title: 'Parametros', type: 'link' },
							{ path: 'modulo_seguridad/estados', title: 'Estados', type: 'link' },
							{ path: 'modulo_seguridad/bitacora', title: 'Bitacora', type: 'link' }
						]
				},
				{
					title: 'Personas', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
						[
							{ path: 'beneficiarios/beneficiario', title: 'Personas', type: 'link' }
						]
				},
				{
					title: 'Colaboradores', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
						[
							{ path: 'colaboradores/depto-laboral', title: 'Departamento Laboral', type: 'link' },
							{ path: 'colaboradores/colaborador', title: 'Colaborador', type: 'link' }
						]
				},
				{
					title: 'Area Psicologica', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
						[
							{ path: "area-psicologica/solicitud-evaluacion", title: "Solicitud Evaluacion", type: 'link' },
							{ path: "area-psicologica/diagnostico-evaluacion", title: "Diagnostico Evaluacion", type: 'link' }
						]
				},
				{
					title: 'Area Academica', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
						[
							{ path: "area-academica/matricula", title: "Matricula", type: 'link' },
							 { path: "area-academica/informe-academico", title: "Informe Academico", type: 'link' },
							{ path: "area-academica/registro-servicio-social", title: "Registro Servicio Social", type: 'link' }
						]
				}
			]

			this.items = MENUITEMS;
		})

		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}

		
	}


async menus(){
	await this.http.get('http://localhost/ApoautisApis/v1/permiso_mostrar').subscribe((resp:any)=>{
			console.log(resp)
			console.log('inicio')
			this.permisos = resp;
			console.log(this.permisos[0].Permiso_consultar);
			setTimeout(() => {
				let MENUITEMS = [
					{
						title: 'Mantenimientos', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
							
								this.permisos[0].Permiso_consultar == 1 ?
								   {  path: 'administracion/nivel_academico', title: 'Nivel Academico', type: 'link',id:6 }
							  : {},
								{ path: 'administracion/nacionalidad', title: 'Nacionalidad', type: 'link' },
								{ path: 'administracion/sedes', title: 'Sedes', type: 'link' },
								{ path: 'administracion/parentesco', title: 'Parentesco', type: 'link' },
								{ path: 'administracion/genero', title: 'Genero', type: 'link' },
								{ path: 'administracion/tipo_persona', title: 'Tipo Persona', type: 'link' },
								{ path: 'administracion/tipo_evaluacion', title: 'Tipo Evaluacion', type: 'link' },
								{ path: 'administracion/tipo_inclusion', title: 'Tipo Inclusion', type: 'link' },
								{ path: 'administracion/tipo_especialidad', title: 'Tipo Especialidad', type: 'link' },
								{ path: 'administracion/modalidad_atencion', title: 'Modalidad Atencion', type: 'link' },
								{ path: 'administracion/modalidad_servicio', title: 'Modalidad Servicio', type: 'link' },
								{ path: 'administracion/servicio_social', title: 'Servicio Social', type: 'link' }
							]
					},
					{
						title: 'modulo Seguridad', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
								{ path: 'mantenimientos/usuarios', title: 'Usuarios', type: 'link' },
								{ path: 'modulo_seguridad/preguntas', title: 'Preguntas', type: 'link' },
								{ path: 'modulo_seguridad/objetos', title: 'Objetos', type: 'link' },
								{ path: 'modulo_seguridad/roles', title: 'Roles', type: 'link' },
								{ path: 'modulo_seguridad/permisos', title: 'Permisos', type: 'link' },
								{ path: 'modulo_seguridad/parametros', title: 'Parametros', type: 'link' },
								{ path: 'modulo_seguridad/estados', title: 'Estados', type: 'link' },
								{ path: 'modulo_seguridad/bitacora', title: 'Bitacora', type: 'link' }
							]
					},
					{
						title: 'Personas', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
								{ path: 'beneficiarios/beneficiario', title: 'Personas', type: 'link' }
							]
					},
					{
						title: 'Colaboradores', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
								{ path: 'colaboradores/depto-laboral', title: 'Departamento Laboral', type: 'link' },
								{ path: 'colaboradores/colaborador', title: 'Colaborador', type: 'link' }
							]
					},
					{
						title: 'Area Psicologica', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
								{ path: "area-psicologica/solicitud-evaluacion", title: "Solicitud Evaluacion", type: 'link' },
								{ path: "area-psicologica/diagnostico-evaluacion", title: "Diagnostico Evaluacion", type: 'link' }
							]
					},
					{
						title: 'Area Academica', icon: 'book', type: 'sub', badgeType: 'primary', active: false, children:
							[
								{ path: "area-academica/matricula", title: "Matricula", type: 'link' },
								 { path: "area-academica/informe-academico", title: "Informe Academico", type: 'link' },
								{ path: "area-academica/registro-servicio-social", title: "Registro Servicio Social", type: 'link' }
							]
					}
				]
				return MENUITEMS;
			   }, 3000);
		

			
		})
		
	}

	menuspermiso(id:any){
		return this.http.post(`http://localhost/ApoautisApis/v1/permisos_data`, JSON.stringify(id));
	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	



}
