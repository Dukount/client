[
  {"PreferenceLabel":"RECOMMENDED","DurationMinutes":98,"WalkMinutes":19,"DepartureTime":"05:15","ArrivalTime":"06:53",
  "RouteSegments":[
    {"RouteSegmentType":1,"IconUrl":"https://cdn.trafi.com/icon.ashx?size=64&style=v2&src=walksegment","DurationMinutes":8,"WalkDistanceMeters":487,"StopsCount":0,"StartPoint":{"Name":"","Coordinate":{"Lat":-6.260898113250732,"Lng":106.78144073486328},"Time":"05:15","Id":"_-6.26089811325073;106.781440734863"},"EndPoint":{"Name":"Tanah Kusir Kodim","Coordinate":{"Lat":-6.25698184967041,"Lng":106.78167724609375},"Time":"05:23","Id":"idjkb_8-5 Tanah Kusir Kodim"},"Shape":"ryee@_wvjSYmAeCNeQNQ@@OEI??ST","Transport":null,"OtherTransports":[]},
    {"RouteSegmentType":2,"IconUrl":"https://cdn.trafi.com/icon.ashx?size=64&style=v2&src=transport/idjkb_brt_transjakarta_DA259A_8","DurationMinutes":47,"WalkDistanceMeters":0,"StopsCount":12,"StartPoint":{"Name":"Tanah Kusir Kodim","Coordinate":{"Lat":-6.25698184967041,"Lng":106.78167724609375},"Time":"05:29","Id":"idjkb_8-5 Tanah Kusir Kodim"},"EndPoint":{"Name":"Indosiar","Coordinate":{"Lat":-6.16339635848999,"Lng":106.77521514892578},"Time":"06:16","Id":"idjkb_Indosiar"},
    "Shape":"baee@oxvjSB@uVDcBDwDFwGXsD`@_CJqEGgC[aRsEoC_@yG[cNWkBScBa@CAuMuEqBsA{DcEuB{CWc@sC{EaBeB_PsK_CeAWKiAOgBJm@Vk@f@gAtAiHhI_A`AsBzBaBhBqIvGORgB|BmBfDu@fB_JzSaDfIiBrCiDpFoJtLiFnEeDfB}CjAqK~DkD|@_FdByK~BaGt@]D}NP_Fd@_Jb@e\\`@mE?oK@sCHqBU_CJiCJuADiHj@oKDkAR}B\\gLlD{QtDs^~B}DVwOdBgGlAc@RsMvFcAXeEh@gF\\G?yQGiNGsBCIsABsBOeBa@gBkB}FMaBh@mBzCeFn@c@`EkAxDiAxAs@fAaCrJ_]","Transport":{"Name":"8 TransJakarta","Color":"DA259A","Direction":"towards Harmoni","IconUrl":"https://cdn.trafi.com/icon.ashx?size=64&style=v2&src=transport/idjkb_brt_transjakarta_DA259A_8","ScheduleId":"idjkb_8","TrackId":"8.001"},"OtherTransports":[]},
    {"RouteSegmentType":2,"IconUrl":"https://cdn.trafi.com/icon.ashx?size=64&style=v2&src=transport/idjkb_brt_transjakarta_FFC907_3","DurationMinutes":20,"WalkDistanceMeters":0,"StopsCount":7,"StartPoint":{"Name":"Indosiar","Coordinate":{"Lat":-6.16339635848999,"Lng":106.77521514892578},"Time":"06:22","Id":"idjkb_Indosiar"},"EndPoint":{"Name":"Pasar Baru","Coordinate":{"Lat":-6.166076183319092,"Lng":106.83480834960938},"Time":"06:42","Id":"idjkb_Pasar Baru"},"Shape":"fxrd@cpujSE@xGkUf@oCEyInCkUtC{GNu@DWr@iFBQBw@BaC@aBCcAAi@y@kUo@kTEaBs@cOPqUy@g\\]uNi@yOWkMgAuM??mAyKB]bGw@bCWjAWj@MPOFOBW@gA@cEYeF]aIC}@?e@X}BHy@VqBf@cEvAaL@c@?}@CIEUc@cCO[Y_@[YgGaNAk@HYGA","Transport":{"Name":"3 TransJakarta","Color":"FFC907","Direction":"towards Pasar Baru","IconUrl":"https://cdn.trafi.com/icon.ashx?size=64&style=v2&src=transport/idjkb_brt_transjakarta_FFC907_3","ScheduleId":"idjkb_3","TrackId":"3.002"},"OtherTransports":[]},
    {"RouteSegmentType":1,"IconUrl":"https://cdn.trafi.com/icon.ashx?size=64&style=v2&src=walksegment","DurationMinutes":11,"WalkDistanceMeters":632,"StopsCount":0,"StartPoint":{"Name":"Pasar Baru","Coordinate":{"Lat":-6.166076183319092,"Lng":106.83480834960938},"Time":"06:42","Id":"idjkb_Pasar Baru"},"EndPoint":{"Name":"","Coordinate":{"Lat":-6.163356304168701,"Lng":106.83958435058594},"Time":"06:53","Id":"_-6.1633563041687;106.839584350586"},"Shape":"~hsd@qdakSmA[??JOg@aAcJcRU]w@cECE","Transport":null,"OtherTransports":[]}]}]


    <View>{item.RouteSegments.map(segment => {
      return (
        <View style={styles.routeSegments}>
          <Text style={styles.durationText}>{segment.DurationMinutes}</Text>
          <Text style={styles.startText}>{segment.StartPoint.Name}</Text>
          <Text style={styles.endText}>{segment.EndPoint.Name}</Text>
          <Text style={styles.transportName}>{this.checkSegmentTransport(segment.Transport)}</Text>
        </View>
      )
    })}
    </View>

    <View>
      <Text>This is LatLong From</Text>
      <Text>{this.props.addressFrom}</Text>
    </View>
    <View>
      <Text>This is LatLong To</Text>
      <Text>{this.props.addressTo}</Text>
    </View>
