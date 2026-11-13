var img = {};
var imgInfo = [];      
var finalImageResize  = "";
	
// REDIMENCIONA A IMAGEM
var resizeImage = function(id, base64, tipo, i, size, parallax){
	var imgCv = new Image();
	imgCv.setAttribute('crossOrigin', 'anonymous'); 
	var canvas;
	var ctx;
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	imgCv.onload = function () {
		/// step 1
		var oc = document.createElement('canvas'),
				octx = oc.getContext('2d');
				wpc = 1-((imgCv.width-finalW)/imgCv.width)/2;
				hpc = 1-((imgCv.height-finalH)/imgCv.width)/2;
		oc.width = imgCv.width *  wpc;
							
		if(parallax){
			var pc = imgCv.height/imgCv.width;
			oc.height = oc.width * pc;
		}else{
			oc.height = imgCv.height * hpc;
		}
		//debugger;
		octx.drawImage(oc, 0,0, oc.width,oc.height);
													
		/// step 2
		//ctx.clearRect(0, 0,300, 250);  
		octx.drawImage(imgCv,0,0,oc.width * wpc,oc.height * hpc);
		
		canvas.width=finalW;
		if(parallax){
		canvas.height=finalW * pc;
		imgInfo[i] = {w:canvas.width,h:canvas.height};
		}else{
			canvas.height=finalH;
		}
				
		console.log("teste")	
		ctx.drawImage(oc,0,0,oc.width * wpc, oc.height * hpc,
									0,0,canvas.width,canvas.height);

		ctx.mozImageSmoothingEnabled = true;
		ctx.webkitImageSmoothingEnabled = true;
		ctx.msImageSmoothingEnabled = true;
		ctx.imageSmoothingEnabled = true;
		finalImageResize = canvas.toDataURL("image/"+tipo,0.8);
		var head = 'data:image/'+tipo+';base64,';
		//console.log(Math.round(size/1024) +'KB'+ " --- " + Math.round(Math.round((finalImageResize.length - head.length)*3/4)/1024)+"KB");
		if(Math.round(size/1024)>Math.round(Math.round((finalImageResize.length - head.length)*3/4)/1024)){
			id.src = finalImageResize;
			img[i] = finalImageResize;
		}else{
			id.src = this.src;
			img[i] = id.src;
		}
					//console.log(i)								
		if(parallax){
			$("#layer_"+i.replace("File","")+" .editPos").addClass("setup");
			setUpModal("layer_"+i.replace("File",""));
		}
	}
	imgCv.src = base64;
}
	// INIT
