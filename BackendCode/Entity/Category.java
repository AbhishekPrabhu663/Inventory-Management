package in.snyce.inventory.entity;
import jakarta.annotation.Generated;
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
public class Category {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private int category_id;
@Column(name="category")
private String Category;
}
