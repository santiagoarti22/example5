import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catalogo-canciones';
  
  cancion = {
    id: 0,
    nombre: '',
    artista: '',
    duracion: ''
  };

  cancionSeleccionadaId: number | null = null;

  listaCanciones = [
    { id: 1, nombre: 'Bohemian Rhapsody', artista: 'Queen', duracion: '5:55' },
    { id: 2, nombre: 'Billie Jean', artista: 'Michael Jackson', duracion: '4:54' },
    { id: 3, nombre: 'Sweet Child O Mine', artista: 'Guns N Roses', duracion: '5:56' },
  ];

  agregarCancion() {
    if (this.cancion.id === 0) {
      alert('El ID de la canción no puede ser 0');
      return;
    }

    const existeCancion = this.listaCanciones.some(c => c.id === this.cancion.id);
    if (existeCancion) {
      alert('Ya existe una canción con ese ID');
      return;
    }

    this.listaCanciones.push({
      id: this.cancion.id,
      nombre: this.cancion.nombre,
      artista: this.cancion.artista,
      duracion: this.cancion.duracion
    });

    this.limpiarFormulario();
  }

  seleccionarCancion(cancionSeleccionada: {id: number; nombre: string; artista: string; duracion: string}) {
    this.cancion.id = cancionSeleccionada.id;
    this.cancion.nombre = cancionSeleccionada.nombre;
    this.cancion.artista = cancionSeleccionada.artista;
    this.cancion.duracion = cancionSeleccionada.duracion;
  }

  escucharCancion(id: number) {
    this.cancionSeleccionadaId = id;
  }

  modificarCancion() {
    for(let i=0; i < this.listaCanciones.length; i++) {
      if(this.cancion.id == this.listaCanciones[i].id) {
        this.listaCanciones[i].nombre = this.cancion.nombre;
        this.listaCanciones[i].artista = this.cancion.artista;
        this.listaCanciones[i].duracion = this.cancion.duracion;
        this.limpiarFormulario();
        return;
      }
    }
    alert('No existe ese ID');
  }

  eliminarCancion(id: number) {
    for(let i=0; i < this.listaCanciones.length; i++) {
      if(this.listaCanciones[i].id == id) {
        this.listaCanciones.splice(i,1);
        if (this.cancionSeleccionadaId === id) {
          this.cancionSeleccionadaId = null;
        }
        return;
      }
    }
    alert('No existe ese ID');
  }

  private limpiarFormulario() {
    this.cancion = {
      id: 0,
      nombre: '',
      artista: '',
      duracion: ''
    };
  }
}