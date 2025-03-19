import axios from "axios";

const url = "http://localhost:3001/";

export const getCategories = async () => {
    return axios.get("category");
};

export const getCities = async () => {
    return axios.get("city");
}
export const getWeather = async (city) => {
    try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"05fe17ea9f05fd54bb7574fa7a6e3663"
        }&lang=he&units=metric`);
        console.log(data);
        if (data) {
            return {
                id: data.weather[0]?.id,
                temp: data.main?.temp.toFixed(1), 
                city: data.name,                
                desc: data.weather[0]?.description ,
                icon:data.weather[0]?.icon

            };
        }
        
    } catch (err) {
        console.error("שגיאה בשליפת מזג האוויר:", err.message);
        return { error: "לא נמצאו נתונים לעיר זו" };
    }
};
