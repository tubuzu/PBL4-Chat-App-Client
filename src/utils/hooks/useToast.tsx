import { useToast, UseToastOptions } from "@chakra-ui/toast";

export function useToastHook(
  defaultOptions: UseToastOptions = {
    duration: 5000,
    isClosable: true,
    position: "top",
  }
) {
  const toast = useToast();
  const success = (data: string) =>
    toast({ ...defaultOptions, status: "success", title: data });

  const error = (data: string, options?: UseToastOptions) =>
    toast({ ...defaultOptions, ...options, status: "error", title: data });

  const info = (data: string, options?: UseToastOptions) =>
    toast({ ...defaultOptions, ...options, status: "info", title: data });
  return { success, error, info };
}
