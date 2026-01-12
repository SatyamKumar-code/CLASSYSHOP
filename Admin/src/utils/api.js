import axios from 'axios';
  const apiUrl = import.meta.env.VITE_API_URL;


export const postData = async (url, formData) => {
    try {
        const response = await fetch(apiUrl + url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }


    } catch (error) {
        console.log(error);
    }
}

export const fetchDataFromApi = async (url) => {
    try {
        const params = {
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('accesstoken')}`,
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.get(apiUrl + url, params);
        return data; 

    } catch (error) {
        console.log(error);
        return error;
    } 
}

export const uploadImage = async (url, updateData ) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    
    var response;
    await axios.put(apiUrl + url, updateData, params).then((res) => {
        response = res;
    })
    return response;
}

export const uploadImages = async (url, formData ) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    
    var response;
    await axios.post(apiUrl + url, formData, params).then((res) => {
        response = res;
    })
    return response;
}

export const editData = async (url, updateData ) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
            'Content-Type': 'application/json'
        }
    }
    
    var response;
    await axios.put(apiUrl + url, updateData, params).then((res) => {
        response = res;
    })
    return response;
}

export const deleteImages = async (url, image) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
            'Content-Type': 'application/json'
        }
    }
    const res = await axios.delete(apiUrl + url, params);
    return res;
}

export const deleteData = async (url ) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
            'Content-Type': 'application/json'
        }
    }
    const res = await axios.delete(apiUrl + url, params);
    return res;
}

export const deleteMultipleData = async (url, data ) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
            'Content-Type': 'application/json'
        },
        data: data?.data
    }
    const res = await axios.delete(apiUrl + url, params);
    return res;
}