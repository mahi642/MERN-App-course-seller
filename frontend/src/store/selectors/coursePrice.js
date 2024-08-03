import { courseState } from "../atoms/course"
import {selector} from "recoil"
export const coursePrice = selector({
    key:"coursePrice",
    get :({get})=>{
        const state = get(courseState)
        return state.coursePrice
    }
})