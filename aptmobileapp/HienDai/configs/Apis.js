import axios from "axios";

const BASE_URL = "https://presumably-literate-bluejay.ngrok-free.app";

export const endpoints = {
    //User
    login: "/o/token/",
    current_user: "/users/current_user/",
    update_avatar: "/users/update_avatar/",
    update_password: "/users/update_password/",
    get_avatar: "/users/avatar/",

    //Resident
    get_resident: "/residents/",
    get_info: "/residents/get_info/",
    get_apartment: "/apartments/",

    create_user: (id) => `/residents/${id}/create_user/`,

    get_family: "/residents/get_profile/",
    create_family: "/residents/create_profile/",
    transfer_apartment: (id) => `/apartments/${id}/transfer/`,

    //Locker
    get_locker: "/lockers/",
    get_package: "/lockeritems/",
    update_package: (id) => `/lockeritems/${id}/update_locker_item/`,
    get_locker_item: (id) => `/lockers/${id}/get_locker_item/`,
    create_locker_item: (id) => `/lockers/${id}/create_locker_item/`,
    update_locker_item: (id) => `/lockeritems/${id}/update_locker_item/`,
    
    //Payment
    get_payment: "/payments/",

    //Card (Vihicle)
    get_card: "/cards/",
    create_card: (id) => `/residents/${id}/create_card/`, //ID của resident
    confirm_card: (id) => `/cards/${id}/confirm_card/`,

    //Survey 
    get_survey: "/surveys/",
    sub_survey: (id) => `/surveys/${id}/sub_survey/`,
    get_question: (id) => `/surveys/${id}/get_question/`,
    get_response: (id) => `/surveys/${id}/get_response/`,
    create_survey: "/surveys/create_survey/",
    get_analytic: (id) => `/surveys/${id}/get_analytic/`,

    //Feedback
    get_feedback_detail: (id) => `/feedbacks/${id}/feedback_detail/`,
    get_feedback: "/feedbacks/",
    set_response: (id) => `/feedbacks/${id}/admin_response/`,

};

// Auth API
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
