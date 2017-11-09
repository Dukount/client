import Realm from 'realm'

class Plan {}

Plan.schema = {
  name: 'Plan',
  properties: {
    id: 'string',
    createdAt: 'string',
    salary: 'string',
    foodCostTotal: 'string',
    transportationTotal: 'string',
    salaryLeft: 'string',
    salaryToSave: 'string',
    author: 'string',
  }
}
const realm = new Realm({
  schema: [Plan]
})

export default realm
