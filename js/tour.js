
// Instance the tour
var tour = new Tour ({
    storage: false,
    container: ".container",
    template: function(i, step) {
        return "<div class='popover tour'><div class='arrow'></div> <h3 class='popover-title bg-info'></h3> <div style='position:absolute; top:6px; right:8px'>"+(tour.getCurrentStep()+1)+"/"+tour._options.steps.length+"</div> <div class='popover-content'></div> <div class='popover-navigation'> <div class='btn-group'> <button class='btn btn-sm btn-info' data-role='prev' >« Anterior</button> <button class='btn btn-sm btn-info' data-role='next'>Próximo »</button>  </div> <button class='btn btn-sm btn-success' data-role='end'>OK, entendi!</button> </div>"
    },
    //template: " <div class='popover tour'><div class='arrow'></div> <h3 class='popover-title bg-info'></h3> <div class='popover-content'></div> <div class='popover-navigation'> <div class='btn-group'> <button class='btn btn-sm btn-info' data-role='prev' >« Anterior</button> <button class='btn btn-sm btn-info' data-role='next'>Próximo »</button>  </div> <button class='btn btn-sm btn-success' data-role='end'>OK, entendi!</button> </div>",
    
    steps: [
        {
            element: ".tour1",
            placement: "top",
            onShown: function (tour) {$(".tour1 a").trigger( "click" );},
            title: "Templates",
            content: "Aqui você encontra modelos de peças<br> com efeitos pré-definidos."
        },
        {

            element: ".tour2",
            placement: "top",
            title: "Tipos de Templates",
            content: "Cada template tem um efeito diferente."
        },
        {
            element: ".tour3",
            placement: "bottom",
            onShown: function () {$(".preview:first").popover('show');},
            onHidden: function () {$(".preview:first").popover('hide');},
            title: "Preview das peças",
            content: "Aqui você pode ver a peça com a animação real.<br>Basta passar o mouse em cima."
        },

        {
            element: ".tour4",
            placement: "top",
            title: "Custom",
            content: "Crie suas peças e escolha seus efeitos individualmente.",
            onShown: function (tour) {$(".tour4 a").trigger( "click" );},
        },
        {
            element: ".tour5",
            placement: "top",
            onShown: function (tour) {$(".tour3 a").trigger( "click" );},
            title: "(3/9) Exemplo do custom",
            content: "Como mostra a imagem abaixo<br>ao adicionar um efeito abre-se uma janela com <br>os tipos para sua escolha."
        },
        {
            element: ".tour6",
            placement: "top",
            onShown: function (tour) {$(".tour6 a").trigger( "click" );},
            title: "Advanced - EM BREVE!",
            content: "Crie suas peças em uma timeline<br> e defina o tempo de entrada e saída das imagens."
        },
        {
            element: ".tour7",
            placement: "bottom",
            onShown: function (tour) {$(".tour7").addClass('active');},
            onHide: function (tour) {$(".tour7").removeClass('active');},
            title: "Manuais de Formatos",
            content: "Todas informações sobre os formatos e espeficicações."
        },
        {
            element: ".tour8",
            placement: "bottom",
            onShown: function (tour) {$(".tour8").addClass('active');},
            onHide: function (tour) {$(".tour8").removeClass('active');},
            title: "Perguntas frequentes",
            content: "Tire todas suas dúvidas sobre criação aqui."
        },        
        {
            element: ".tour9",
            placement: "bottom",
            onShown: function (tour) {$(".tour9").addClass('active');},
            onHide: function (tour) {$(".tour9").removeClass('active');},
            title: "Sobre o Projeto",
            content: "Conheça a história do projeto, aproveite!"
        }

    ],

    //onShow: function (tour) {},
    onEnd: function (tour) {
        stepTour = tour.getCurrentStep()+1;
        ga('send', 'event', 'Tour Home', 'End', stepTour);

        if(window.location.href.indexOf("?" || "x") > -1) {
        //com formato selecionado
            $('#modalEscape').modal();
           
        } else {
            //sem formato selecionado                 
            $(".nav-timeline").slideUp();
            $(".alert").slideDown();
             $('#modalEscape').modal();
        }
        $('.popover.tour').popover('hide');
       
    },

   
}).init();



// Start the tour with click
$("#tour").click(function(){
    tour.restart();
    ga('send', 'event', 'Tour Home', 'Start');
})





