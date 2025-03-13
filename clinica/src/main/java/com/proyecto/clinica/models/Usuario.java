package com.proyecto.clinica.models;


import jakarta.persistence.*;

/**
 * Class: Usuario
 * Description: This class represents a user in the system, containing personal data like name, email, and role.
 * Version: 1.0.0
 * Created Date: 2025-03-07
 * Last Modified: 2025-03-07
 * Author: [Estefania]
 */

// Entity annotation marks this class as a JPA entity
@Entity
@Table(name = "usuarios") // Specifies the table name in the database
public class Usuario {

    // The @Id annotation marks this field as the primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellidos;

    @Column(unique = true)
    private String email;
    private String rol;


    // Default constructor
    public Usuario() {
    }

    // Constructor to initialize the fields
    public Usuario(String nombre, String apellidos, String email, String rol) {

        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.rol = rol;
    }

    // Getter and setter methods for each field
    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public String getEmail() {
        return email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getRol() {
        return rol;
    }


    // Override the toString method to return a string representation of the Usuario object
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellidos='" + apellidos + '\'' +
                ", email='" + email + '\'' +
                ", rol='" + rol + '\'' +
                '}';
    }
}
