import json from './json'
import Realm from 'realm'

const realm = new Realm({
  schema: [json],
})

export default realm
