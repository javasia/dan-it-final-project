package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "place_messages")
@Data
@NoArgsConstructor
public class PlaceMessage extends BaseEntity {

  @Column(name = "message")
  private String message;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "place_id")
  @ToString.Exclude
  private Place place;

}