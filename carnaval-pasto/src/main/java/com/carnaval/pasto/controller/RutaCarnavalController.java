package com.carnaval.pasto.controller;

import com.carnaval.pasto.model.RutaCarnaval;
import com.carnaval.pasto.service.RutaCarnavalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rutas")
@CrossOrigin(origins = "*")
public class RutaCarnavalController {

    @Autowired
    private RutaCarnavalService service;

    @GetMapping
    public List<RutaCarnaval> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public RutaCarnaval agregar(@RequestBody RutaCarnaval ruta) {
        return service.guardar(ruta);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
