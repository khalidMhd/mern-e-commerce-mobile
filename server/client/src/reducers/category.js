const { CATEGORY_ADD_REQUEST, CATEGORY_ADD_SUCCESS, CATEGORY_ADD_FAIL,
     CATEGORY_LIST_REQUEST, CATEGORY_LIST_FAIL, CATEGORY_LIST_SUCCESS, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_LIST_BY_NAME_REQUEST, CATEGORY_LIST_BY_NAME_SUCCESS, CATEGORY_LIST_BY_NAME_FAIL 
    }  = require("../constants/category");

function categoryAddReducer(state={category:{}}, action){
    switch (action.type) {
        case CATEGORY_ADD_REQUEST:
            return {loading:true}

        case CATEGORY_ADD_SUCCESS:
            return {loading:false,success:true, category: action.paload}
    
        case CATEGORY_ADD_FAIL:
            return {loading:false, error: action.paload}
    
        default:
           return state
    }
}

function categoryUpdateReducer(state={category:{}}, action){
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return {loading:true}

        case CATEGORY_UPDATE_SUCCESS:
            return {loading:false,success:true, category: action.paload}
    
        case CATEGORY_UPDATE_FAIL:
            return {loading:false, error: action.paload}
    
        default:
           return state
    }
}

function categoryListReducer(state={categories:[]}, action) {
    switch (action.type){
        case CATEGORY_LIST_REQUEST:
          return {loading: true, categories:[]}
    
        case CATEGORY_LIST_SUCCESS:
          return {loading: false, categories: action.payload}
            
        case CATEGORY_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
          return state
    }
}

function categoryDeleteReducer(state={}, action) {
    switch (action.type) {
      case CATEGORY_DELETE_REQUEST:
        return { loading: true };
      case CATEGORY_DELETE_SUCCESS:
        return { loading: false,success: true, category: action.payload };
      case CATEGORY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function categoryByNameListReducer(state={category:[]},action){
    switch (action.type) {
      case CATEGORY_LIST_BY_NAME_REQUEST:
        return {loading:true,category:[]};
      case CATEGORY_LIST_BY_NAME_SUCCESS:
        return {loading:false, category:action.payload};
      case CATEGORY_LIST_BY_NAME_FAIL:
        return {loading:false, error:action.payload};
      default:
        return state
    }
  }


export {categoryAddReducer, categoryListReducer, categoryDeleteReducer, categoryUpdateReducer,categoryByNameListReducer}