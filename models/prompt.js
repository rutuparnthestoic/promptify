import {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt:{ //Here, required field works this way: [true/false, what happens if required is not meet]
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    }
});

const Prompt = models.Prompt || model('Prompt',PromptSchema);

export default Prompt; 