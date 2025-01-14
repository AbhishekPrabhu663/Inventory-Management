package in.snyce.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.snyce.inventory.entity.Area;

@Repository
public interface AreaRepository extends JpaRepository<Area, Integer>{

}
