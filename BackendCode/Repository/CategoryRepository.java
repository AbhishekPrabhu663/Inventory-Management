package in.snyce.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.snyce.inventory.entity.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer>{

}
