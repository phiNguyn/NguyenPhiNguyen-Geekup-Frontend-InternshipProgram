import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "./ui/button"
import { useNavigate } from "@/hooks/useNavigate"
import { ReactNode } from "react"

export function BreadcrumbWithCustomSeparator({ name, Icon }: { name: string, Icon: ReactNode }) {
    const { goBack } = useNavigate()
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="flex gap-x-1 items-center">
                        {Icon}
                        <Button  size={"default"} onClick={goBack} className="cursor-pointer hover:bg-gray-200">
                            {name}
                        </Button>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                /
                <BreadcrumbItem>
                    <BreadcrumbLink>
                        <div>Show</div>
                    </BreadcrumbLink>
                </BreadcrumbItem>

            </BreadcrumbList>
        </Breadcrumb>
    )
}