$(document).ready(function(){       
	
//*Browser*
// deactivate
	$('.nav-pills>li button').attr("disabled","disabled")
	$('.nav-pills>li button').first().removeAttr("disabled")
            
  canvasIMG = document.getElementById("canvas"); 
            
	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};

	// LEITURA DE UM ARQUIVO
	// ELE VAI ADICIONANDO EM  img[] COM BASE NOS IDS DOS CAMPOS DE IMAGEM.
            
	window.readSingleFile = function (i, parallax) {
		console.log(i)
		var files =  document.getElementById(i).files;
		// FileReader support
		if (FileReader && files && files.length) {
			console.log("->imag"+i.replace("File",""));
			var fr = new FileReader();
			fr.onload = function () {
				// document.getElementById("demo"+i).style.backgroundImage = "url('"+fr.result+"')";   
				document.getElementById("demo"+i).src = fr.result;
				const form = fr.result.substring(11, 14).toUpperCase()
				const formJpg = fr.result.substring(11, 15).replace('e','').toUpperCase()
				formato = fr.result.match(/data\:image\/(.*);base.*/)[1];
				formato = formato == 'png' ? form : formJpg

				console.log("----------------------"+formato);
				
				if(parallax) {
					updateVisual();
				}

				base64Resized = resizeImage(document.getElementById("imag"+i.replace("File","")),fr.result, formato, i, files[0].size, parallax);
				macroname = "%%FILE:"+formato+i.replace("File","")+"%%";
				console.log('macroname = '+macroname)
				document.getElementById("imag"+i.replace("File","")).dataset.macroname = macroname;

				$("#demo"+i).parent().attr('title', files[0].name).tooltip('fixTitle');
					
				//
				$("#demo"+i).parent().parent().find("button.btn").removeClass("btn-primary");
				$("#demo"+i).parent().parent().find("button.btn").addClass("btn-warning");
				$("#demo"+i).parent().parent().find("button.btn").html("Editar");
						

				
			
				if(i!="File"+$(".img-thumb").length-1){
					$("#demoFile"+(Number(i.replace("File",""))+1)).parent().parent().find("button.btn").removeAttr("disabled");
					$("#demoFile"+(Number(i.replace("File",""))+1)).parent().parent().find("button.btn").removeClass("btn-default");
					$("#demoFile"+(Number(i.replace("File",""))+1)).parent().parent().find("button.btn").addClass("btn-primary");
					$("#demoFile"+(Number(i.replace("File",""))+1)).parent().parent().find("button.btn").html("Adicionar");
					$("#demoFile"+(Number(i.replace("File",""))+1)).parent().parent().parent().removeClass("opaca");
				}
					
				if($(".img-thumb[data-original-title!='']").length==$(".img-thumb").length  || ($(".img-thumb[data-original-title!='']").length==($(".img-thumb").length-2) && location.href.indexOf("custom.html")!=-1) || ($(".img-thumb[data-original-title!='']").length==($(".img-thumb").length-1) && location.href.indexOf("custom.html")!=-1)){
					$(".bt_ready").removeAttr("disabled");                        
					$(".bt_ready").removeClass("btn-default");
					$(".bt_ready").addClass("btn-primary")
					$(".btn-preview").removeClass("btn-preview").tooltip('destroy');
				}else {                      
					$(".bt_ready").attr("disabled","disabled");
					$(".bt_ready").addClass("btn-default");
					$(".bt_ready").removeClass("btn-primary");
				}
				
				// var numeroImagens = $(".img-thumb[data-original-title!='']").length;
				// $(".image-custom .btn").removeClass('btn-info active');
				// $(".image-custom .img"+numeroImagens+"").addClass('btn-info active');

				var numeroImagens = $(".img-thumb[data-original-title!='']").length;
				$(".image-custom .btn").text(numeroImagens);
				if (numeroImagens > 1) {
					$(".image-custom .btn").addClass('btn-info');
					//$(".image-custom .text-success").show();
				}

				if(parallax){
					
				}
			}
			fr.readAsDataURL(files[0]);
		}

		// Not supported
		else {
				// fallback -- perhaps submit the input to an iframe and temporarily store
				// them on the server until the user's session ends.
		}
	}
          
          
          
          // CONFIGURAÃ§Ã•ES INICIAIS
        
          setConfig();
            
            // PREVIEW
            var timerPreview=0;
            window.preview = function(parallax){
                if(!parallax){

						//start - mensagens se foi adicionado efeito ou não.
						if ($(".custom .action-img.add").length==4) {
							var mensagemEfeitos = "<br><br><div class='alert alert-warning msgImg'><small><strong>Atenção!</strong> Você não adicionou nenhum efeito nas imagens.</small></div>";
						} else if( $(".custom .action-img.add").length > $(".custom .img-thumb[data-original-title='']").length) {
								var mensagemEfeitos = "<br><br><div class='alert alert-warning msgImg'><small><strong>Atenção!</strong> Existem imagens sem efeito.</small></div>";
						} else {
								var mensagemEfeitos = "";
						};
						//end - mensagens se foi adicionado efeito ou não.
						
						document.getElementById('elemCSS').innerHTML = document.getElementById('o_elemCSS').innerHTML;
						document.getElementById('durationCSS').innerHTML = document.getElementById('o_durationCSS').innerHTML;
						
						// Calcula Size:
						var peso = getSize(parallax)+5;
							if(peso>150){
								$("#complete-dialog").find(".modal-title").html("Resultado <span class='label label-danger'>"+peso+"KB</span> "+ mensagemEfeitos +"");
							}else{
								$("#complete-dialog").find(".modal-title").html("Resultado <span class='label label-success'>"+peso+"KB</span> "+ mensagemEfeitos +"");
							}
							
								$('#definitionsScript').html("bannerSize = ["+finalW+","+finalH+"];");
								$('#definitionsScript').append("banners = "+JSON.stringify(banners)+";");
								if(document.getElementById("active-looping").checked!="checked" && document.getElementById("active-looping").checked!=true){
									console.log("sem loop");
									clearInterval(timerPreview);
									initBanner();
								}else{
									console.log("com loop");
									clearInterval(timerPreview);
									initBanner();
									timerPreview = setInterval(function(){initBanner();},20000);
								}
							
						
                        }else{
											updateVisual();
											// const insertPeca = 'data:text/html,' + encodeURIComponent($('#pecaHTML5').html());
											// $("#iframePecaHTML5")[0].src = insertPeca;
											const insertPeca = ($('#pecaHTML5').html());
											$("#iframePecaHTML5")[0].contentWindow.document.open();
											$("#iframePecaHTML5")[0].contentWindow.document.write(insertPeca);
											$("#iframePecaHTML5")[0].contentWindow.document.close();
                        }
            }
            
            // DOWNLOAD DA PEÃ‡A
            
            window.Salvar = function(parallax){
							var zip = new JSZip();
							// $("#box-ad").slideUp(200)
							if(!parallax){
								document.getElementById("elemCSS").innerHTML = document.getElementById("o_elemCSS").innerHTML;
								document.getElementById("durationCSS").innerHTML = document.getElementById("o_durationCSS").innerHTML;
							}
							oldPecaHTML5 = document.getElementById("pecaHTML5").innerHTML;
							newPecaHTML5 = document.getElementById("pecaHTML5");    
							if(!parallax){
								$('#definitionsScript').html("bannerSize = ["+finalW+","+finalH+"];");
								$('#definitionsScript').append("banners = "+JSON.stringify(banners)+";");  
							}    

                  // Para criar pastas:
                  // var img = zip.folder("images");
                  // img.file("smile.gif", imgData, {base64: true});

                  for(i=0;i<Object.size(img);i++){

                      var formato = img["File"+(i+1)].match(/data\:image\/(.*);base.*/)[1];                 
                      zip.file(formato.replace("e","").toUpperCase()+(i+1)+"."+formato.replace("e",""), img["File"+(i+1)].replace("data:image/"+formato+";base64,",""), {base64: true});
                      if($("input[name='destino']:checked").val()=="DFP")
                        newPecaHTML5.getElementsByClassName("imag"+(i+1))[0].src = newPecaHTML5.getElementsByClassName("imag"+(i+1))[0].dataset.macroname;
                      else
                        newPecaHTML5.getElementsByClassName("imag"+(i+1))[0].src = newPecaHTML5.getElementsByClassName("imag"+(i+1))[0].dataset.macroname.replace("%%FILE:","").replace("%%","")+"."+formato.replace("e","");
                      newPecaHTML5.getElementsByClassName("imag"+(i+1))[0].dataset.macroname = "";

                      if(newPecaHTML5.getElementsByClassName("imag"+(i+1)).length>1){
												if($("input[name='destino']:checked").val()=="DFP")
                            newPecaHTML5.getElementsByClassName("imag"+(i+1))[1].src = newPecaHTML5.getElementsByClassName("imag"+(i+1))[1].dataset.macroname;
                        else
                            newPecaHTML5.getElementsByClassName("imag"+(i+1))[1].src = newPecaHTML5.getElementsByClassName("imag"+(i+1))[1].dataset.macroname.replace("%%FILE:","").replace("%%","")+"."+formato.replace("e","");
                        newPecaHTML5.getElementsByClassName("imag"+(i+1))[1].dataset.macroname = "";
                      }
                  }



                html = newPecaHTML5.innerHTML;
								if(!parallax){
									if(document.getElementById("active-looping").checked=="checked" || document.getElementById("active-looping").checked==true)
												html = html.replace("initBanner();","initBanner(); setInterval(function(){initBanner()},20000);");
								}

									zip.file("index.html", html);
									var content = zip.generate({type:"blob"});
								
									setTimeout(function(){document.getElementById("pecaHTML5").innerHTML = oldPecaHTML5;},1000);

                // see FileSaver.js
                saveAs(content, "pecaHTML5.zip");

              }



              window.getSize = function(parallax){


            	var zip = new JSZip();
              // $("#box-ad").slideUp(200)
								
							if(!parallax){
                document.getElementById("elemCSS").innerHTML = document.getElementById("o_elemCSS").innerHTML;
								document.getElementById("durationCSS").innerHTML = document.getElementById("o_durationCSS").innerHTML;
							}
                oldPecaHTML5 = document.getElementById("pecaHTML5").innerHTML;
                newPecaHTML5 = document.getElementById("pecaHTML5");          

                  // Para criar pastas:
                  // var img = zip.folder("images");
                  // img.file("smile.gif", imgData, {base64: true});

                  for(i=0;i<Object.size(img);i++){
                      var formato = img["File"+(i+1)].match(/data\:image\/(.*);base.*/)[1];                 
                      zip.file(formato.replace("e","").toUpperCase()+(i+1)+"."+formato.replace("e",""), img["File"+(i+1)].replace("data:image/"+formato+";base64,",""), {base64: true});
                      if($("input[name='destino']:checked").val()=="DFP")
                        newPecaHTML5.getElementsByClassName("imag"+(i+1))[0].src = newPecaHTML5.getElementsByClassName("imag"+(i+1))[0].dataset.macroname;
                      else
                        newPecaHTML5.getElementsByClassName("imag"+(i+1))[0].src = newPecaHTML5.getElementsByClassName("imag"+(i+1))[0].dataset.macroname.replace("%%FILE:","").replace("%%","")+"."+formato.replace("e","");
                      newPecaHTML5.getElementsByClassName("imag"+(i+1))[0].dataset.macroname = "";

                      if(newPecaHTML5.getElementsByClassName("imag"+(i+1)).length>1){
                        if($("input[name='destino']:checked").val()=="DFP")
                            newPecaHTML5.getElementsByClassName("imag"+(i+1))[1].src = newPecaHTML5.getElementsByClassName("imag"+(i+1))[1].dataset.macroname;
                        else
                            newPecaHTML5.getElementsByClassName("imag"+(i+1))[1].src = newPecaHTML5.getElementsByClassName("imag"+(i+1))[1].dataset.macroname.replace("%%FILE:","").replace("%%","")+"."+formato.replace("e","");
                        newPecaHTML5.getElementsByClassName("imag"+(i+1))[1].dataset.macroname = "";
                      }
                  }

                html = newPecaHTML5.innerHTML;
                zip.file("index.html", html);
                var content = zip.generate({type:"blob"});
                var peso = content.size/1024;               
                document.getElementById("pecaHTML5").innerHTML = oldPecaHTML5;

                return Math.round(peso);

                // see FileSaver.js
                //saveAs(content, "pecaHTML5.zip");

              }

          });

        function checkTemplate(i,e){
            
            document.getElementById('temp1').removeAttribute('checked');
            document.getElementById('temp2').removeAttribute('checked');
            document.getElementById('temp3').removeAttribute('checked');
            //document.getElementById('temp'+i).addAttribute('checked');
            document.getElementById('temp'+i).checked='checked';
            //$(".pointerCursor").removeClass("primary");
            $(".pointerCursor").removeClass("alert");
            $(".pointerCursor").removeClass("alert alert-primary");
            console.log(e.className);
            $(e).addClass("alert alert-primary");
        }


