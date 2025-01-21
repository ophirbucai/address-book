import { useNavigation } from "react-router";

export function useIsLoading() {
    return useNavigation().state === 'loading';
}