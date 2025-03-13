package com.proyecto.clinica.repository;

import com.proyecto.clinica.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    List<Usuario> findByNombre(@Param("nombre")String nombre);
    boolean existsByEmail(String email);

}
