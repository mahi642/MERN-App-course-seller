import { selector } from "recoil";
import { courseState } from "../atoms/course";
export const courseTitle = selector({
    key:"courseTitle",
    get:({get})=>{
        const state = get(courseState);
        return state.courseTitle

    }
})