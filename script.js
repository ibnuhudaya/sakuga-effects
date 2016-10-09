onload = function(){

var output  = document.getElementById("output");                                // console

var imgpost = document.getElementById("selectfile");
var canvas  = document.getElementById("canvas");

imgpost.addEventListener("change",function(evt){
    output.innerHTML += "img uploaded <br>";                                    // console
    var img     = null;
    var file    = evt.target.files;
    var reader  = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function(){
        output.innerHTML    += "img readed <br>";                               // console
        img = new Image();                                              //FileReaderから画像を受け取るImageオブジェクトを作成
        img.onload  = function(){                                       //画像が読み込まれたら実行
            var resizeBuffer    = document.createElement("canvas");     //テクスチャ作成用のcanvas
            var resizeBufferContext = resizeBuffer.getContext("2d");    //canvasのコンテキストを2dにする

            output.innerHTML    += "width  = " + img.width + "<br>";            // console
            output.innerHTML    += "height = " + img.height + "<br>";           // console
            var resizeWidth = sizeexp(img.width);                       //2の累乗の幅を得る
            var resizeHeight= sizeexp(img.height);                      //2の累乗の高さを得る
            output.innerHTML    += "resizeWidth  = " + resizeWidth + "<br>";    // console
            output.innerHTML    += "resizeHeight = " + resizeHeight + "<br>";   // console

            resizeBuffer.width  = resizeWidth;
            resizeBuffer.height = resizeHeight;
            resizeBufferContext.drawImage(img,0,0,resizeWidth,resizeHeight);
            var resizedImage    = resizeBuffer.toDataURL();
            output.innerHTML    += "<img src='" + resizedImage + "'>";          // console
        }
        img.src = reader.result;                // 読み込んだ画像をimgに渡している。この後にonloadが処理される
    };

},false);

};



var sizeexp = function(origin){
    var tmp = 1;
    for(var e=0;tmp<origin;e++){
        tmp *= 2;
    }
    return tmp;
}; 
