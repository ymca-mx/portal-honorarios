
import { Component, Injectable, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { BlockUI, NgBlockUI } from 'ng-block-ui';



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
    @BlockUI() blockUI: NgBlockUI;
    headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    options = new RequestOptions({ headers: this.headers });
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
    slcNacionalidad: string;
    slcLugarNacimineto: string;
    sclEstado: string = '9';
    //formulario//
    v: Valida = { validarCoor: false, validarEst: false, validarInv: false, validarPub: false, validarTodo: false };
    es: any;
    tab1form: FormGroup;
    tab2form: FormGroup;
    tab3form: FormGroup;
    description: string;
    public docenteId: string = "1";
    public estatusId: string = "2";
    ///estudios docente//
    displayDialog: boolean;
    public Estudios: Estudio[] = [];
    public doc: Documento[] = [{ visible: false, nombre: '', nombredb: '', file: '' }, { visible: false, nombredb: '', nombre: '', file: '' }];
    crudestudio: number;

    constructor(private http: Http, private fb: FormBuilder, private confirmationService: ConfirmationService) { }

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
            'docenteid': new FormControl(''),
            'estatusid': new FormControl(''),
            xcoordinador: this.fb.group({
                'nombre': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
                'paterno': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
                'materno': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
                'celular': new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
                'telcasa': new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])),
                'teloficina': new FormControl('', Validators.compose([Validators.minLength(8), Validators.maxLength(10)])),
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
                'estudioid': new FormControl(''),
                'institucion': new FormControl('', Validators.required),
                'grado': new FormControl('', Validators.required),
                'carrera': new FormControl('', Validators.required),
                'cedula': new FormControl(''),
                'titulo': new FormControl(''),
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

    CargarCatalogos() {
        this.blockUI.start('Cargando...');
        //nacionalidad//
        this.nacional = [];
        this.nacional.push({ label: '--Seleccionar--', value: '' });
        this.nacional.push({ label: 'Mexicana ', value: '1' });
        this.nacional.push({ label: 'Extranjera ', value: '2' });

        this.http.get('/api/Catalogos/AltaDocenteCatalogo').subscribe(result => {
            this.catalogos = result.json();
            //Lugar Nacimiento
            this.nacimientoLugar = [{ label: '--Seleccionar--', value: '' }];
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
            this.blockUI.stop();
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
                //if (this.tab1form.controls['xcoordinador'].valid) {
                //     this.v.validarCoor = false; 
                //    this.guardaDocente();
                // } else {
                //    this.v.validarCoor  = true;
                //   return false;
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

    guardaDocente() {
        this.confirmationService.confirm({
            message: "Guardar Cambios",
            header: "¿Está seguro que desea guardar cambios?",
            icon: 'fa fa-question-circle',
            accept: () => {
                this.blockUI.start('Guardando...');
                this.tab1form.get('docenteid').setValue(this.docenteId);
                this.tab1form.get('estatusid').setValue(this.estatusId);

                let body = JSON.stringify(this.tab1form.value);
                this.http.post('/api/AltaDocente/AltaDocente', body, this.options).subscribe(result => {
                    let docente = result.json();
                    this.docenteId = docente.docenteid;
                    this.estatusId = docente.estatusid;
                    this.blockUI.stop();
                });
            },
            reject: () => {
                return false;
            }
        });

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

    crudEstudio(crud) {
        let estudios: Estudio;
        this.Estudios = null;
        estudios = {
            docenteid: this.docenteId,
            estudioid: this.tab2form.get('estudios').get("estudioid").value,
            institucion: this.tab2form.get('estudios').get("institucion").value,
            gradoid: this.tab2form.get('estudios').get("grado").value,
            grado: "",
            carrera: this.tab2form.get('estudios').get("carrera").value,
            cedula: this.tab2form.get('estudios').get("cedula").value == "true" ? "true" : "",
            cedulanombre: this.doc[0].nombredb,
            cedulaurl: "",
            titulo: this.tab2form.get('estudios').get("titulo").value == "true" ? "true" : "",
            titulonombre: this.doc[1].nombredb,
            titulourl: "",
            crud: crud
        };
        let body = JSON.stringify(estudios);
        if (crud != 3) { 
            if (this.tab2form.get('estudios').valid) {
                this.blockUI.start('Guardando...');
            this.v.validarEst = false;
            this.http.post('/api/AltaDocente/Estudio', body, this.options).subscribe(result => {
                this.Estudios = result.json();
                this.saveFile(this.doc);
                this.displayDialog = false;
            });

        } else { this.v.validarEst = true; }

        } else if (crud == 3) {
            this.blockUI.start('Guardando...');
                this.v.validarEst = false;
                this.http.post('/api/AltaDocente/Estudio', body, this.options).subscribe(result => {
                    this.Estudios = result.json();
                    this.displayDialog = false;
                    this.blockUI.stop();
                });
            }
        

    }

    openFile(url: any) {

        window.open(url, "_blank");
    }

    editarEstudio(estudio: Estudio) {
        //limpiar formulario estudios//
        this.tab2form.get('estudios').reset();
        this.doc[0].visible = false;
        this.doc[1].visible = false;
        //--------------------------//
        let grado = this.ofertasTipo.filter(a => {
            return a.label == estudio.grado
        });
        this.tab2form.get('estudios').get("estudioid").setValue(estudio.estudioid);
        this.tab2form.get('estudios').get("institucion").setValue(estudio.institucion);
        this.tab2form.get('estudios').get("grado").setValue(grado[0].value);
        this.tab2form.get('estudios').get("carrera").setValue(estudio.carrera);
        this.tab2form.get('estudios').get("cedula").setValue(estudio.cedula == 'true' ? 'Si' : '');
        this.tab2form.get('estudios').get("titulo").setValue(estudio.titulo == 'true' ? 'Si' : '');
        if (estudio.cedulanombre != null) {
            this.doc[0] = { nombre: estudio.cedulanombre, nombredb: '', visible: true, file: '' };
        }
        if (estudio.titulonombre != null) {
            this.doc[1] = { nombre: estudio.titulonombre, nombredb: '', visible: true, file: '' };
        }
        this.crudestudio = 2;
        this.displayDialog = true;
    }

    //valida correo electronico//
    emailValidator(control) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    //cargar archivo//
    onUpload(fileInput: any, componente: string, n: number) {
        let file = fileInput.event != "" ? fileInput.event.target.files[0] : undefined;
        if (file != undefined) {
            let nombredb = componente + "G" + this.tab2form.get('estudios').get("grado").value + "D" + this.docenteId;
            this.doc[n] = { nombre: file.name, nombredb: nombredb, visible: true, file: file };
        } else {
            this.doc[n] = { nombre: '', nombredb: '', visible: false, file: '' };
        }
    }

    saveFile(doc: any) {
        let input = new FormData();
        for (var i = 0; i < doc.length; i++) {
            input.append("Files", doc[i].file, doc[i].nombredb);
        }

        return this.http.post("/api/AltaDocente/GuardarAchivo", input).subscribe(res => {
            console.log(res);
            this.blockUI.stop();
        });;

    }
}


export interface Estudio {
    docenteid;
    estudioid;
    institucion;
    gradoid;
    grado;
    carrera;
    cedula;
    cedulanombre?;
    cedulaurl;
    titulo;
    titulonombre?;
    titulourl;
    crud;
}
export interface Catalogo {
    value;
    label;
};
export interface Documento {
    visible: boolean;
    nombre: string;
    nombredb: String;
    file;
};
export interface Valida {
    validarCoor: boolean;
    validarEst: boolean;
    validarPub: boolean;
    validarInv: boolean;
    validarTodo: boolean;
}
