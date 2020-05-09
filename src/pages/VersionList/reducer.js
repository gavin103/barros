const actionTypes = {
	GET_VERSION_LIST: Symbol('getVersionList'),
}

const initialState = {
	versionList: [],
	total: 0,
	current: 1,
}

const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.GET_VERSION_LIST:
			return {
				...initialState,
				...action.payload,
			}
		default:
			return state
	}
}

export { actionTypes, initialState, reducer }
