const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 534af9de3bd341f594d6dd397323db83");

const handleAPICall = (req, res) => {
  stub.PostModelOutputs(
    {
      model_id: "face-detection",
      inputs: [{ data: { image: { url: req.body.imageURL } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        return res.status(400).json("error getting data from clarifai");
      }

      if (response.status.code !== 10000) {
        return res.status(400).json("invalid image input");
      }

      return res.json(response);
    }
  );
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(data => res.json(data[0].entries))
    .catch(err => res.status(400).json("error updating entries"));
};

module.exports = {
  handleImage,
  handleAPICall,
};
