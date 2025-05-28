import axios from "axios";

const BASE_URL = "https://0727-2001-ee0-f1b1-1a20-c99d-cad5-6b1b-64a1.ngrok-free.app";

export const endpoints = {
    //User
    login: "/o/token/",
    current_user: "/users/current_user/",
    get_info: "/residents/get_info/",
    update_avatar: "/users/update_avatar/",

    //Resident
    get_resident: "/residents/",
    get_apartment: "/apartments/",

    //Locker
    get_locker: "/lockers/",
    get_package: "/lockeritems/",
    update_package: (id) => `/lockeritems/${id}/update_locker_item/`,

    //Payment
    get_payment: "/payments/",

    //Card (Vihicle)
    get_card: "/cards/",
    create_card: "/cards/create_card/",

    //Survey 
    get_survey: "/surveys/",
    sub_survey: (id) => `/surveys/${id}/sub_survey/`,
    get_question: (id) => `/surveys/${id}/get_question/`,
    get_response: (id) => `/surveys/${id}/get_response/`,

    //Feedback
    get_feedback_detail: (id) => `/feedbacks/${id}/feedback_detail/`,
    get_feedback: "/feedbacks/",

};

export const authAPI = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default axios.create({
    baseURL: BASE_URL,
});
