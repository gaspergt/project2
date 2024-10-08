package com.notes.notesapp.controllers;

import com.notes.notesapp.models.Nota;
import com.notes.notesapp.repositories.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/notas")
public class NotaController {

    @Autowired
    private NotaRepository notaRepository;

    // Obtener todas las notas
    @GetMapping
    public List<Nota> getAllNotas() {
        return notaRepository.findAll();
    }

    // Crear una nueva nota con validación
    @PostMapping
    public ResponseEntity<?> createNota(@Valid @RequestBody Nota nota, BindingResult result) {
        if (result.hasErrors()) {
            // Devolver los errores de validación
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        // Calcular el total antes de guardar
        nota.calcularTotal();

        Nota savedNota = notaRepository.save(nota);
        return ResponseEntity.ok(savedNota);
    }

    // Obtener una nota por ID
    @GetMapping("/{id}")
    public ResponseEntity<Nota> getNotaById(@PathVariable Long id) {
        Optional<Nota> nota = notaRepository.findById(id);
        return nota.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar una nota existente con validación
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNota(@PathVariable Long id, @Valid @RequestBody Nota notaDetails,
            BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        Optional<Nota> notaOptional = notaRepository.findById(id);
        if (notaOptional.isPresent()) {
            Nota notaToUpdate = notaOptional.get();
            notaToUpdate.setEstudiante(notaDetails.getEstudiante());
            notaToUpdate.setActividades(notaDetails.getActividades());
            notaToUpdate.setPrimerParcial(notaDetails.getPrimerParcial());
            notaToUpdate.setSegundoParcial(notaDetails.getSegundoParcial());
            notaToUpdate.setExamenFinal(notaDetails.getExamenFinal());

            // Calcular el total antes de actualizar
            notaToUpdate.calcularTotal();

            Nota updatedNota = notaRepository.save(notaToUpdate);
            return ResponseEntity.ok(updatedNota);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una nota
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNota(@PathVariable Long id) {
        if (notaRepository.existsById(id)) {
            notaRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
