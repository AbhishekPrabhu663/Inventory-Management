package in.snyce.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import in.snyce.inventory.entity.Area;
import in.snyce.inventory.repository.AreaRepository;

@Service
public class AreaServiceImpl implements AreaService{

  @Autowired
  public AreaRepository areaRepository;

  @Override
  public List<Area> getallAreas(){
    return areaRepository.findAll();
  }

  @Override
  public Area addArea(@RequestBody Area area){
    return areaRepository.save(area);
  }
}
