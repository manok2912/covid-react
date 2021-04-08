import axios from 'axios';
axios.defaults.baseURL = "https://disease.sh/v3/covid-19";

const getHttp = async (url) => {
    try {
        const res = await axios.get(`/${url}`);
        //console.log(res)
        return res;
    } catch (e) {
        console.log(e);
    }
};

export default getHttp;