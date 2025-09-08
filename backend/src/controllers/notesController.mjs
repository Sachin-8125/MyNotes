import notesModel from "../models/notesModel.mjs";  

const getNotes = async (req, res) => {
    try {
        // Assume authentication middleware sets req.token.id to the logged-in user's id
        const userId = req.token?.id;
        if (!userId) {
            return res.status(401).send({ success: false, message: "Unauthorized: user id missing" });
        }
        const notes = await notesModel.find({ userId });
        return res.status(200).send({
            success: true,
            message: "Notes fetched successfully",
            notes
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createNote = async(req,res) => {
    try {
       const userId = req.token?.id;
       if (!userId) {
           return res.status(401).send({ success: false, message: "Unauthorized: user id missing" });
       }
       let data = req.body;
       data.userId = userId;
       let note = await notesModel.create(data);
       return res.status(201).send({
        success: true,
        message: "Note created successfully",
        note
       });
    } catch (error) {
        res.status(500).json({message: error.message });
    }
}

const updateNote = async(req,res) => {
    const note = await notesModel.findByIdAndUpdate(req.params.id, req.body, {new: true});  
     return res.status(201).send({
        success: true,
        message: "Note updated successfully",
        note
    });
}

const deleteNote = async(req,res) => {
    await notesModel.findByIdAndDelete(req.params.id);
     return res.status(201).send({
        success: true,
        message: "Note deleted successfully",
       });
}

export {getNotes, createNote, updateNote, deleteNote};