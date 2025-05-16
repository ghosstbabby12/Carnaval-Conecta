package com.carnaval.pasto.service;

import com.carnaval.pasto.model.RutaCarnaval;
import com.carnaval.pasto.repository.RutaCarnavalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RutaCarnavalService {

    @Autowired
    private RutaCarnavalRepository repository;

    public List<RutaCarnaval> listarTodos() {
        return repository.findAll();
    }

    public RutaCarnaval guardar(RutaCarnaval ruta) {
        return repository.save(ruta);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
