package in.snyce.inventory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import in.snyce.inventory.entity.Material;
import in.snyce.inventory.entity.StoreMaterial;
import in.snyce.inventory.repository.StoreMaterialRepository;

@Service
public class StoreMaterialServiceImpl implements StoreMaterialService{

  @Autowired
  public StoreMaterialRepository storeMaterialRepository;

  @Override
public String save(List<StoreMaterial> storeMaterials) {
    try {
        // Validate the incoming list
        if (storeMaterials == null || storeMaterials.isEmpty()) {
            throw new IllegalArgumentException("The store materials list cannot be null or empty.");
        }

        // Perform the save operation
        List<StoreMaterial> savedMaterials = storeMaterialRepository.saveAll(storeMaterials);
        
        if (savedMaterials.isEmpty()) {
            throw new RuntimeException("Failed to save store materials. No records were saved.");
        }

        return "Successfully saved " + savedMaterials.size() + " store materials.";

    } catch (IllegalArgumentException e) {
        // Handle invalid input
        return "Error: " + e.getMessage();
    
    } catch (DataIntegrityViolationException e) {
        // Handle database constraint violations (e.g., unique constraints, null fields)
        return "Error: Data integrity violation - " + e.getMessage();

    } catch (Exception e) {
        // Catch-all for other unexpected errors
        return "An unexpected error occurred while saving store materials: " + e.getMessage();
    }
}

    @Override
    public List<StoreMaterial> listStoreMaterial(){
      return storeMaterialRepository.findAll();
    }

    @Override
    public List<StoreMaterial> listStoreMaterialById( String storeId) {
      // Assuming findAllByAreaId returns a List<Assets>, not an Optional
      List<StoreMaterial> storeListById = storeMaterialRepository.getStoreMaterialByStoreId(storeId);
       // Return the list of assets, can be empty if no assets match
      return storeListById;
  }

    @Override
    public List<StoreMaterial> listAssetsByAreaId(int areaId) {
      // Assuming findAllByAreaId returns a List<Assets>, not an Optional
      List<StoreMaterial> areaList = storeMaterialRepository.findAllByAreaId(areaId);
       // Return the list of assets, can be empty if no assets match
      return areaList;
  }
}
