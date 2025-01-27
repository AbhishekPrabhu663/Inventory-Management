package in.snyce.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.snyce.inventory.entity.Inwarding;
import in.snyce.inventory.entity.Material;
import in.snyce.inventory.service.InwardingService;

@RestController
@RequestMapping("/inwarding")
@CrossOrigin(origins = "http://localhost:5173")
public class InwardingController {
@Autowired
  public InwardingService inwardingService;

  @GetMapping({"/list", "/list/{id}"})
public List<Inwarding> get(@PathVariable(required = false) Integer id) {
    return inwardingService.get(id);
}

  // Adding of inward entry
  @PostMapping("/add")
  public Inwarding addInward(@RequestBody Inwarding inward) {
    return inwardingService.addInward(inward);
  }

  @DeleteMapping("delete/{id}")
 public String deleteInwardEntry( @PathVariable int id){
  return inwardingService.deleteInwardEntry( id);
 }
}
