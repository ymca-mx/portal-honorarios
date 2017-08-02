import { Component, Injectable, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
@Component({
    selector: 'file-app',
    templateUrl: './file.component.html'
})

export class FileComponent  {
    @Input() visible: boolean = false;
    @Input() documento: string = "Archivo...";
    @Output() Documento = new EventEmitter();

    constructor(private http: Http) {

    }

    onUpload(fileInput: any) {
        let file = fileInput.target.files[0];
        if (file != undefined) {
            let fileName = file.name;
            this.recortar(fileName);
            this.visible = true;
        } else {
            this.documento = "Archivo...";
            this.visible = false;
        }
        this.Documento.emit({ event: fileInput });
    }

    deleteFile() {
        this.documento = "Archivo...";
        this.visible = false;
        this.Documento.emit({ event: "" });
    }

    recortar(fileName: string) {
        let cadena;
        if (fileName.length > 10) {
            cadena = fileName.substring(0, 9);
            cadena += fileName.substring(fileName.length - 4, fileName.length);
            this.documento = cadena;
        } else {
            this.documento = fileName;
        }
    }
}