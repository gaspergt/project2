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

    @GetMapping
    public List<Nota> getAllNotas() {
        return notaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createNota(@Valid @RequestBody Nota nota, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        nota.calcularTotal();

        Nota savedNota = notaRepository.save(nota);
        return ResponseEntity.ok(savedNota);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nota> getNotaById(@PathVariable Long id) {
        Optional<Nota> nota = notaRepository.findById(id);
        return nota.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

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

            notaToUpdate.calcularTotal();

            Nota updatedNota = notaRepository.save(notaToUpdate);
            return ResponseEntity.ok(updatedNota);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

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
