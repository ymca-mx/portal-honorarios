
import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';

import {
    MenuModule,
    MenuItem,
    Message,
    ButtonModule,
    SelectItem
} from 'primeng/primeng';

@Component({
    selector: 'altadocente-app',
    templateUrl: './AltaDocente.component.html',
    // styleUrls: ['../app/css/custom.css', '../app/css/layout.css', '../app/css/themes/default.css'],
    styles: [`
        .ui-steps .ui-steps-item {
            width: 25%;
        }
        
        .ui-steps.steps-custom {
            margin-bottom: 30px;
        }
         
        .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
            height: 10px;
            padding: 0 1em;
        }
         
        .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
            background-color: #0081c2;
            color: #FFFFFF;
            display: inline-block;
            width: 36px;
            border-radius: 50%;
            margin-top: -14px;
            margin-bottom: 10px;
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
            color: #555555;
        }
         .ui-widget-content {
         border: 0px solid !important;
        }
.container-fluid
{
text-align: left;
}
.buttoncenter
{
text-align: center;
}

    `],
    encapsulation: ViewEncapsulation.None,
    providers: [ConfirmationService]
})

export class AltaDocenteComponent implements OnInit {
    //tab/
    private items: MenuItem[];
    activeIndex: number = 0;
    tab1: boolean = true;
    tab2: boolean = false;
    tab3: boolean = false;

    //catalogos//
    public catalogos;
    public nacimientoLugar;
    public genero;
    public estadoCivil;
    public estado;
    public municipio;
    public ofertasTipo: Catalogo[];
    nacional: SelectItem[];
    //valores inicales catalogos//
    slcNacionalidad: string = '1';
    slcLugarNacimineto: string = '9';
    sclEstado: string = '9';
    sclEstadoF: string = '9';
    //formulario//
    validarCoor: boolean = false;
    validarRH: boolean = false;
    checked: boolean = false;
    es: any;
    msgs: Message[] = [];
    tab1form: FormGroup;
    tab2form: FormGroup;
    tab3form: FormGroup;
    description: string;
    docenteId: string;
    d: string;
    ///estudios docente//
    displayDialog: boolean;
    public Estudios: GradoAcademico[] = [];
    public doc: Documento[] = [{ visible: false, nombre: '', directorio: '' }, { visible: false, nombre: '', directorio: '' }];
    crudestudio: number;

    constructor(private http: Http, private fb: FormBuilder, private confirmationService: ConfirmationService) {

    }

