package in.snyce.inventory.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class User {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name = "id")  // Use a numeric type for the ID
  private Integer id;  // Change the ID to Integer or Long
  @Column(name="username")
  private String userName;
  @Column(name="password")
  private String password;
  @Column(name="confirm_password")
  private String confirmPassword;
  @Column(name="user_role")
  private String userRole;
  @Column (name="user_id")
  private String userId;
  public List<User> trim() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'trim'");
  }
 
}
