import Realm from 'realm'

class Plan {}

Plan.schema = {
  name: 'Plan',
  properties: {
    salary: 'string',
    foodCostTotal: 'string',
    breakfastCost: 'string',
    breakfastType: 'string',
    lunchType: 'string',
    lunchCost: 'string',
    lunchType: 'string',
    dinnerCost: 'string',
    dinnerType: 'string',
    transportationTotal: 'string',
    transportationType: 'string',
    tripDurationTotal: 'string',
    salaryLeft: 'string',
    salaryToSave: 'string',
    author: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
    }
  }
}
const realm = new Realm({
  schema: [Plan]
})

export default realm
