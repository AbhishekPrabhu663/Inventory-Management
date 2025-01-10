package in.snyce.inventory.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import in.snyce.inventory.entity.Category;

public interface CategoryService {

Category addCategory(@RequestBody Category category);

List<Category> getallCategory();
}
