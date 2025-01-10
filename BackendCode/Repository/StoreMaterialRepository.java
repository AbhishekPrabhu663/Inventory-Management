package in.snyce.inventory.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.snyce.inventory.entity.Material;
import in.snyce.inventory.entity.StoreMaterial;

@Repository
public interface StoreMaterialRepository extends JpaRepository<StoreMaterial ,Integer>{

  List<StoreMaterial> findAllByAreaId(int areaId);

  List<StoreMaterial> getStoreMaterialByStoreId(String storeId);

}
