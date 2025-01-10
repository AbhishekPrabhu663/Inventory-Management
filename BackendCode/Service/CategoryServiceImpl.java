package in.snyce.inventory.service;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.stereotype.Service;

import in.snyce.inventory.entity.Category;
import in.snyce.inventory.repository.CategoryRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class CategoryServiceImpl implements CategoryService{

  @Autowired

  public CategoryRepository categoryRepository;
  @Override
  public Category addCategory(@RequestBody Category category){
  return categoryRepository.save(category);
  }

  @Override
  public List<Category> getallCategory(){
    return categoryRepository.findAll();
  }
}
