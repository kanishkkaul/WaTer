import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Test from './models/Test';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/test');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/test').get((req, res) => {
    Test.find((err, tests) => {
        if(err)
            console.log(err);
        else
            res.json(tests);
    });
});

router.route('/test/:id').get((req, res) => {
    Test.findById(req.params.id, (err, test) => {
        if(err)
            console.log(err);
        else
            res.json(test);
    });
});

router.route('/test/add').post((req,res) => {
    let test = new Test(req.body);
    test.save()
        .then(test => {
            res.status(200).json({'test': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/test/update/:id').post((req,res) => {
    Test.findById(req.params.id, (err,test) => {
        if(!test)
            return next(new Error('Could not load document')); 
        else {
            test.name = req.body.name;
            test.value = req.body.value;
            test.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/test/delete/:id').get((req,res) => {
    Test.findByIdAndRemove({_id: req.params.id}, (err,issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed Succesfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log('Express Server running on port 4000'));