const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProgramSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  tracks: [
    {
      title: String,
      audioUrl: String,
    },
  ],
});

const Program = mongoose.model("Program", ProgramSchema);

app.get("/health",(req,res)=>{
    res.send("Healthy");
});

app.get("/programs", async (req, res) => {
  const programs = await Program.find();
  res.json(programs);
});

app.get("/programs/:id", async (req, res) => {
  const program = await Program.findById(req.params.id);
  res.json(program);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
