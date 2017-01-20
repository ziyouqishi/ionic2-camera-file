import { Component } from '@angular/core';

import { Platform, ActionSheetController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {NgZone} from 'angular2/core';
import { Camera } from 'ionic-native';
import { Transfer } from 'ionic-native';
import { FileUploadOptions } from 'ionic-native';


@Component({
  templateUrl: 'basic.html'
})
export class BasicPage {
/*  constructor(public platform: Platform, public actionsheetCtrl: ActionSheetController) {

  }*/

  loginForm: FormGroup;
  tieluxian: any;
  tieluzhan: any;
  shangbaoren: any;
  gonglibiao: any;
  shijianmiaoshu:any;
  public path;
  /*profilePicture: any = "https://www.gravatar.com/avatar/";*/
  //给image设置默认的图片
  profilePicture: any="assets/img/live.jpg";


  

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      /**
       * 表单的操作，方括号里面的参数是对输入的要求
       */
      tieluxian: ['', Validators.compose([Validators.minLength(1),, Validators.required])],
      tieluzhan: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      shangbaoren: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      gonglibiao: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      shijianmiaoshu: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    })

    this.tieluxian = this.loginForm.controls['tieluxian'];
    this.tieluzhan = this.loginForm.controls['tieluzhan'];
    this.shangbaoren = this.loginForm.controls['shangbaoren'];
    this.gonglibiao = this.loginForm.controls['gonglibiao'];
    this.shijianmiaoshu = this.loginForm.controls['shijianmiaoshu'];

  /*  this.zone = ngzone;
    this.image = null;*/
  }

  /**
   * 表达提交的方法名和html总标签中写得要一样，通过value，可以得表达里面输入的值
   * @param value
   */
  login(value) {
    var tielu=value.tieluxian;
    alert(tielu);
    const fileTransfer = new Transfer();
    /**
     * 上传文件时携带参数，这个是可选项。
     */
    var options: any;
    options = {
      fileKey: 'file',
      fileName: 'name.jpg',
      /*value1: "&reporter=" + "12306" + "&desc="
      + "test" + "&railwaybureau=057"
      + "&spot= " + "&railwaystation= "
      + "&railwayline= " + "&kmdesc= ",*/
      reporter:value.shangbaoren,
      desc:value.shijianmiaoshu,
      railwaybureau:"参数",
      spot:"ok",
      railwaystation:value.tieluzhan,
      railwayline:"railwayline",
      kmdesc:value.gonglibiao,
      headers: {}
  }
    var reqUri = "http://10.28.0.210:8080/uploadCenter.jsp";
    //第一个参数是文件的路径，第二个参数是服务器的url，第二个参数也可以是encodeURI(reqUri)
    fileTransfer.upload(this.path, reqUri, options).then((data) => {
      alert("正在上传");
        }, (err) => {
      alert("出错啦");
        });
  }







  takePhoto() {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery

      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      saveToPhotoAlbum:true,
      sourceType:Camera.PictureSourceType.CAMERA,//拍照时，此参数必须有，否则拍照之后报错，照片不能保存

      correctOrientation: true  //Corrects Android orientation quirks
    }
    /**
     * imageData就是照片的路径，关于这个imageData还有一些细微的用法，可以参考官方的文档。
     */
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      this.path = base64Image;//给全局的文件路径赋值。
      this.profilePicture=base64Image;//给image设置source。
      alert(this.path);

    /*  this.zone.run(() => this.image = base64Image);*/
    }, (err) => {
      // Handle error，出错后，在此打印出错的信息。
      alert( err.toString());
    });
  }
  choosePhoto() {


    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,//0对应的值为PHOTOLIBRARY ，即打开相册
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      this.path = base64Image;
      this.profilePicture=base64Image;
      alert(base64Image);
    }, (err) => {
      // Handle error
    });

  }
  chooseVideo() {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,
      mediaType: 1,//为1时允许选择视频文件
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      this.path = base64Image;
      this.profilePicture="assets/img/video.png";//选择视频后，image另外显示一张图片，目前还无法获取视频的第一帧图片。
      alert(this.path);
    }, (err) => {
      // Handle error
    });

  }

  test(){

  }

  logForm() {

  }




}
