package com.proyecto.clinica.controllers;

import com.proyecto.clinica.models.Usuario;
import com.proyecto.clinica.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")


public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;


    /*
     * GET endpoint to fetch all users from the database.
     * @return List of all users.
     */
    @GetMapping("/usuarios")// Maps the HTTP GET request for "/usuarios"
    public List<Usuario> getUsuarios() {
      return usuarioRepository.findAll();

    }
    /**
     * GET endpoint to fetch a user by their ID.
     * @param id User ID.
     * @return ResponseEntity containing the user data or a 404 error if not found.
     */

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        // Si no lo encuentra
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }



    /**
     * POST endpoint to add a new user.
     * @param usuario User object from the request body.
     * @return ResponseEntity containing the created user or an error response.
     */
    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> addUsuario(@RequestBody Usuario usuario) {
        try {
            System.out.println("Recibido: " + usuario); // DEBUG

            if (usuario.getNombre() == null || usuario.getEmail() == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Usuario nuevoUsuario = usuarioRepository.save(usuario);
            return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            System.out.println("Error de integridad: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            System.out.println("Error general: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * PUT endpoint to update an existing user's information.
     * @param id User ID.
     * @param usuario User object with updated data.
     * @return ResponseEntity with updated user or 404 if not found.
     */

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable("id") Long id, @RequestBody Usuario usuario) {
        return usuarioRepository.findById(id).map(usuarioUpdate -> {
            // Actualizamos los datos
            usuarioUpdate.setNombre(usuario.getNombre());
            usuarioUpdate.setApellidos(usuario.getApellidos());
            usuarioUpdate.setEmail(usuario.getEmail());
            usuarioUpdate.setRol(usuario.getRol());

            // Guardamos el usuario actualizado
            Usuario usuarioActualizado = usuarioRepository.save(usuarioUpdate);
            return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    /**
     * DELETE endpoint to delete a user by ID.
     * @param id User ID.
     */
    @DeleteMapping("/usuarios/{id}")
    public void deleteUsuario(@PathVariable("id")Long id) {
       usuarioRepository.deleteById(id);

    }

}