// adicionar tooltip nos botoes de custom e nas imagens    
$(function () {
     $(".custom .add.action-img").tooltip({
         placement: 'top'
         , title: 'Adicionar Efeito'
     });
     $(".custom .action-img").tooltip({
         placement: 'top'
         , title: 'Editar Efeito'
     });

      $(".add .img-thumb").tooltip({
          placement: 'top'
          , title: 'Sem Imagem'
      });

      $(".img-thumb").tooltip({
          placement: 'top'
      });

      $(".image-custom").tooltip({
         placement: 'top'
         , title: 'Total de imagens'
      });

      $(".change-image").tooltip({
         placement: 'top'
         , title: 'Trocar total de imagens'
      });

      

      $("#loop").tooltip({
           placement: 'top'
           , title: 'Ativa a repetição da animação.'
      });

      $(".btn-preview").tooltip({
           placement: 'top'
           , title: 'Para ativar o botão adicione as imagens na timeline.'
      });

     
      

  })
    
    
    /* Adicionar Efeito nos BotÃµes*/
    //declara objeto clicado
    var idAction;
    //declara efeito selecionado
    var nameEffect;
    
    //seleciona botao do efeito da timeline
    $( ".action-img div" ).click(function() {
        idAction = $(this).attr('id');
        nomeVarRemove = $('#'+idAction+'').attr('class').split(" ")[1];
        $('.modal-effects .thumb-animation').removeClass("active");
        $('.modal-effects .'+nomeVarRemove+'').addClass('active');
    });    
    
    /*Selecina o efeito no click do modal*/
    $('.modal-effects .thumb-animation').click(function() {        
        $('.modal-effects .thumb-animation').removeClass("active");
        $(this).addClass("active");
        nameEffect = $(this).attr('class').split(" ")[1];
    });    
    
    /*Adicionar efeito ao botao da timeline ao fechar modal*/
     $('#btn-modal-effect').click(function(){       
        $('#'+idAction+'').removeClass(nomeVarRemove).addClass(nameEffect);
        $('#'+idAction+'').parent('.add').removeClass('add').attr('title', 'Editar Efeito').tooltip('fixTitle');
    });
    
    $('#box-ad').height(finalH);
    $('#box-ad').width(finalW);
    
    $('#complete-dialog > div.modal-dialog').width(parseInt(finalW)+30);
    

    /* Troca Size dos Banners pelo DropDown*/

    $(function(){
        $(".formato_selecionado").text($(".dropdown-menu li a[data-formato='"+window.location.search.replace("?","").replace("#","")+"']").text());
        $(".dropdown-menu li a").click(function(){

            window.location.href = window.location.href.replace(window.location.search,"").replace("#","") + "?" + $(this).data("formato");

        });

    });


