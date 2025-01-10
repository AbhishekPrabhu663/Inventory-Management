package in.snyce.inventory.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import in.snyce.inventory.entity.Area;

public interface AreaService {
List<Area> getallAreas();
Area addArea(@RequestBody Area area);
}
