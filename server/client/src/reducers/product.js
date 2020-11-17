import { PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_ADD_FAIL, 
        PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, 
        PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_BY_CATEGORY_LIST_REQUEST, PRODUCT_BY_CATEGORY_LIST_SUCCESS, PRODUCT_BY_CATEGORY_LIST_FAIL 
    } from "../constants/product"


function productAddReducer(state={product:{}}, action){
    switch (action.type) {
        case PRODUCT_ADD_REQUEST:
            return {loading:true}

        case PRODUCT_ADD_SUCCESS:
            return {loading:false,success:true, product: action.paload}
    
        case PRODUCT_ADD_FAIL:
            return {loading:false, error: action.paload}
    
        default:
           return state
    }
}

function productUpdateReducer(state={product:{}}, action){
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true}

        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false,success:true, product: action.paload}
    
        case PRODUCT_UPDATE_FAIL:
            return {loading:false, error: action.paload}
    
        default:
           return state
    }
}

function productListReducer(state={products:[]}, action) {
    switch (action.type){
        case PRODUCT_LIST_REQUEST:
          return {loading: true, products:[]}
    
        case PRODUCT_LIST_SUCCESS:
          return {loading: false, products: action.payload}
            
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
          return state
    }
}

function productDeleteReducer(state={}, action) {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true };
      case PRODUCT_DELETE_SUCCESS:
        return { loading: false,success: true, product: action.payload };
      case PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function productDetailReducer(state = { product: {} }, action) {
    switch (action.type) {
      case PRODUCT_DETAIL_REQUEST:
        return { loading: true };
      case PRODUCT_DETAIL_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAIL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function productByCategoryListReducer(state={products:[]},action){
    switch (action.type) {
      case PRODUCT_BY_CATEGORY_LIST_REQUEST:
        return {loading:true,products:[]};
      case PRODUCT_BY_CATEGORY_LIST_SUCCESS:
        return {loading:false, products:action.payload};
      case PRODUCT_BY_CATEGORY_LIST_FAIL:
        return {loading:false, error:action.payload};
      default:
        return state
    }
  }


export {productAddReducer, productListReducer, productDeleteReducer,productUpdateReducer, productDetailReducer,productByCategoryListReducer}