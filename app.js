
var store = function() {
  
  var initialState = {
    value1: "",
    value2: ""
  };
  
  var _state;

  //Declare actions
  var UPDATE_VALUES = "UPDATE_VALUES";
  
  var UpdateValues = (payload) => {
    return {
    type: UPDATE_VAL_1,
    payload
    }
  }
  
  //Declare reducer
  var reducer = function (state = _state || initialState, action) {
     switch (action.type) {
       case "UPDATE_VALUES":
         return Object.assign({}, state, action.payload);
         break;
     }
    return state;
  };
  
  var dispatch = function (action = {name: "any", payload: "any"}) {
  _state = reducer(_state, action);
  notify(_state);
  return _state;
  };
  
  var subscribers = [];
  var subscribe = function (fn) {
    subscribers = subscribers.concat(fn);
    console.log(subscribers);
  };
  
  var getSubscribers = function () {
    return subscribers;
  };
  
  var notify = function (state) {
    subscribers.forEach((fn) => {
      fn.call(undefined, state);
    })
  };
  
  var getState = function () {
    return _state;
  };
  
  return {
    dispatch: dispatch,
    getState: getState,
    subscribe: subscribe,
    getSubscribers: getSubscribers
  }
};

var ObjCtrl = function () {
  //Map state function
  
  //Map actions function
  
  //Subscribe to store change/ComponentWillReceiveUpdate
  
  //ShouldComponentUpdate function
  
  //Stateless containers
  
  //Render function
  
  //Init function
}

var app = (function (store) {
  
  var render = function () {
    var state = arguments[0];
    var text = [];
    for (key in state) {
      text = text.concat(`${key}: ${state[key]}`);
    }
    document.body.innerText = text.join('\n\n');
  }
  
  //Add render method as subscriber
  store.subscribe(render)
  //Set initial store
  
  return {
    updateVal1: UpdateVal1,
    updateVal2: UpdateVal2,
    store: store
  }
})(store());