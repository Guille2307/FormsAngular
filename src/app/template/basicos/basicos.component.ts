import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Producto {
  producto?: string;
  precio?: number;
  existencias?: number;
  imagen?: string;
}

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css'],
})
export class BasicosComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm;

  productos: Producto[] = [];

  constructor() {}

  ngOnInit(): void {}
  ngDoCheck() {
    let data = localStorage.getItem('productos');
    this.productos = data !== null ? JSON.parse(data) : [];
  }

  guardar() {
    if (this.miFormulario) {
      this.productos.push(this.miFormulario.value);
      localStorage.setItem('productos', JSON.stringify(this.productos));
    }
    this.miFormulario.resetForm({
      precio: 0,
      existencias: 0,
    });
  }
  nombreValido(): boolean {
    return (
      this.miFormulario?.controls['producto']?.invalid &&
      this.miFormulario?.controls['producto']?.touched
    );
  }
  precioValido(): boolean {
    return (
      this.miFormulario?.controls['precio']?.touched &&
      this.miFormulario?.controls['precio']?.value < 0
    );
  }
  existenciasValida() {
    return (
      this.miFormulario?.controls['precio']?.touched &&
      this.miFormulario?.controls['precio']?.value < 0
    );
  }
}
