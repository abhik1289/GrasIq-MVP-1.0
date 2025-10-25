import { usePathname } from "next/navigation";

export const useActiveMenu = (path: string): boolean => {
    const pathname = usePathname();
    return pathname === path;
}