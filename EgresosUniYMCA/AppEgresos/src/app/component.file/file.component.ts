import { Component, Injectable, OnInit, Input,Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'file-app',
    templateUrl: './file.component.html'
})

export class FileComponent  {
    @Input() visible: boolean = false;
    @Input() documento: string;
    @Output() Documento = new EventEmitter();

    onUpload(fileInput: any) {
        let file = fileInput.target.files[0];
        if (file != undefined) {
            let fileName = file.name;

            let cadena;
            if (fileName.length > 15) {
                cadena = fileName.substring(0, 13);
                cadena += fileName.substring(fileName.length - 4, fileName.length);
                this.documento = cadena;
            } else {
                this.documento = fileName;
            }
            this.visible = true;
        } else {
            this.documento = "";
            this.visible = false;
        }
        this.Documento.emit({ nombre: this.documento });
    }

    deleteFile() {
        this.documento = "";
        this.visible = false;
        this.Documento.emit({ nombre: this.documento });
    }

}