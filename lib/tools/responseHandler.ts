import { toast } from "react-toastify";

class ResponseHandler {
  success(message: string) {
    console.log("here");
    toast.success(message);
    console.log("test");
  }
  fail(error: any) {
    if (error.message) {
      toast.error(error.message);
    }
  }
}



export const responseHandler = new ResponseHandler();