/* Adicionar Efeito nos BotÃµes*/
    //declara objeto clicado
    var idAction;
    //declara efeito selecionado
    

     // Zoom

                    s_None = {
                                        to: "center",
                                        alpha: false,
                                        zoomout: false,
                                        zoomin: false
                            };

                    e_ZoomIn = {
                                        from: "center",
                                        alpha: true,
                                        zoomout: false,
                                        zoomin: true
                            };

                    s_ZoomIn = {
                                        to: "center",
                                        alpha: true,
                                        zoomout: false,
                                        zoomin: false
                            };

                   // FadeIn

                    e_FadeIn = {
                                        from: "center",
                                        alpha: true,
                                        zoomout: false,
                                        zoomin: false
                            };

                    // Slide Left

                    e_SlideLeft = {
                                        from: "left",
                                        alpha: false,
                                        zoomout: false,
                                        zoomin: false
                            };
                    s_SlideLeft = {
                                        to: "left",
                                        alpha: false,
                                        zoomout: false,
                                        zoomin: false
                            };

                    // Slide Right

                    e_SlideRight = {
                                        from: "right",
                                        alpha: false,
                                        zoomout: false,
                                        zoomin: false
                            };
                    s_SlideRight = {
                                        to: "right",
                                        alpha: false,
                                        zoomout: false,
                                        zoomin: false
                            };

                    // Slide Top

                    e_SlideTop = {
                                        from: "top",
                                        alpha: false,
                                        zoomout: false,
                                        zoomin: false
                            };
                    s_SlideTop = {
                                        to: "top",
                                        alpha: false,
                                        zoomout: false,
                                        zoomin: false
                            };

                     // Slide Bottom

                    e_SlideBottom = {
                                        from: "bottom",
                                        alpha: false,
                                        zoomout: false,
                                        zoomin: false
                            };
                    s_SlideBottom = {
                                        to: "bottom",
                                        alpha: false,
                                        zoomout: false,
                                        zoomin: false
                            };

    var nameEffect;



    var eventoTransition = [];

    eventoTransition["slide-left"] = [s_SlideRight,e_SlideLeft];
    eventoTransition["slide-right"] = [s_SlideLeft,e_SlideRight];
    eventoTransition["slide-top"] = [s_SlideBottom,e_SlideTop];
    eventoTransition["slide-bottom"] = [s_SlideTop,e_SlideBottom];
    eventoTransition["sobrepor-left"] = [,e_SlideLeft];
    eventoTransition["sobrepor-right"] = [s_None,e_SlideRight];
    eventoTransition["sobrepor-top"] = [s_None,e_SlideTop];
    eventoTransition["sobrepor-bottom"] = [s_None,e_SlideBottom];
    eventoTransition["zoom-in"] = [s_None, e_ZoomIn];
    eventoTransition["zoom-out"] = [s_None, e_ZoomIn];


                    // ELEMENTOS DOS BANNERS
                
                   

                    var bn = [];
                    bn["i"] = {entrada:{},saida:{}};
                    bn["01"] = {entrada:{},saida:{}};
                    bn["12"] = {entrada:{},saida:{}};
                    bn["23"] = {entrada:{},saida:{}};
                    bn["3"] = {entrada:{},saida:s_None};

                    

                    defineTransition = function (pos, s, e){

                        if(pos=="i")
                            s = s_None;

                         console.log(bn[pos]);

                        if(s!=null)
                            bn[pos].saida=s;
                        


                        if(e!=null)
                            bn[pos].entrada=e;
                       

                        banners[0].duration = 3;
                        banners[0].entrada = bn["i"].entrada;
                        banners[0].saida = bn["01"].saida;

                        banners[1].duration = 3;
                        banners[1].entrada = bn["01"].entrada;
                        banners[1].saida = bn["12"].saida;

                        banners[2].duration = 3;
                        banners[2].entrada = bn["12"].entrada;
                        banners[2].saida = bn["23"].saida;

                        banners[3].duration = 3;
                        banners[3].entrada = bn["23"].entrada;
                        banners[3].saida = bn["3"].saida;

                        return bn[pos];
                    }

      

    
    //seleciona botao do efeito da timeline
    $( ".action-img div" ).click(function() {
        idAction = $(this).attr('id');
        nomeVarRemove = $('#'+idAction+'').attr('class').split(" ")[1];
        $('.modal-effects .thumb-animation').removeClass("active");
        $('.modal-effects .'+nomeVarRemove+'').addClass('active');
    });    
    
    /*Selecina o efeito no click do modal*/
    $('.modal-effects .thumb-animation').click(function() {        
        $('.modal-effects .thumb-animation').removeClass("active");
        $(this).addClass("active");
        nameEffect = $(this).attr('class').split(" ")[1];
    });    
    
    /*Adicionar efeito ao botao da timeline ao fechar modal*/
     $('#btn-modal-effect').click(function(){       
        $('#'+idAction+'').removeClass(nomeVarRemove).addClass(nameEffect);
        $('#'+idAction+'').parent('.add').removeClass('add').attr('title', 'Editar Efeito').tooltip('fixTitle');

        defineTransition(ElementTransition, eventoTransition[nameEffect][0], eventoTransition[nameEffect][1]);
    })

    /*Verifica se selecionou o formato */
    $(document).ready(function () {
        if(window.location.href.indexOf("?" || "x") > -1) {
           $('.nav-timeline').slideDown();
        } else {
            $('#alert-formato').slideDown();
            $(".formato_selecionado").text('Selecione o Formato');
        }
        //erro
        if($("#link-formato").length>0){
          $("#link-formato").attr('href',$("#link-formato").attr('href').replace(window.location.search,"") + window.location.search.replace("#",""));
        }
    });

    /* Check Box Loop */

    $('#loop input:checkbox').change(function(){
      if($(this).is(":checked")) {
          $('#loop').addClass("btn-info");
      } else {
          $('#loop').removeClass("btn-info");
      }
  });



    /* popover thumb */
    // $(".img-thumb").mouseenter(function() {
    //     $('this').find('teste').attr("src",'teste');
    //     alert( $('this').find('.teste').attr('src'));
    // });

    // $(function() {
    //     $(".img-thumb")
    //         .mouseover(function() { 
    //             var src = $(this).find('img').attr('src');                
    //             //alert(src);
    //         })
    //         // .mouseout(function() {
    //         //     var src = $(this).attr("src").replace("over.gif", ".gif");
    //         //     $(this).attr("src", src);
    //         // });
    // });

    // $(".img-thumb").popover({ 
    //     title: 'Look! A bird!', 
    //     // trigger: "hover",
    //     placement: 'top',
    //     content: function () {
    //         return '<img src= + src + " />';
    //         }, html:true});