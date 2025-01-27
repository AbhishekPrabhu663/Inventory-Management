package in.snyce.inventory.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.snyce.inventory.entity.Category;
import in.snyce.inventory.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {

@Autowired
  public CategoryService categoryService;

@PostMapping("/add")
public Category addCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
}

@GetMapping("/list")
public List<Category> getallCategory(){
  return categoryService.getallCategory();
}

}
