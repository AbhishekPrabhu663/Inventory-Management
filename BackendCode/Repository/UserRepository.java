package in.snyce.inventory.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import in.snyce.inventory.entity.User;
import jakarta.persistence.criteria.CriteriaBuilder.In;


@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
   
    List<User> findAll();

    Optional<User> getByUserId(String userId);

 @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = :password WHERE u.userId = :userId")
    void   updatePassword(String userId, String password);

User findByUserId(String userId);
 
  

  

   

}
