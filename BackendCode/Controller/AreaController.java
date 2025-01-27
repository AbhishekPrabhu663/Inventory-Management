package in.snyce.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.snyce.inventory.entity.Area;
import in.snyce.inventory.service.AreaService;
@RestController
@RequestMapping("/area")
public class AreaController {
  @Autowired
  public AreaService areaService;

@GetMapping("/list")
public List<Area> getallAreas(){
  return areaService.getallAreas();
}

@PostMapping("/add")
public Area addArea(@RequestBody Area area){
return areaService.addArea(area);
}

}
