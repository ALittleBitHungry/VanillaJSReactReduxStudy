
var storeCtrl = function() {
  
  //Core private data
  const initialState = {
    value1: "",
    value2: ""
  };
  
  let _state;

  //Private PubSub module
  const _events = (function() {
    let listeners = {};

    //Public functions
    subscribe = function (event, callback) {
      let self = this;

      if (!self.events.hasOwnProperty(event)) {
        self.events[event] = [];
      }

      return self.events[events].push(callback);
    }

    notify = function (event, state) {
      let self = this;

      if (!self.events.hasOwnProperty(event)) {
        return [];
      }

      return self.events[event].map(callbackFunc => callbackFunc(state));
    }

    getListeners = function () {
      return listeners;
    }

    return {
      subscribe: subscribe,
      notify: notify,
      getListeners: getListeners
    }
  })();

    
  //Declare actions
  const UPDATE_VALUES = "UPDATE_VALUES";
  
  const UpdateValues = (payload) => {
    return {
    type: UPDATE_VALUES,
    payload
    }
  };

  //Combine actions
  const actions = () => {
    return {
      updateValues: UpdateValues
    }
  };
  
  //Declare reducer
  const reducer = function (state = _state || initialState, action = {type: "any", payload: "any"}) {
     switch (action.type) {
       case "UPDATE_VALUES":
         return Object.assign({}, state, action.payload);
         break;
     }
    return state;
  };
  
  //Declare dispatch
  const dispatch = function (action) {
  _state = reducer(_state, action);
  notify(_state);
  return _state;
  };

  
  var getState = function () {
    return _state;
  };

  //Set initial state
  (function init () {
    _state = reducer();
  })();
  
  return {
    dispatch: dispatch,
    getState: getState,
    actions: actions
  }
};

var FormCtrl = function (state, actions, dispatch) {
  
  //ShouldComponentUpdate function
  
  //Stateless components
  const formComponent = () => {
    return `<div>
              <form action="">
                <div>
                  <label for="">
                    Value1: 
                      <input type="text" name: "value1">
                  </label>
                  <label for="">
                    Value2: 
                      <input type="text" name: "value1">
                  </label>
                </div>
                <button>Update values</button>`
  };

  const valuesComponent = props => {
    function generateValuesParagraphs () {
      return Object.keys(props)
                   .map((key) => {
                    const keyNameFirstChar = key[0],
                          keyName = key.replace(keyNameFirstChar, keyNameFirstChar.toUpperCase())
                    return `<p>${keyName} = ${props[key]}</p>`
                   })
                   .join('\n')
    };

    return `<div>
              ${generateValuesParagraphs()}
            </div>`
  }
  //Render function
  const render = state => {
    return `${formComponent()}
            ${valuesComponent(state)}`
  };
  //Init function
};

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