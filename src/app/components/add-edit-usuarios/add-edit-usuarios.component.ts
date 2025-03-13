import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuarios';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-usuarios',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-edit-usuarios.component.html',
  styleUrls: ['./add-edit-usuarios.component.css']
})
export class AddEditUsuariosComponent implements OnInit {
  isEditing: boolean = false;  // Variable para determinar si estamos en edición
  userId: number | null = null;
  mensajeExito: string = '';  // Mensaje de éxito

  usuario: Usuario = { 
    id: undefined,
    nombre: '',
    apellidos: '',
    email: '',
    rol: ''
  };

  constructor(private usuarioService: UsuarioService,private router: Router,
    private route: ActivatedRoute) {}
    volver() {
      this.router.navigate(['/list']); // Navega al listado de usuarios
    }


  ngOnInit(): void {
   const idParam = this.route.snapshot.paramMap.get('id');
   console.log('ID desde URL:', idParam);
    if (idParam) {
      
      this.isEditing = true;// si existe un id estamos editando
      this.userId = Number(idParam);
      this.cargarUsuario(this.userId );
    }else{
      console.log('Nose encontro parametro id')
    }
}

  cargarUsuario(id: number): void {
    console.log('cargando usuario id:', id)
     // Llamar al servicio para obtener el usuario por su id
     this.usuarioService.getUsuarioById(id).subscribe(
      (usuario: Usuario) => {
        console.log('Usuario cargado:', usuario);  // Asegúrate de que los datos del usuario se imprimen aquí
        this.usuario = usuario;
      },
      (error) => {
        console.error('Error al cargar el usuario:', error);
      }
    );
  }

  guardarUsuario(): void {
    if (this.isEditing && this.usuario.id !== undefined && this.usuario.id !== 0) {
      // Si estamos editando, usamos el id para actualizar
      this.usuarioService.updateUsuario(this.usuario.id, this.usuario).subscribe(
        () => {
          this.mensajeExito = '¡Usuario actualizado correctamente!';
          this.limpiarFormulario();
          setTimeout(() => {
            this.mensajeExito = '';
          this.router.navigate(['/']);
        }, 3000); //redirigir despues de 3 segundos.
      },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    } else {
      // Si estamos agregando un usuario (id = 0 o undefined)
      this.usuarioService.addUsuario(this.usuario).subscribe(
        () => {
          this.mensajeExito = '¡Usuario registrado correctamente!';
          this.limpiarFormulario();
          setTimeout(() => {
            this.mensajeExito = '';
          this.router.navigate(['/']);
        }, 3000);
        },
        (error) => {
          console.error('Error al agregar el usuario:', error);
        }
      );
    }
  }
  limpiarFormulario(): void {
    this.usuario = {
      id: undefined,
      nombre: '',
      apellidos: '',
      email: '',
      rol: ''
    };
  }
  
}


 