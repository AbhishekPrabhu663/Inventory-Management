package in.snyce.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.snyce.inventory.entity.User;
import in.snyce.inventory.service.UserService;
import in.snyce.inventory.service.AreaService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



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
   
   @GetMapping("/getByUserId/{userId}")
   public User getByUserId(@PathVariable String userId) {
       return addUserService.getByUserId(userId);
   }

   
      
   @PostMapping("/add")
   public User addUser(@RequestBody User user) {
     
      return addUserService.addUser(user);
   }

  
   @PutMapping("resetPassword/{userId}")
   public User resetPassword( @PathVariable String userId, @RequestBody String password) {
    return addUserService.resetPassword(userId,password);
   }
}
