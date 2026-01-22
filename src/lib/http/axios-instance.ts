import axios from "axios"

import { API_CONFIG, CONTENT_TYPES } from "@/constants"
import {
	setSessionManagerHelpers,
	setupInterceptors
} from "@/constants/config/api"

import {
	getActiveUserSession,
	signOutAndRedirect
} from "@/lib/auth-actions/session-manager"

const http = axios.create({
	baseURL: API_CONFIG.BASE_URL,
	timeout: API_CONFIG.TIMEOUT,
	headers: {
		"Content-Type": CONTENT_TYPES.json
	}
})

// Initialize session manager helpers before setting up interceptors
setSessionManagerHelpers({ getActiveUserSession, signOutAndRedirect })

setupInterceptors(http)

export default http
