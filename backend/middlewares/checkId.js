import { isValidObjectId } from "mongoose";
import { TbHorse } from "react-icons/tb";
function checkId(req,res,next){
    if(!isValidObjectId(req.params.id)){
        res.status(404);
        throw new Error(`Invalid Object of: ${req.params.id}`);
    }
    next();
}

export default checkId;