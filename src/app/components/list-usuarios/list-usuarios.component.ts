import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuarios';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuarios.service';

@Component({
  selector: 'app-list-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor, RouterLink],
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css'] 
})
export class ListUsuariosComponent implements OnInit {
  listUsuarios: Usuario[] = []; // array para almacenar los usuarios
  
  constructor(private usuarioService: UsuarioService) {}

  
  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe
    ((data)=>{this.listUsuarios=data});
    console.log("usuarios cargados:",this.listUsuarios);

  }

  deleteUsuario(id: number | undefined): void {
    if (id === undefined) {
      console.error("ID es undefined, no se puede eliminar el usuario.");
      return;
    }
  
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => {
          this.listUsuarios = this.listUsuarios.filter(usuario => usuario.id !== id);
          console.log(`Usuario con ID ${id} eliminado correctamente`);
        },
        error: (error) => {
          console.error('Error al eliminar el usuario:', error);
        }
      });
    }
  }
  
}