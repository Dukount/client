<View>
  <View style={{ flex: 1 }}>
  <GooglePlacesAutocomplete
    placeholder='Enter Location'
    minLength={2}
    autoFocus={false}
    returnKeyType={'search'}
    listViewDisplayed='auto'
    fetchDetails={true}
    renderDescription={row => row.description}
    onPress={(data, details = null) => {
      console.log(data, details)
      const region = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    }}

    getDefaultValue={() => ''}
    query={{
         key: 'AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc',
         language: 'en',
         types: 'geocode',
    }}
    styles={{
      textInputContainer: {
        width: '100%'
      },
      description: {
        fontWeight: 'bold'
      },
      predefinedPlacesDescription: {
        color: '#1faadb'
      }
    }}
    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
    currentLocationLabel="Current location"
    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
    GoogleReverseGeocodingQuery={{
      // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
    }}
    GooglePlacesSearchQuery={{
      // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
      rankby: 'distance',
      types: 'food'
    }}

    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
    predefinedPlaces={[homePlace, workPlace]}

    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
  />
</View>
<View>
  <MapView
    provider={ PROVIDER_GOOGLE }
    style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, marginTop: 200}}
    showsUserLocation={ true }
    region={ this.state.region }
    onRegionChange={ region => this.setState({region}) }
    onRegionChangeComplete={ region => this.setState({region}) }
  >
    <MapView.Marker
      coordinate={ this.state.region }
    />
  </MapView>
</View>
</View>
