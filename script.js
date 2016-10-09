onload = function(){

var output  = document.getElementById("output");                                // console

var imgpost = document.getElementById("selectfile");
var canvas  = document.getElementById("canvas");
var download    = document.getElementById("download");
var saveButton  = document.getElementById("save");

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

            resizeBuffer.width  = resizeWidth;                          //canvasの幅を指定
            resizeBuffer.height = resizeHeight;                         //canvasの高さを指定
            resizeBufferContext.drawImage(img,0,0,resizeWidth,resizeHeight);    //canvasのサイズに合わせて画像を描画
            
            var resizedImage    = resizeBuffer.toDataURL('image/png');  //canvasの中身を書き出す
            var binary          = makeBinary(resizedImage);             //書き出した中身をバイナリに変換
            var imageUrl        = window.URL.createObjectURL(binary);   //バイナリのURLを取得
            download.download   = "romas.png";                          //aタグにダウンロード属性をつけてファイル名を指定
            download.href       = imageUrl;                             //aタグのリンク先を設定
            //output.innerHTML    += imageUrl + "<br>";                         // console
            output.innerHTML    += "<img src='" + resizedImage + "'><br>";      // console
        }
        img.src = reader.result;                // 読み込んだ画像をimgに渡している。この後にonloadが処理される
    };

},false);

saveButton.addEventListener("click",function(){
    output.innerHTML    += "button clicked<br>";
    //var download    = document.getElementById("download");
    download.click();
},false);

};



var sizeexp = function(origin){
    var tmp = 1;
    for(var e=0;tmp<origin;e++){
        tmp *= 2;
    }
    return tmp;
};

var makeBinary  = function(base){
    var bin = atob(base.replace(/^.*,/,''));
    var buffer  = new Uint8Array(bin.length);
    for(var i=0;i<bin.length;i++){
        buffer[i] = bin.charCodeAt(i);
    }
    var blob    = new Blob([buffer.buffer],{
        type: "image/png"
    });
    return blob;
}
