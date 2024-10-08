package com.notes.notesapp.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;

@Entity
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El nombre del estudiante es obligatorio.")
    private String estudiante;

    @Max(value = 35, message = "El valor máximo para actividades es 35.")
    @NotNull(message = "El campo actividades es obligatorio.")
    private Double actividades;

    @Max(value = 15, message = "El valor máximo para el primer parcial es 15.")
    @NotNull(message = "El campo primer parcial es obligatorio.")
    private Double primerParcial;

    @Max(value = 15, message = "El valor máximo para el segundo parcial es 15.")
    @NotNull(message = "El campo segundo parcial es obligatorio.")
    private Double segundoParcial;

    @Max(value = 35, message = "El valor máximo para el examen final es 35.")
    @NotNull(message = "El campo examen final es obligatorio.")
    private Double examenFinal;

    private Double total;

    // Método para calcular el total
    public void calcularTotal() {
        this.total = this.actividades + this.primerParcial + this.segundoParcial + this.examenFinal;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(String estudiante) {
        this.estudiante = estudiante;
    }

    public Double getActividades() {
        return actividades;
    }

    public void setActividades(Double actividades) {
        this.actividades = actividades;
    }

    public Double getPrimerParcial() {
        return primerParcial;
    }

    public void setPrimerParcial(Double primerParcial) {
        this.primerParcial = primerParcial;
    }

    public Double getSegundoParcial() {
        return segundoParcial;
    }

    public void setSegundoParcial(Double segundoParcial) {
        this.segundoParcial = segundoParcial;
    }

    public Double getExamenFinal() {
        return examenFinal;
    }

    public void setExamenFinal(Double examenFinal) {
        this.examenFinal = examenFinal;
    }

    public Double getTotal() {
        return total;
    }
}
