import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import {placesOperations} from 'store/places'
import ImageUploader from '../../../../../components/ImageUploader'
import Grid from "@material-ui/core/Grid";
import FormButtons from "../../../../../components/FormButtons";
import Preloader from "../../../../../components/Preloader";
import {Redirect} from "react-router-dom";

const styles = theme => ({})

const emptyPlace = {
  title: '',
  description: '',
  address: '',
  placeCategory: null
}

class PlaceForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editedPlace: props.place !== undefined ? props.place : emptyPlace,
      placeImages: props.place !== undefined ? props.place.photos : [],
      isDataSubmitted: false
    }
  }

  componentDidMount() {
    const {fetchPlaceFormData} = this.props
    fetchPlaceFormData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.place && nextProps.place !== this.props.place) {
      this.setState({
        editedPlace: nextProps.place,
        placeImages: nextProps.place.photos
      })
    }
  }

  savePlace = () => {
    const {savePlace} = this.props
    const {editedPlace, placeImages} = this.state
    savePlace(editedPlace, placeImages).then(() => {
      this.setState({
        isDataSubmitted: true
      })
    })
  }

  handleChange = name => event => {
    const {categories} = this.props
    if (name === 'placeCategory') {
      this.setState({
        editedPlace: {
          ...this.state.editedPlace,
          [name]: categories.find(category => category.id === event.target.value)
        }
      })
    } else {
      this.setState({
        editedPlace: {...this.state.editedPlace, [name]: event.target.value}
      })
    }
  }

  onFileChange = (images) => {
    const newPlaceImage = images.map((file) => Object.assign(file, {
      imageUrl: URL.createObjectURL(file),
      imageKey: null
    }))

    this.setState((state) => {
      return {
        placeImages: [...state.placeImages, ...newPlaceImage]
      }
    })
  }

  onMainPhotoSelect = (selectedImage) => {
    const newPlaceImages = this.state.placeImages.map(image => {
      image.isMainImage = image === selectedImage
      return image
    })

    this.setState(() => {
      return {
        placeImages: newPlaceImages
      }
    })
  }

  onImageReset = (image) => {
    const newPlaceImages = this.state.placeImages.filter(elem => elem !== image)
    this.setState({
      ...this.state,
      placeImages: newPlaceImages,
    })
  }

  render() {
    const {categories, isPlaceFormDataLoading} = this.props
    const {editedPlace, placeImages, isDataSubmitted} = this.state

    if (isDataSubmitted) {
      return <Redirect to={'/admin/places'}/>
    }

    if (isPlaceFormDataLoading) {
      return <Preloader/>
    }

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              value={editedPlace.title}
              onChange={this.handleChange('title')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              value={editedPlace.description}
              onChange={this.handleChange('description')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              fullWidth
              variant="outlined"
              value={editedPlace.address}
              onChange={this.handleChange('address')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Place Category'
              select
              fullWidth
              value={editedPlace.placeCategory ? editedPlace.placeCategory.id : ''}
              onChange={this.handleChange('placeCategory')}
              variant="outlined"
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={12}>
            <ImageUploader images={placeImages}
                           onFileChange={this.onFileChange}
                           onReset={this.onImageReset}
                           onMainPhotoSelect={this.onMainPhotoSelect}
                           multiple={true}/>
          </Grid>
        </Grid>
        <FormButtons
          saveFunction={this.savePlace}
          cancelLink={'/admin/places'}
        />
      </div>
    )
  }
}

PlaceForm.propTypes = {
  classes: PropTypes.object.isRequired,
  place: PropTypes.object,
  getPlaceCategories: PropTypes.func.isRequired,
  savePlace: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  fetchPlaceFormData: PropTypes.func.isRequired,
  isPlaceFormDataLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state, props) => {
  return {
    categories: [...state.places.placeCategories],
    places: state.places.places,
    place: state.places.places.find(place => place.id.toString() === props.match.params.placeId),
    isPlaceFormDataLoading: state.places.isPlaceFormDataLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaceCategories: () => dispatch(placesOperations.getPlacesCategories()),
    savePlace: (placeId, place) => dispatch(placesOperations.savePlace(placeId, place)),
    fetchPlaceFormData: () => dispatch(placesOperations.fetchPlaceFormData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceForm))
