package in.snyce.inventory.service;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import in.snyce.inventory.entity.User;

public interface UserService {
  List<User> getAllUsers();
  User getByUserId( String userId);
  User addUser(User user);
  User resetPassword(String userId, String password);
}
