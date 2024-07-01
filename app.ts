 import { combineReducers,createStore} from 'redux'


interface Action {
    type: 'CREATE_CLAIM' | 'CREATE_POLICY' | 'DELETE_POLICY';
    Payload: {
        name: string;
        amount: number;
    };
}

const CREATE_CLAIM = (name: string, amount: number): Action => {
    return {
        type: 'CREATE_CLAIM',
        Payload: {
            name,
            amount
        }
    };
}

//reducers or departments

const claims =(listofclaims=[],action:Action)=>{

    if (action.type=== 'CREATE_CLAIM'){
        return[...listofclaims,action.Payload.name]
    }
    return listofclaims

}
const accounting = (accountBal=100,action:Action)=>{

    if(action.type === 'CREATE_POLICY' && action.Payload.amount){
        return accountBal + action.Payload.amount
        
    }

    if(action.type === 'CREATE_CLAIM' && action.Payload.amount){
        return accountBal - action.Payload.amount
        
    }
    if(action.type === 'DELETE_POLICY' && action.Payload.amount){
        return accountBal - action.Payload.amount
        
    }

}


const policies = (listofpolicies=[],action:Action)=>{

    if(action.type== 'CREATE_POLICY'){
        return [...listofpolicies,action.Payload.name]
    }
    if(action.type=== 'DELETE_POLICY'){
        return listofpolicies.filter(name=>name!==action.Payload.name)
    }
    return listofpolicies

}


const reducer = combineReducers({claims,policies,accounting})


const store = createStore(reducer)

store.dispatch({type:'CREATE_POLICY', Payload :{name:'Jethro',amount:40000}})
store.dispatch({type: 'CREATE_POLICY', Payload :{name:'Jane',amount:40000}})
store.dispatch({type:'CREATE_POLICY', Payload :{name:'Anne',amount:40000}})
store.dispatch({type:'CREATE_POLICY', Payload :{name:'Rodgers',amount:40000}})

console.log(store.getState)

store.dispatch({type:'CREATE_CLAIM', Payload :{name:'Jane',amount:20000}})
store.dispatch({type:'CREATE_CLAIM', Payload :{name:'Paul',amount:20000}})
store.dispatch({type: 'DELETE_POLICY', Payload :{name:'Jane',amount:20000}})







