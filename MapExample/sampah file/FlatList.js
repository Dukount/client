{!this.props.suggestions ? <Text>Check your routes</Text> : (
  <FlatList
    data={this.props.suggestions}
    renderItem={({suggestion}) => {
      return (
        <View style={}>
          <Text style={}>{}</Text>
          <Text>{}</Text>
        </View>
      )
    }}
  />
)}
