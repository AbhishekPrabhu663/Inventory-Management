package in.snyce.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import in.snyce.inventory.entity.StoreCreation;
@Repository
public interface StoreCreationRepository extends JpaRepository <StoreCreation,Integer>{
  @Query(value = "SELECT a.store_id FROM store_creation a ORDER BY a.id DESC LIMIT 1", nativeQuery = true)  
  String lastStoreId();


}
