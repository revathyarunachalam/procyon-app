import axios from "axios";

const getData = async () => {
    try {
        const {status, data} = await axios.get("https://dummyjson.com/products");
        if (status === 200) return data;
        throw new Error('Error while fetching data.')
      } catch (err) {
        throw new Error('Error while fetching data.')
      }
};

export {
    getData,
}