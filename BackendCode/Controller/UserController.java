package in.snyce.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.snyce.inventory.entity.User;
import in.snyce.inventory.service.UserService;
import in.snyce.inventory.service.AreaService;


@RestController
@RequestMapping("/addUser")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

  @Autowired
   public UserService  addUserService;

   @GetMapping("/list")
   public List<User> getAllUsers() {
       return addUserService.getAllUsers();
   }
   
   @PostMapping("/add")
   public User addUser(@RequestBody User user) {
     
      return addUserService.addUser(user);
   }

}
