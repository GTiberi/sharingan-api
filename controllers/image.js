const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: "b43a7a91e114493baa96475a047bde4d",
});
const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json("Unable to work with API"));
};

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db("users")
		.where({ id })
		.increment("entries", 1)
		.returning("entries")
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json("Unable to update"));
};
module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall,
};
