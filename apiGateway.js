const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const templateProtoPath = 'templateInfo.proto';
const contestpPath = 'contest.proto';


const app = express();
app.use(bodyParser.json());


const templeteProtoDefinition = protoLoader.loadSync(templateProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const contestProtoDefinition = protoLoader.loadSync(contestpPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});


const contestProto = grpc.loadPackageDefinition(contestProtoDefinition).contest;
const templateProto = grpc.loadPackageDefinition(templeteProtoDefinition).template;


const clientTemplates = new templateProto.TemplateService(
  'localhost:50060',
  grpc.credentials.createInsecure()
);

const clientContest = new contestProto.ContestService(
  'localhost:50057',
  grpc.credentials.createInsecure()
);

app.use(cors());



app.listen(3000, () => {
  console.log('API Gateway server is running on port 3000');
});




app.get('/creator/:id', (req, res) => {

  clientTemplates.SearchTemplates({ query: req.params.id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // console.log("fffff");
      res.json(response.ctemplates);
    }
  });
});



app.post('/template', (req, res) => {
  console.log(req.body);
  const { creator, description, language } = req.body;
  clientTemplates.createTemplate({ creator: creator, description: description, language: language }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {

      res.json(response.tocken);
    }
  });
})

// app.put('/templates/:id', (req, res) => {
//   console.log("test");
//   const id = req.params.id;
//   const { title, description } = req.body;
//   clientMovies.updateMovie({ tocken: id, name: title, description: description }, (err, response) => {
//     if (err) {
//       console.log("error in fuck")
//       res.status(500).send(err);
//     } else {
//       res.json(response.movie);
//     }
//   });
//   // console.log(req);
// })


app.delete('/del/:id', (req, res) => {
  const id = req.params.id;
  clientTemplates.DeleteTemplate({ tocken: id }, (err, response) => {
    if (err) {


      res.status(500).send(err);
    } else {
      console.log(response.success);
      res.json(response.success);
    }
  });

})

app.get('/templates/:id', (req, res) => {
  const id = req.params.id;

  clientTemplates.GetTemplate({ tocken: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.template);
    }
  });
});



const request = { includeGym: false };
app.get('/contest', (req, res) => {
  clientContest.GetUpcomingContests(request, (err, response) => {
    console.log(response)
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.contests);
    }
  });
});

