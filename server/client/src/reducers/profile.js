const { USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL } = require("../constants/profile");

function userProfileReducer(state={profile:[]},action){
    switch(action.type){
        case USER_PROFILE_REQUEST:
            return {loading:true, profile:[]}
        case USER_PROFILE_SUCCESS:
            return {loading:false, profile:action.payload,success:true}
        case USER_PROFILE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state

    }
}

export {userProfileReducer}