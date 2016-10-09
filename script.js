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

            resizeBuffer.width  = resizeWidth;                          //canvas�̕����w��
            resizeBuffer.height = resizeHeight;                         //canvas�̍������w��
            resizeBufferContext.drawImage(img,0,0,resizeWidth,resizeHeight);    //canvas�̃T�C�Y�ɍ��킹�ĉ摜��`��
            
            var resizedImage    = resizeBuffer.toDataURL('image/png');  //canvas�̒��g�������o��
            var binary          = makeBinary(resizedImage);             //�����o�������g���o�C�i���ɕϊ�
            var imageUrl        = window.URL.createObjectURL(binary);   //�o�C�i����URL���擾
            download.download   = "romas.png";                          //a�^�O�Ƀ_�E�����[�h���������ăt�@�C�������w��
            download.href       = imageUrl;                             //a�^�O�̃����N���ݒ�
            //output.innerHTML    += imageUrl + "<br>";                         // console
            output.innerHTML    += "<img src='" + resizedImage + "'><br>";      // console
        }
        img.src = reader.result;                // �ǂݍ��񂾉摜��img�ɓn���Ă���B���̌��onload�����������
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
