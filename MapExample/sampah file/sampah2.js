<View>
<MapView
 style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, marginTop: 200}}
 region={this.state.mapRegion}
 onRegionChange={(regions) => {
   this.setState({
     mapRegion: regions
   });
 }}
 onPress={(e) => {
   const region = {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      }
   this.onRegionChange(region, region.latitude, region.longitude);
 }}
>
 <MapView.Marker
   coordinate={{
     latitude: (this.state.latitude),
     longitude: (this.state.longitude),
   }}
   title="Lokasi"
   description="Hello"
 />
</MapView>
</View>
