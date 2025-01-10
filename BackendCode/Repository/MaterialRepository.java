package in.snyce.inventory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import in.snyce.inventory.entity.Material;

@Repository
public interface MaterialRepository extends JpaRepository<Material,Integer> {
  @Query(value = "SELECT a.asset_code FROM assets a ORDER BY a.id DESC LIMIT 1", nativeQuery = true)  String lastAssetCode();
  // List<Assets> findAllByAreaId(int areaId);

  List<Material> findByCategory(String category);

  

}
