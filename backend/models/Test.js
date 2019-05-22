import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Test = new Schema({
    time: {
        type : String
    },
    value: {
        type: Number
    },
    tag: {
        type: String
    },
    units: {
        type: String
    },
    message: {
        type: Number
    },
    system_ID: {
        type: Number
    }
});

export default mongoose.model('Test', Test);

