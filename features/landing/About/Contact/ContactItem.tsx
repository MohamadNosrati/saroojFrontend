import { ReactNode } from "react"

interface IProps {
    children:ReactNode;
    icon:any;
    title:string;
}


export default function ContactItem({children,icon,title}:IProps){
    const Icon = icon;
    return (
        <div className="flex flex-col items-center  flex-1/3 md:pb-12 px-6 md:pt-2.5 max-md:py-8">
          <span>
            <Icon className="text-primary" width={60} height={48} />
          </span>
          <span className="text-primary block text-2xl  mt-6 mb-4  font-semibold">
            {title}
          </span>
          {children}
        </div>
    )
}