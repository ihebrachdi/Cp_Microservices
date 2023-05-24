const axios = require('axios');

// Set the API Gateway base URL
const baseURL = 'http://localhost:3000';

// Create an instance of Axios with the base URL
const apiClient = axios.create({
    baseURL,
});


async function createMovie(movie) {
    try {
        const response = await apiClient.post('/movie', movie);
        return response.data;
    } catch (error) {
        console.error('Error creating movie:', error.response.data);
        throw error;
    }
}

async function createTemplate(template) {
    try {
        const response = await apiClient.post('/template', template);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error creating movie:', error.response.data);
        throw error;
    }
}

async function fetchMovieById(id) {
    try {
        const response = await apiClient.get(`/templates/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie:', error.response.data);
        throw error;
    }
}

async function DeleteTemplateByTocken(id) {
    try {
        const response = await apiClient.delete(`/del/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie:', error.response.data);
        throw error;
    }
}
const movieId = '1';

console.log(DeleteTemplateByTocken(movieId));

// axios.delete(`${baseURL}/del/${movieId}`)
//     .then((response) => {

//         console.log(response.data);
//         // Handle the response from the API Gateway
//     })
//     .catch((error) => {
//         console.log("scre");
//         console.error(error);
//         // Handle the error
//     });

    // console.log(delete());

// const movieId = '1';
// const updatedMovieData = {
//     movie_id: movieId,
//     title: 'Updated Movie Title',
//     description: 'Updated movie description.',
// };

// axios.put(`${baseURL}/movies/${movieId}`, updatedMovieData)
//     .then((response) => {
//         console.log(response.data);
//         // Handle the response from the API Gateway
//     })
//     .catch((error) => {
//         console.error(error);
//         // Handle the error
//     });


// axios.delete(`${baseURL}/movies/${movieId}`)
//     .then((response) => {
//         console.log(response.data);
//         // Handle the response from the API Gateway
//     })
//     .catch((error) => {
//         console.error(error);
//         // Handle the error
//     });

// const movieId = '1';
// fetchMovieById(movieId)
//     .then((movie) => {
//         console.log('Movie:', movie);
//     })
//     .catch((error) => {
//         console.error("'Error:', error");
//     });


// const newMovie = {
//     id: '5',
//     title: 'shity Movie',
//     description: 'This is an example movie.',
// };



// createMovie(newMovie)
//     .then((createdMovie) => {
//         console.log('Created Movie:', createdMovie);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });



// const newTemplate = {
//     creator: 'shity Movie',
//     description: 'This is an example movie.',
//     language: 'shity Movie',
// };



// createTemplate(newTemplate)
//     .then((createdTemplate) => {
//         console.log('Created Movie:', createdTemplate);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });