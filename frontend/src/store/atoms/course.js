
import {atom} from "recoil"

export const courseState = atom({
  key: "courseState",
  default: {
    isLoading: true,
    courseTitle: null,
    coursePrice: 0,
    courseDescription: null,
    coursePublished: false,
    courseImageUrl: null,
  },
});