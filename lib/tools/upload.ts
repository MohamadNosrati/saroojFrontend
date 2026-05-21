export const uploadUrl= (image:string)=>{
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${image}`
}