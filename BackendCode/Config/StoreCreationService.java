package in.snyce.inventory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import in.snyce.inventory.entity.StoreCreation;

public interface StoreCreationService {
StoreCreation createStore(@RequestBody StoreCreation store);
 List <StoreCreation> getAllStore();
  String lastStoreId();
  Optional<StoreCreation> getStore(Integer Id);
  String deleteById( int id);


}
