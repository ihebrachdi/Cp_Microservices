const grpc = require('@grpc/grpc-js');
const { log } = require('@grpc/grpc-js/build/src/logging');
const protoLoader = require('@grpc/proto-loader');

const templateProtoPath = 'templateInfo.proto';
const templeteProtoDefinition = protoLoader.loadSync(templateProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const templateProto = grpc.loadPackageDefinition(templeteProtoDefinition).template;


function generateRandomString() {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const templates = [
  {
    id: '1',
    creator: 'iheb',
    description: 'This is the first example movie.',
    language: 'cpp',
  },
  {
    id: '2',
    creator: 'Example Movie 1',
    description: 'This is the first example movie.',
    language: 'cpp',
  },

];

const templateService = {
  getTemplate: (call, callback) => {
    // console.log(call);
    const foundObject = templates.find(obj => obj.id === call.request.tocken);
    const template = {
      id: call.request.tocken,
      creator: foundObject.creator,
      description: foundObject.description,
      language: foundObject.language,

    };
    callback(null, { template });
  },
  searchTemplates: (call, callback) => {

    const { query } = call.request;
    const [name, lang] = query.split('-');

    const ctemplates = templates.filter(template => { return template.creator === name && template.language === lang });
    // console.log(templates);
    callback(null, { ctemplates });
  },

  createTemplate: (call, callback) => {
    const { query } = call.request;
    // console.log(call.request);
    const temp = {
      id: generateRandomString(),
      creator: call.request.creator,
      description: call.request.description,
      language: call.request.language,
    };
    // console.log(template);
    const tocken = {
      tocken: temp.id,
    }
    templates.push(temp);
    console.log(tocken);
    callback(null, tocken);
  },
  deleteTemplate: (call, callback) => {
    // console.log(call.request);
    const query = call.request;
    // console.log(query.tocken);
    r = false;
    for (let i = templates.length - 1; i >= 0; i--) {
      if (templates[i].id === query.tocken) {
        templates.splice(i, 1);
        r = true;
      }
    }
    const success = {
      success: true,
    }
    callback(null, { success });
  },

};


const server = new grpc.Server();
server.addService(templateProto.TemplateService.service, templateService);
const port = 50060;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }

  console.log(`Server is running on port ${port}`);
  server.start();
});
console.log(`Movie microservice running on port ${port}`);
