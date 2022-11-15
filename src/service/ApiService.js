import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8888/api/v1';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL+'/all-users');
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }
    addUser(user) {
        return axios.post(""+USER_API_BASE_URL+'/create-user', user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }
    createResume(resume){
        return axios.post(""+USER_API_BASE_URL + '/create-resume',resume);
    }
   
    getResumeById(user_id)
    {
        return axios.get(USER_API_BASE_URL + '/resume-details'+'/' + user_id);
    }
    updateResumeById(user_id,resume)
    {
        return axios.put(USER_API_BASE_URL + '/resume-details'+'/' + user_id,resume);
    }
}

export default new ApiService();