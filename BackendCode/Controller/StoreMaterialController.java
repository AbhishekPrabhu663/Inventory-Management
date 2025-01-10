package in.snyce.inventory.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import in.snyce.inventory.entity.Material;
import in.snyce.inventory.entity.StoreCreation;
import in.snyce.inventory.entity.StoreMaterial;
import in.snyce.inventory.service.StoreMaterialService;

@RestController
@RequestMapping("/storematerial")
@CrossOrigin(origins = "http://localhost:5173")
public class StoreMaterialController {

  @Autowired

  public StoreMaterialService storeMaterialService;

  
  @PostMapping("/add")
  public String save(@RequestBody List<StoreMaterial> storematerial) {
    String storedMaterial = storeMaterialService.save(storematerial); // Save the store to the database
    return storedMaterial; // Return the saved store
  }

  @GetMapping("/list")
  public List<StoreMaterial> listStoreMaterial(){
    return storeMaterialService.listStoreMaterial();
  }

  @GetMapping("/list/{storeId}")
  public List<StoreMaterial> listStoreMaterialById(@PathVariable String storeId){
    return storeMaterialService.listStoreMaterialById(storeId);
  }

  @GetMapping("/area/{areaid}")
public List<StoreMaterial> listAssetsByAreaId(@PathVariable int areaid) {
    return storeMaterialService.listAssetsByAreaId(areaid);
}
}
