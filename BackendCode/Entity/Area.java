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
public class Area {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
@Column(name="area_id")
private int areaId;
@Column(name="area")
private String area;

}
