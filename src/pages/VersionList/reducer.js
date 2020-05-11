const actionTypes = {
	GET_VERSION_LIST: Symbol('getVersionList'),
	GET_CITIES: Symbol('getCities'),
}

const initialState = {
	versionList: [],
	total: 0,
	current: 1,
	cities: [],
}

const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.GET_VERSION_LIST:
			return {
				...initialState,
				...action.payload,
			}
		case actionTypes.GET_CITIES:
			return {
				...initialState,
				cities: action.payload,
			}
		default:
			return state
	}
}

export { actionTypes, initialState, reducer }