    ngOnInit() {

        //Wizard//
        this.items = [
            {
                label: 'Personales',
                command: (event: any) => {
                    this.activeIndex = 0;
                }
            },
            {
                label: 'Formacion Profesional',
                command: (event: any) => {
                    this.activeIndex = 1;
                }
            },
            {
                label: 'Datos Adicionales',
                command: (event: any) => {
                    this.activeIndex = 2;
                }
            },
            {
                label: 'Fin',
                command: (event: any) => {
                    this.activeIndex = 3;
                }
            }
        ];

        //formato calendario//
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
        }
        //formulario//
        this.tab1form = this.fb.group({
            xcoordinador: this.fb.group({
                'nombre': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
                'paterno': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
                'materno': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
                'celular': new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
                'telcasa': new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])),
                'teloficina': new FormControl('', Validators.compose([Validators.minLength(8),Validators.maxLength(10)])),
                'email': new FormControl('', this.emailValidator)
            }),
            'nacimiento': new FormControl('', Validators.required),
            'nacionalidad': new FormControl('', Validators.required),
            'lugarnacimiento': new FormControl('', Validators.required),
            'curp': new FormControl('', Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18)])),
            'nomigracion': new FormControl('', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])),
            'genero': new FormControl('', Validators.required),
            'estadocivil': new FormControl('', Validators.required),
            'emailuni': new FormControl('', this.emailValidator)
        });

        this.tab2form = this.fb.group({
            estudios: this.fb.group({
                'institucion': new FormControl('', Validators.required),
                'grado': new FormControl('', Validators.required),
                'carrera': new FormControl('', Validators.required),
                'cedula': new FormControl(''),
                'ceduladoc': new FormControl(''),
                'titulo': new FormControl(''),
                'titulodoc': new FormControl(''),
            }),
            'expprofesional': new FormControl('', Validators.required),
            'expdocente': new FormControl('', Validators.required),
            'tipopublicacion': new FormControl('', Validators.required)
        });

        this.tab3form = this.fb.group({
            'calle': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
            'exterior': new FormControl('', Validators.required),
            'interior': new FormControl(''),
            'cp': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])),
            'colonia': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
            'estado': new FormControl('', Validators.required),
            'municipio': new FormControl('', Validators.required),
            'rfc': new FormControl('', Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(13)])),
            'razon': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
            'nocuenta': new FormControl('', Validators.required),
            'clabe': new FormControl('', Validators.required)
        });

        this.CargarCatalogos();
    }
    

    CargarCatalogos() {

        //nacionalidad//
        this.nacional = [];
        this.nacional.push({ label: '--Seleccionar--', value: '' });
        this.nacional.push({ label: 'Mexicana ', value: '1' });
        this.nacional.push({ label: 'Extranjera ', value: '2' });

        this.http.get('/api/Catalogos/AltaDocenteCatalogo').subscribe(result => {
            this.catalogos = result.json();
            //Lugar Nacimiento
            this.nacimientoLugar = this.catalogos.entidades;
            //Genero//
            this.genero = this.catalogos.generos;
            //Estado Civil
            this.estadoCivil = this.catalogos.estadosCiviles;
            //Estado//
            this.estado = this.catalogos.entidades;
            this.ChangeEstado();
            //Municipio  Delegacion//
            this.municipio = this.catalogos.entidades;
            //ofetas tipo//
            this.ofertasTipo = this.catalogos.ofertasTipo;
        });


    }

    ChangeNacionalidad() {
        if (this.slcNacionalidad == "1") {
            this.nacimientoLugar = this.catalogos.entidades;
        } else if (this.slcNacionalidad == "2") {
            this.nacimientoLugar = this.catalogos.paises;
        } else {
            this.nacimientoLugar = [{ label: '--Seleccionar--', value: '' }];
        }
    }

    ChangeEstado() {

        if (this.sclEstado != "") {
            this.http.get('/api/catalogos/Municipio/' + this.sclEstado).subscribe(result => {
                this.municipio = result.json();

            });
        } else {
            this.municipio = [{ label: '--Seleccionar--', value: '' }];
        }

    }

    Continuar() {

        if (this.activeIndex < 3) {
            if (this.activeIndex == 0) {
                //if (this.tab1form.controls['xcoordinador'].valid ) {
                //    this.validarCoor = false; 
                //    this.guardaDocente();
                //} else {
                //    this.validarCoor = true;
                //    return false;
                //}
            } else if (this.activeIndex == 1) {
                //if (!this.tab2form.valid) {
                //    this.validar = true;
                //    return false;
                //}else{}
            }

            
            this.activeIndex = this.activeIndex + 1;
            this.activarTabs();
        }// if (this.activeIndex < 4)
    }

    Regresar() {
        if (this.activeIndex > 0) {
            this.activeIndex = this.activeIndex - 1;
            this.activarTabs();
        }

    }

    guardaDocente()
    {
        if (this.confirmacion("Guardar Cambios", "¿Está seguro que desea guardar cambios?")) {
            //build header options
            let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
            let options = new RequestOptions({ headers: headers });
            //build POST body
            let body = JSON.stringify(this.tab1form.value);
            this.http.post('/api/AltaDocente/AltaDocente', body, options).subscribe(result => {
                this.docenteId = result.json();
            });
        } else { return false; }
         
       
    }

    addEstudio() {
        //limpiar formulario estudios//
        this.tab2form.get('estudios').reset();
        this.doc[0].visible = false;
        this.doc[1].visible = false;
        //--------------------------//
        this.crudestudio = 1;
        this.displayDialog = true;
    }

    crudEstudio() {
        let estudios = [...this.Estudios];
        if (this.crudestudio == 1) {
            let grado = this.ofertasTipo.filter(a => {
                return a.value == this.tab2form.get('estudios').get("grado").value
            });

            let estudioId = estudios.length + 1;
            estudios.push({
                estudioId: estudioId,
                institucion: this.tab2form.get('estudios').get("institucion").value,
                grado: grado.length > 0 ? grado[0].label : "",
                carrera: this.tab2form.get('estudios').get("carrera").value,
                cedula: this.tab2form.get('estudios').get("cedula").value == 'Si' ? 'Si' : 'NO',
                ceduladoc: this.tab2form.get('estudios').get("ceduladoc").value,
                titulo: this.tab2form.get('estudios').get("titulo").value == 'Si' ? 'Si' : 'NO',
                titulodoc: this.tab2form.get('estudios').get("titulodoc").value
            });

            this.Estudios = estudios;
            this.displayDialog = false;
        } else if (this.crudestudio == 2) {

        } else if (this.crudestudio == 3) {

        }

    }

    editarEstudio(estudio: GradoAcademico) {
        //limpiar formulario estudios//
        this.tab2form.get('estudios').reset();
        this.doc[0].visible = false;
        this.doc[1].visible = false;
        //--------------------------//
        let grado = this.ofertasTipo.filter(a => {
            return a.label == estudio.grado
        });
        this.tab2form.get('estudios').get("institucion").setValue(estudio.institucion);
        this.tab2form.get('estudios').get("grado").setValue(grado[0].value);
        this.tab2form.get('estudios').get("carrera").setValue(estudio.carrera);
        this.tab2form.get('estudios').get("cedula").setValue(estudio.cedula == 'Si' ? 'Si' : '');
        this.tab2form.get('estudios').get("ceduladoc").setValue(estudio.ceduladoc);
        this.tab2form.get('estudios').get("titulo").setValue(estudio.titulo == 'Si' ? 'Si' : '');
        this.tab2form.get('estudios').get("titulodoc").setValue(estudio.titulodoc);
        if (estudio.ceduladoc != null) {
            this.doc[0] = { nombre: estudio.ceduladoc, visible: true, directorio: '' };
        }
        if (estudio.titulodoc != null) {
            this.doc[1] = { nombre: estudio.titulodoc, visible: true, directorio: '' };
        }
        this.crudestudio = 2;
        this.displayDialog = true;
    }

    activarTabs() {
        if (this.activeIndex == 0) {
            this.tab1 = true;
            this.tab2 = false;
            this.tab3 = false;
        } else if (this.activeIndex == 1) {
            this.tab1 = false;
            this.tab2 = true;
            this.tab3 = false;
        }
        else if (this.activeIndex == 2) {
            this.tab1 = false;
            this.tab2 = false;
            this.tab3 = true;
        }
    }

    //valida correo electronico//
    emailValidator(control) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    confirmacion(header, message) {
        this.confirmationService.confirm({
            message: message,
            header: header,
            icon: 'fa fa-question-circle',
            accept: () => {
                return true;
            },
            reject: () => {
                return false;
            }
        });
    }

    //cargar archivo//
    onUpload(file: any, formulario: string, componente: string, n: number) {
        if (file != undefined) {
            this.tab2form.get(formulario).get(componente).setValue(file.nombre);
            this.doc[n] = { nombre: file.nombre, visible: true, directorio: '' };
        } else {
            this.tab2form.get(formulario).get(componente).setValue("");
            this.doc[n] = { nombre: file.nombre, visible: false, directorio: '' };
        }
    }

    
}


export interface GradoAcademico {
    estudioId;
    institucion;
    grado;
    carrera;
    cedula;
    ceduladoc?;
    titulo;
    titulodoc?;
}
export interface Catalogo {
    value;
    label;
};
export interface Documento {
    visible;
    nombre;
    directorio;
};

