import { UserType } from "@/types"
import { ApiResponseType } from "@/types/api-types"

import { http } from "@/lib/http"

export const usersService = {
	getUsers: async (): Promise<ApiResponseType<UserType[]>> => {
		return http.get<UserType[]>("https://jsonplaceholder.typicode.com/users")
	}
}
