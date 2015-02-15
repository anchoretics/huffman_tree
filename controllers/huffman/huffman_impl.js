
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '1';
function HuffmanNode(weight,cha){
    this.weight = weight;
    this.cha = cha;
    this.leftchild = 0;
    this.rightchild = 0;
    this.parent = 0;
}
function FalseNode(weight,pos){
    this.weight = weight;
    this.pos = pos;
}
function chastr(strweight,strch){
    this.strweight = strweight;
    this.strch = strch;
}
function BuildHuffmanTree(weights,n){
    var Huffmantreefalse = [];
    var Huffmantreetrue = [];
    //n = weights.length;
    var m = 2*n - 1;
    var count = 0;
    /*初始化*/
    for (var i = 0; i < n; i++) {
        Huffmantreefalse[i] = new FalseNode(weights[i].strweight,i);
        Huffmantreetrue[i] = new HuffmanNode(weights[i].strweight,weights[i].strch);
    }
    for (; i < m; i++) {
        Huffmantreefalse[i] = new FalseNode(Infinity,i);
        Huffmantreetrue[i] = new HuffmanNode(0,0);
    }
    for(i = n;i < m;i++){
        /*Huffmantreefalse.weight.sort(ascOrder);*/
        for(var j = 0; j < Huffmantreefalse.length-1; j++){
            for(var k = j; k < Huffmantreefalse.length-1; k++){
                if(Huffmantreefalse[k].weight > Huffmantreefalse[k+1].weight){
                var temp = new FalseNode(Huffmantreefalse[k+1].weight,Huffmantreefalse[k+1].pos);
                Huffmantreefalse[k+1] = Huffmantreefalse[k];
                Huffmantreefalse[k] = temp;
                }	
            }
        }
        var leftchild = Huffmantreefalse.shift();
        var rightchild = Huffmantreefalse.shift();
        count += 2;
        var l = leftchild.pos;
        var r = rightchild.pos;
        var lw = leftchild.weight;
        var rw = rightchild.weight;
        Huffmantreetrue[l].parent = i;
        Huffmantreetrue[r].parent = i;
        Huffmantreetrue[i].leftchild = l;
        Huffmantreetrue[i].rightchild = r;
        Huffmantreetrue[i].weight = lw + rw;
        Huffmantreefalse[i-count].weight = Huffmantreetrue[i].weight;
    }
    return Huffmantreetrue;
}
function CodeHuffmanTree(Huffmantreetrue,n){
    var everystr = [];
    var cd = [];
    for(var i = 0; i < n; i++){
        var start = n-1;
        for(var c = i,f = Huffmantreetrue[i].parent; f != 0; c = f,f = Huffmantreetrue[f].parent){
            if (Huffmantreetrue[f].leftchild == c) cd[--start] = '0';
            else cd[--start] = '1';
        }
        everystr[i] = strcopy(cd,start);
    }
    return everystr;
}
function strcopy(str,start){
    var s = '';
    for(;str[start];start++){
        s += str[start];
    }
    return s;
}
//function displayHuffmanTree(everystr,strch){
//	document.getElementById("results").value = document.getElementById("results").value + "\n" + strch + "\t"+ everystr;
//}
    //var str = document.getElementById("myID").value;
function translate(charstr,chstr,everystr){
    var charray = [];
    for(var i = 0; i < charstr.length; i++){
        for(var j = 0; j < chstr.length; j++){
            if(charstr[i] == chstr[j].strch){
                charray = charray + "" + everystr[j] + "" + "2";
            }
        }
    }
    return charray;
}
//////translate后可以进行加密解密
function decode(chaarray,huffmantree){
    var eachdecode = "";
    var huffmanstr = "";
    var i = -1,j = 0; 
    var leng = chaarray.length;
    var par = huffmantree.length - 1;
    while(leng > 0){
        eachdecode = "";
        for(i++;i < chaarray.length; i++){
            if(chaarray[i] == 2){
                break;
            }
            eachdecode += chaarray[i] + "";
            leng--;
        }
        leng--;
        //chaarray.splice(0, i);
        var f = par;
        while(!(huffmantree[f].leftchild == 0 && huffmantree[f].rightchild == 0)){
            if(eachdecode[j] == 0){
                f = huffmantree[f].leftchild;
            }
            else f = huffmantree[f].rightchild;
            j++;
        }
        huffmanstr += huffmantree[f].cha;	
        j = 0;
    }
    return huffmanstr;
}
function executeHuffman(str){
    var charstr = str.split("");
    var strweight = [];
    var strch = [];
    var chstr = [];
    var i = 0,j = 0,temp,l = charstr.length;
    while(l > 0){/////////若字符串长度为零则跳出循环
        i = 0;
        strweight[j] = 0;
        strch[j] = charstr[0];
        temp = charstr[0];
        strch[j] = temp;
        while(i != l){
            if(charstr[i] == temp){
                charstr.splice(i,1);
                l--;
                strweight[j]++;
            }
            else i++;
        }
        j++;
    }
    for(var k = 0; k < strweight.length; k++){
        chstr[k] = new chastr(strweight[k],strch[k]);
    }
    return chstr;
}
function encrypt_impl(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}
function decrypt_impl(text){
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}
module.exports = {
    encrypt_impl: encrypt_impl,
    decrypt_impl: decrypt_impl,
    executeHuffman: executeHuffman,
    BuildHuffmanTree: BuildHuffmanTree,
    CodeHuffmanTree: CodeHuffmanTree,
    translate: translate,
    decode: decode
};