package in.snyce.inventory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import in.snyce.inventory.entity.Material;
import in.snyce.inventory.entity.StoreMaterial;

public interface StoreMaterialService {
  String save(@RequestBody List<StoreMaterial> storematerial);
List<StoreMaterial> listStoreMaterial();
List<StoreMaterial> listAssetsByAreaId(int areaId);
List<StoreMaterial> listStoreMaterialById( String storeId);
}
