package in.snyce.inventory.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.snyce.inventory.entity.Material;
import in.snyce.inventory.entity.StoreCreation;
import in.snyce.inventory.repository.StoreCreationRepository;
import in.snyce.inventory.service.MaterialService;
import in.snyce.inventory.service.StoreCreationService;
import in.snyce.inventory.service.StoreCreationServiceImpl;

@RestController
@RequestMapping("/store")
public class StoreCreationController {

@Autowired
    private StoreCreationRepository storeRepository;

@Autowired
  public StoreCreationService StoreService;
    // POST endpoint to create a new store
    @PostMapping("/add")
    public StoreCreation createStore(@RequestBody StoreCreation store) {
        StoreCreation savedStore = StoreService.createStore(store); // Save the store to the database
        return savedStore; // Return the saved store
    }

    @GetMapping("/storelist")
    public List <StoreCreation>getAllStore() {
        return StoreService.getAllStore();
    }
    
    @GetMapping("/store/{Id}")
    public Optional<StoreCreation> getStore(@PathVariable int Id){
      return StoreService.getStore(Id);
    }
    
    @GetMapping("/lastStoreId")
  public String lastStoreId() {
    return StoreService.lastStoreId();         
}

@DeleteMapping("/delete/{id}")
public String deleteById(@PathVariable int id){
    return StoreService.deleteById(id);
}
}
