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
public class StoreCreation {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int Id;
  @Column(name = "store_id")
  private String storeId;
  @Column(name = "store_name")
  private String storeName;
  @Column(name = "area")
  private String area;
  @Column(name = "area_id")
  private int areaId;
}

