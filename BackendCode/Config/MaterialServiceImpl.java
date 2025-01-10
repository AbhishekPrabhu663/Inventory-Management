package in.snyce.inventory.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import in.snyce.inventory.entity.Material;
import in.snyce.inventory.repository.MaterialRepository;

@Service
public class MaterialServiceImpl implements MaterialService {

  @Autowired
  public MaterialRepository materialRepository;

  /**
   * Retrieves all assets from the database.
   * 
   * @return List of all assets.
   * @throws ResponseStatusException if no assets are found.
   */
  @Override
public List<Material> get(Integer id) {
    if (id == null) {
        // Fetch all assets
        List<Material> assets = materialRepository.findAll();
        if (assets.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No assets found.");
        }
        return assets;
    } else {
        // Fetch a single asset by ID
        return materialRepository.findById(id)
                .map(Collections::singletonList) // Wrap the asset in a list
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Asset not found with ID: " + id));
    }
}

  /**
   * Saves a new asset to the database.
   * 
   * @param assets Asset object to save.
   * @return The saved asset.
   * @throws ResponseStatusException if the save operation fails.
   */
  @Override
  public Material save(Material assets) {
    try {
      return materialRepository.save(assets);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save asset.", e);
    }
  }

  /**
   * Updates an existing asset.
   * 
   * @param assets Asset object with updated values.
   * @return The updated asset.
   * @throws ResponseStatusException if the update operation fails.
   */
  @Override
  public Material updateAsset(Material assets) {
    if (!materialRepository.existsById(assets.getId())) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Asset not found with ID: " + assets.getId());
    }
    return materialRepository.save(assets);
  }

  /**
   * Retrieves the last asset code.
   * 
   * @return The last asset code as a string.
   * @throws ResponseStatusException if no asset codes are found.
   */
  @Override
  public String lastAssetCode() {
    String lastCode = materialRepository.lastAssetCode();
    if (lastCode == null || lastCode.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No asset codes found.");
    }
    return lastCode;
  }

  /**
   * Deletes an asset by its ID.
   * 
   * @param id The ID of the asset to delete.
   * @return A message indicating the deletion result.
   * @throws ResponseStatusException if the asset is not found.
   */
  @Override
  public String deleteById(int id) {
    if (materialRepository.existsById(id)) {
      materialRepository.deleteById(id);
      return "Asset with ID " + id + " has been successfully deleted.";
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Asset with ID " + id + " not found.");
  }

  /**
   * Retrieves assets by category.
   * 
   * @param category The category to filter by.
   * @return List of assets matching the category.
   * @throws ResponseStatusException if no assets are found.
   */
  @Override
  public List<Material> getByCategory(String category) {
    List<Material> assets = materialRepository.findByCategory(category);
    if (assets.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No assets found for category: " + category);
    }
    return assets;
  }
}
