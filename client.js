const axios = require('axios');

// Set the API Gateway base URL
const baseURL = 'http://localhost:3000';

// Create an instance of Axios with the base URL
const apiClient = axios.create({
    baseURL,
});




async function createTemplate(template) {
    try {
        const response = await apiClient.post('/template', template);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error creating template:', error.response.data);
        throw error;
    }
}


const newTemplate = {
    creator: 'iheb',
    description: 'include <iostream>\n\nint main() {\n    // Write your code here\n    return 0;\n}',
    language: 'C++',
};


createTemplate(newTemplate)
    .then((createdTemplate) => {
        console.log('Created Template:', createdTemplate);
    })
    .catch((error) => {
        console.error('Error:', error);
    });


async function fetchTemplatesById(id) {
    try {
        const response = await apiClient.get(`/templates/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching templates:', error.response.data);
        throw error;
    }
}
const tempTocken = '1';
console.log(fetchTemplatesById(tempId));

async function DeleteTemplateByTocken(id) {
    try {
        const response = await apiClient.delete(`/del/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching templates:', error.response.data);
        throw error;
    }
}


// console.log(DeleteTemplateByTocken(tempTocken));





