package in.snyce.inventory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import in.snyce.inventory.entity.Material;


public interface MaterialService {
    List<Material> get(Integer id);    
    Material save(Material asset); 
    Material updateAsset(Material asset);
    String lastAssetCode();
    String deleteById(int id);
    List<Material>getByCategory( String category);
    // List<Assets> listAssetsByAreaId(int areaId);
}