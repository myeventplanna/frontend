import { useQuery } from "@tanstack/react-query"

import { BusinessRegisterTrackerResponse } from "@/types/generated"
import { BUSINESSES_WITH_CUSTOM_APP_ROUTE } from "@/constants"
import { BUSINESSES_WITH_CUSTOM_APP_KEYS } from "@/constants/api/query-keys"

import { http } from "@/lib/http"

export interface BusinessTrackerResponse {
	status: string
	data: BusinessRegisterTrackerResponse[]
	message: string
	pagination: {
		currentPage: number
		totalPage: number
		elementPerPage: number
		totalElements: number
		currentPageSize: number
	}
}

const useFetchBusinessesWithCustomApp = () => {
	const { data, isError, isPending } = useQuery<BusinessTrackerResponse, Error>(
		{
			queryKey: [BUSINESSES_WITH_CUSTOM_APP_KEYS],
			queryFn: async () => {
				const response = await http.get<BusinessTrackerResponse>(
					BUSINESSES_WITH_CUSTOM_APP_ROUTE
				)
				return response.data
			}
		}
	)

	return {
		data: data?.data ?? undefined,
		isLoading: isPending,
		isError
	}
}
export default useFetchBusinessesWithCustomApp
