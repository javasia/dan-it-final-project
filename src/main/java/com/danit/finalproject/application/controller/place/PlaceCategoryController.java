package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.dto.request.place.PlaceCategoryRequest;
import com.danit.finalproject.application.dto.response.place.PlaceCategoryResponse;
import com.danit.finalproject.application.facade.place.PlaceCategoryFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/place-categories")
public class PlaceCategoryController {
  private PlaceCategoryFacade placeCategoryFacade;

  @Autowired
  public PlaceCategoryController(PlaceCategoryFacade placeCategoryFacade) {
    this.placeCategoryFacade = placeCategoryFacade;
  }

  @GetMapping("{id}")
  public ResponseEntity<PlaceCategoryResponse> getPlaceCategoryById(@PathVariable("id") Long placeCategoryId) {
    return new ResponseEntity<>(placeCategoryFacade.getById(placeCategoryId), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<PlaceCategoryResponse>> getAllPlaceCategories() {
    return new ResponseEntity<>(placeCategoryFacade.getAll(), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<PlaceCategoryResponse> createNewPlaceCategory(
      @RequestBody PlaceCategoryRequest placeCategoryRequest) {
    return new ResponseEntity<>(placeCategoryFacade.create(placeCategoryRequest), HttpStatus.OK);
  }

  @PutMapping("{id}")
  public ResponseEntity<PlaceCategoryResponse> updatePlaceCategory(
      @PathVariable Long id,
      @RequestBody PlaceCategoryRequest placeCategoryRequest) {
    return new ResponseEntity<>(placeCategoryFacade.update(id, placeCategoryRequest), HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<PlaceCategoryResponse> deletePlace(@PathVariable("id") Long placeCategoryId) {
    return new ResponseEntity<>(placeCategoryFacade.delete(placeCategoryId), HttpStatus.OK);
  }
}