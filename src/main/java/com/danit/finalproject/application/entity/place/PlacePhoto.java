package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "places_photos")
@Data
@NoArgsConstructor
public class PlacePhoto extends BaseEntity {

  @Column(name = "image_key")
  private String imageKey;

  @ManyToOne
  @JoinColumn(name = "place_id")
  private Place place;

}
