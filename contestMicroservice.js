const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const axios = require('axios');

const contestpPath = 'contest.proto';
const packageDefinition = protoLoader.loadSync(contestpPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});



const contestProto = grpc.loadPackageDefinition(packageDefinition).contest;

const contestService = {
    getUpcomingContests: (call, callback) => {
        const includeGym = call.request.includeGym;

        fetchUpcomingContests(includeGym)
            .then(contests => {
                const response = { contests };
                callback(null, response);
            })
            .catch(error => {
                callback(error);
            });
    }

};



function fetchUpcomingContests(includeGym) {
    const apiUrl = 'https://codeforces.com/api/contest.list';

    return new Promise((resolve, reject) => {
        axios.get(apiUrl)
            .then(response => {
                const contestsData = response.data;

                if (contestsData.status === 'OK') {
                    const contests = contestsData.result.filter(contest => contest.phase === 'BEFORE' && (!contest.gym || includeGym));
                    resolve(contests);
                } else {
                    throw new Error('Failed to fetch contests');
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

const server = new grpc.Server();
server.addService(contestProto.ContestService.service, contestService);
const port = 50057;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Failed to bind server:', err);
        return;
    }

    console.log(`Server is running on port ${port}`);
    server.start();
});
console.log(`Movie microservice running on port ${port}`);



