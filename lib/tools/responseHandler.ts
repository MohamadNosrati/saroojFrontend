import { toast } from "react-toastify";

class ResponseHandler {
  success(message: string) {
    toast.success(message);
  }
  fail(message: string) {
    toast.error(message);
  }
}

export const responseHandler = new ResponseHandler();
