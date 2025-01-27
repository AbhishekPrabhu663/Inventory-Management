package in.snyce.inventory.controller;

import java.util.List;
import java.util.ListIterator;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import in.snyce.inventory.entity.Material;
import in.snyce.inventory.repository.MaterialRepository;
import in.snyce.inventory.service.MaterialService;

@RestController
@RequestMapping("/materiallisting")
public class MaterialController {
  @Autowired
  public MaterialService assetListingService;

  @CrossOrigin(origins = "http://localhost:5173")

  //to get all asset if there is no id add and if there is id it will fetch individual data
  @GetMapping({"/list", "/list/{id}"})
public List<Material> get(@PathVariable(required = false) Integer id) {
    return assetListingService.get(id);
}


  // Adding of asset
  @PostMapping("/add")
  public Material asset(@RequestBody Material asset) {
    return assetListingService.save(asset);
  }

  // updating of asset based on the id basis
  @PutMapping("/update")
  public Material update(@RequestBody Material asset) {
    return assetListingService.save(asset);
  }

  // Get the last asset code generated
  @GetMapping("/lastMaterialCode")
  public String lastAssetCode() {
    return assetListingService.lastAssetCode();
  }

  // get the id of the asset to delete the asset
  @DeleteMapping("/delete/{id}")
  public String deleteById(@PathVariable int id) {
    return assetListingService.deleteById(id);
  }

  // get the assets based on the category
  @GetMapping("/byCategory/{category}")
  public List<Material> getByCategory(@PathVariable String category) {
    return assetListingService.getByCategory(category);
  }

  
  // @GetMapping("/area/{areaId}")
  // public List<Assets> listAssetsByareaId(@PathVariable int areaId) {
  // return assetListingService.listAssetsByAreaId(areaId);
  // }

}
