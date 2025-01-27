package in.snyce.inventory.service;

import java.util.List;
import java.util.Optional;
import org.hibernate.annotations.DialectOverride.OverridesAnnotation;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import in.snyce.inventory.entity.User;
import in.snyce.inventory.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class UserServiceImpl implements UserService{
// Logger initialization
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
  @Autowired
  public UserRepository addUserRepository;



  @Override
  public List<User> getAllUsers(){
    try {
      // Fetch users from the repository 
      return addUserRepository.findAll(); // or your equivalent method for fetching users
  } catch (Exception e) {
      // Log the error with a message and exception stack trace
      logger.error("Error occurred while fetching all users", e);
      // Optionally, throw a custom exception to provide more meaningful error information
      throw new RuntimeException("An error occurred while fetching user data", e);
  }
}

@Override
public User getByUserId(@PathVariable String userId) {
    try {
        // Attempt to fetch the user by ID
        Optional<User> user = addUserRepository.getByUserId(userId);

        // Check if the user exists in the Optional
        if (user.isPresent()) {
            return user.get(); // Return the user if found
        } else {
            // Log the case when the user is not found
            logger.warn("User with id {} not found", userId);
            return null; // You can choose to return null or throw an exception here
        }
    } catch (Exception e) {
        // Log the error with a message and exception stack trace
        logger.error("Error occurred while fetching the user details with id {}", userId, e);
        // Optionally, throw a custom exception or rethrow the exception
        throw new RuntimeException("An error occurred while fetching user details", e);
    }
}



@Override
public User addUser(User user) {
    try {
        // Validate inputs and trim values
        if (user.getUserName() != null) {
            user.setUserName(user.getUserName().trim());
        }
        if (user.getPassword() != null) {
            user.setPassword(user.getPassword().trim());
        }
        if (user.getUserRole() != null) {
            user.setUserRole(user.getUserRole().trim());
        }

        // Save the user and return the saved user object
        return addUserRepository.save(user);
    } catch (Exception e) {
        // Log the exception and throw a runtime exception with a meaningful message
        logger.error("Unexpected error while adding user", e);
        throw new RuntimeException("An error occurred while adding the user", e);
    }
}

@Override
public User resetPassword(String userId, String password) {
    addUserRepository.updatePassword(userId, password);  // Execute the update
    // Fetch the updated user from the repository
    return addUserRepository.findByUserId(userId);  // Assuming you have this method in your repository
}
}


