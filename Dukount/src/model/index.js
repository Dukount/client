import Realm from 'realm'

class Plan {}

Plan.schema = {
  name: 'Plan',
  properties: {
    id: 'string',
    createdAt: 'string',
    salary: 'string',
    foodCostTotal: 'string',
    breakfastCost: 'string',
    breakfastType: 'string',
    lunchCost: 'string',
    lunchType: 'string',
    dinnerCost: 'string',
    dinnerType: 'string',
    transportationTotal: 'string',
    transportationType: 'string',
    tripDurationTotal: 'string',
    salaryLeft: 'string',
    salaryToSave: 'string',
    author: 'string'
  }
}
const realm = new Realm({
  schema: [Plan]
})

export default realm
