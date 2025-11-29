import { useToastStore } from "@/store/toastStore"

export function useToast() {
    const { addToast, removeToast, toasts } = useToastStore()

    return {
        toast: addToast, // Alias for compatibility if needed
        addToast,
        dismiss: removeToast,
        toasts,
    }
}

export const toast = (props: any) => {
    useToastStore.getState().addToast(props)
}
