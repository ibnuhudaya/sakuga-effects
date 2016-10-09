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
        img = new Image();                                              //FileReader����摜���󂯎��Image�I�u�W�F�N�g���쐬
        img.onload  = function(){                                       //�摜���ǂݍ��܂ꂽ����s
            var resizeBuffer    = document.createElement("canvas");     //�e�N�X�`���쐬�p��canvas
            var resizeBufferContext = resizeBuffer.getContext("2d");    //canvas�̃R���e�L�X�g��2d�ɂ���

            output.innerHTML    += "width  = " + img.width + "<br>";            // console
            output.innerHTML    += "height = " + img.height + "<br>";           // console
            var resizeWidth = sizeexp(img.width);                       //2�̗ݏ�̕��𓾂�
            var resizeHeight= sizeexp(img.height);                      //2�̗ݏ�̍����𓾂�
            output.innerHTML    += "resizeWidth  = " + resizeWidth + "<br>";    // console
            output.innerHTML    += "resizeHeight = " + resizeHeight + "<br>";   // console

            resizeBuffer.width  = resizeWidth;
            resizeBuffer.height = resizeHeight;
            resizeBufferContext.drawImage(img,0,0,resizeWidth,resizeHeight);
            var resizedImage    = resizeBuffer.toDataURL();
            output.innerHTML    += "<img src='" + resizedImage + "'>";          // console
        }
        img.src = reader.result;                // �ǂݍ��񂾉摜��img�ɓn���Ă���B���̌��onload�����������
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
