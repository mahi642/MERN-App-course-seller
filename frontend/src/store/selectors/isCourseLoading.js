import { selector } from "recoil";
import { courseState } from "../atoms/course";

export const isCourseLoading = selector({
    key: 'isCourseLoading',
    get: ({ get }) => {
        const state = get(courseState)
        return state.isCourseLoading
    }
})