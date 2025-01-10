package in.snyce.inventory.entity;
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
public class StoreMaterial {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int Id;
    @Column(name="store_id")
    private String storeId;
  @Column(name="store_name")
  private String storeName;
  @Column(name="area")
  private String area;
  @Column(name="area_id")
  private int areaId;
  @Column(name="category")
  private String Category;
  @Column(name="assets")
  private String assets;
  @Column(name="quantity_available")
  private int quantity;
 @Column(name="quantity_requested")
 private int quantityAvailable;
 @Column(name="quantity_dispatched")
 private int quantityDispatched;
 @Column(name="quantity_inwarded")
 private int quantityInwarded;
 @Column(name="reorderlevel")
 private int reorderLevel;
 @Column(name="max_quantity")
 private int maxQuantity;
 @Column(name="min_quantity")
 private int minQuantity;
  }
