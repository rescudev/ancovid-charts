import { Component } from '@angular/core';

interface Provincia {
  nombre: string;
  sigla: string;
  pos: number;
}

@Component({
  selector: 'app-select-provincias',
  templateUrl: './select-provincias.component.html',
  styleUrls: ['./select-provincias.component.css']
})

export class SelectProvinciasComponent {
  selectedValue: string;

  provincias: Provincia[] = [
    {nombre: 'Almería',sigla: 'AL', pos: 0},
    {nombre: 'Cádiz',sigla: 'CA', pos: 1},
    {nombre: 'Córdoba',sigla: 'CO', pos: 2},
    {nombre: 'Granada',sigla: 'GR', pos: 3},
    {nombre: 'Huelva',sigla: 'HU', pos: 4},
    {nombre: 'Jaén',sigla: 'JA', pos: 5},
    {nombre: 'Málaga',sigla: 'MA', pos: 6},
    {nombre: 'Sevilla',sigla: 'SE', pos: 7},
  ];

  initialValue= this.provincias[0].nombre;

  changeProvincia(prov) {
    console.log(prov);
  }
}


