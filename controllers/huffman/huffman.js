var fs = require('fs');
var huffman = {
	//
	encode: function(req, res){
		//if posted encodeString is not null,then do Encoding & send to Client
		if(req.body.encodeString){
			var encodeString = req.body.encodeString;
			//set HTTP Header,then u can send encrypt string as a file named 'encode.txt', in this demo
			res.set({
				'Content-Type': 'text/plain',
				'Content-Disposition': 'attachment; filename="encode.txt"'
			});
			//encrypt string here,such as :
			encodeString = Encrypt(encodeString);
			//send encoded string
			res.send(encodeString);
		}else{
			res.redirect('/');
		}
	},
	//
	decode: function(req, res){
		if(req.files.encodeFile){
			console.dir(req.files);
			var originalname = req.files.encodeFile.originalname;
			var path = req.files.encodeFile.path;
			res.set({
				'Content-Type': 'text/plain',
				'Content-Disposition': 'attachment; filename="decode.txt"'
			});
			//Asynchronously read posted file and Decrypt file's content
			fs.readFile(path, function (error, data) {
				if (error) res.render('error',{error: error,message: 'Error happend when decode :'});
				//decrypt data here
				data = Decrypt(data);
				//send decrypted data
				res.send(data);
			});
		}else{
	    	res.redirect('/');
		}
	}
};
//Encrypt string
function Encrypt($data){
	//impl encrypt 
	//...
	return '--encoded--\n' + $data;
}
//Decrypt string
function Decrypt($data){
	//impl decrypt 
	//...
	return '--decoded--\n' + $data;
}
module.exports = huffman;