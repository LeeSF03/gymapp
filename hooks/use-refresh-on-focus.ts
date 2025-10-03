import { useCallback, useRef } from "react"
import { useFocusEffect } from "@react-navigation/native"
import {
  RefetchOptions,
  RefetchQueryFilters,
  useQueryClient,
} from "@tanstack/react-query"

export function useRefreshOnFocus({
  filters,
  options,
}: {
  filters?: RefetchQueryFilters<string[]> | undefined
  options?: RefetchOptions
}) {
  const queryClient = useQueryClient()
  const firstTimeRef = useRef(true)

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      // refetch all stale active queries
      queryClient.refetchQueries(filters, options)
    }, [queryClient, filters, options])
  )
}
