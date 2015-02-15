var fs = require('fs');
var huffman_impl = require('./huffman_impl.js');

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
			var originalname = req.files.encodeFile.originalname;
			var path = req.files.encodeFile.path;
			res.set({
				'Content-Type': 'text/plain; charset=utf-8',
				'Content-Disposition': 'attachment; filename="decode.txt"'
			});
			//Asynchronously read posted file and Decrypt file's content
			fs.readFile(path, {encoding:'utf8'},function (error, data) {
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
	//encrypt
    var charstr1 = $data.split("");
 	var chstr = huffman_impl.executeHuffman($data);
 	var huffmantree = huffman_impl.BuildHuffmanTree(chstr,chstr.length);
    var everystr = huffman_impl.CodeHuffmanTree(huffmantree,chstr.length);
    var charray = huffman_impl.translate(charstr1,chstr,everystr);
	//将huffmantree对象和数据一并加密存储
	var ret = huffman_impl.encrypt_impl(JSON.stringify(huffmantree) + charray);
	
	return ret;
}
//Decrypt string
function Decrypt($data){
	//impl decrypt 
	//decrypt
	var destr = huffman_impl.decrypt_impl($data);
	var i = destr.indexOf(']');
	var huffmantree ;
	var charr ;
	if(i>0){
		//解析解密的字符串
		//解析出huffmantree对象
		huffmantree = JSON.parse(destr.substring(0,i+1));
		//解析出数据
		charr = destr.slice(i+1,destr.length+1);
		//解码huffman，还原成原始数据
		var ret = huffman_impl.decode(charr,huffmantree);
		return ret;
	}else{
		return '';
	}
}
module.exports = huffman;