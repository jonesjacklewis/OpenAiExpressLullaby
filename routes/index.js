var express = require('express');
var router = express.Router();
const { Configuration, CreateCompletionRequest, OpenAIApi } = require("openai"); 

/* GET home page. */
router.get('/lullaby/:songTitle/:songArtist', async function(req, res, next) {
  try{
    console.log(req.params);
    const songTitle = req.params["songTitle"];
    const songArtist = req.params["songArtist"];

    console.log(songTitle, songArtist);

    const API_KEY = process.env.API_KEY;
    const configuration = new Configuration({
      organization: "org-8VU7wNPUVwdnjJ7KCCANceSs",
      apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);
  
  
    const completionRequest = {
      model: "text-davinci-003",
      prompt: `Write me a custom lullaby, my favourite song is ${songTitle} by ${songArtist}.`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    }
  
    const response = await openai.createCompletion(completionRequest);
    const text = response.data.choices[0].text;

    return res.json({
      success: true,
      text: text
    });
    
  }catch(e){
    console.error(e);
    return res.json({
      success: false,
      text: e
    });
  }
  

  
});


module.exports = router;
