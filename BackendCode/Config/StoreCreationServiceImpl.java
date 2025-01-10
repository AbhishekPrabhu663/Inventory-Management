package in.snyce.inventory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import in.snyce.inventory.entity.StoreCreation;
import in.snyce.inventory.repository.StoreCreationRepository;

@Service
public class StoreCreationServiceImpl implements StoreCreationService{
   @Autowired
    public StoreCreationRepository StoreRepository;
    @Override
    public StoreCreation createStore(StoreCreation store){
     return StoreRepository.save(store);
    }

    @Override
    public List <StoreCreation>getAllStore(){
     return StoreRepository.findAll();
    }
    @Override
    public  String lastStoreId(){
     return StoreRepository.lastStoreId();
    }

    
    @Override
    public Optional<StoreCreation> getStore(@PathVariable Integer Id) {
        Optional<StoreCreation> store = StoreRepository.findById(Id);
        
        if (store.isPresent()) {
            // If the store exists, return it
            return store;
        } else {
            // If no store found with the given Id, you can throw an exception or return an empty Optional
            throw new StoreNotFoundException("Store not found with Id: " + Id);
        }
    }
    @Override
    public String deleteById(int id) {
   // Check if the asset exists before attempting to delete
   if (StoreRepository.existsById(id)) {
    StoreRepository.deleteById(id);  // Perform the deletion
       return "Store  with ID " + id + " has been successfully deleted.";  // Return success message
   }
   return "Store with ID " + id + " not found.";  // Return failure message if the asset doesn't exist
}
}
