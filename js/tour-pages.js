// Instance the tour
jQuery(document).ready(function($) {
    

var tour2 = new Tour({
    storage: false,
    container: ".container",
    onEnd: function (tour2) {
        stepTour = tour2.getCurrentStep()+1;
        ga('send', 'event', 'Tour Interna', 'End', stepTour);

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
    template: function(i, step) {
        return "<div class='popover tour'><div class='arrow'></div> <h3 class='popover-title bg-info'></h3> <div style='position:absolute; top:6px; right:8px'>"+(tour2.getCurrentStep()+1)+"/"+tour2._options.steps.length+"</div> <div class='popover-content'></div> <div class='popover-navigation'> <div class='btn-group'> <button class='btn btn-sm btn-info' data-role='prev' >« Anterior</button> <button class='btn btn-sm btn-info' data-role='next'>Próximo »</button>  </div> <button class='btn btn-sm btn-success' data-role='end'>OK, entendi!</button> </div>"
    },
    //template: " <div class='popover tour'><div class='arrow'></div> <h3 class='popover-title bg-info'></h3> <div class='popover-content'></div> <div class='popover-navigation'> <div class='btn-group'> <button class='btn btn-sm btn-info' data-role='prev' >« Anterior</button> <button class='btn btn-sm btn-info' data-role='next'>Próximo »</button>  </div> <button class='btn btn-sm btn-success' data-role='end'>OK, entendi!</button> </div>",
    steps: [
    {
        element: ".btn-group:first",
        placement: "top",
        title: "Selecione o formato",
        content: "Antes de começar a editar é necessário<br> escolher o formato da peça."
    },
    {
        element: ".change-image",
        placement: "top",
        title: "Quantidade de Imagens",
        content: "Total de imagem da peça.<br>Alguns templates tem a opção de trocar a quantidade.",
    },
    {
        element: "#loop",
        placement: "left",
        title: "Loop",
        content: "Ativando o loop as peças reiniciam a animação<br> após 20 segundos.",
        onHidden: function (tour2) {
             $(".nav-timeline").slideDown();
             $(".alert").slideUp();
         }
    },
    {
        element: ".nav-timeline",
        placement: "top",
        title: "Timeline",
        content: "A timeline pode ter de 2 a 4 imagens.",
        // onShown: function (tour) {
        //     $(".tour1 .btn").trigger( "click" );
        //     $(".tour1 .dropdown-menu li>a").trigger( "click" );
        // }
    },
    {
        element: ".action-img:first",
        placement: "top",
        title: "Efeitos",
        content: "Os templates tem efeitos pré-configurados.<br>Em custom pode adicionar e editar efeitos.<br>Passe o mouse em cima do item para ver.",        
        //onShown: function (tour2) {$(".action-img:first div").addClass('acti');},
    },
    {
        element: ".content-img:first",
        placement: "top",
        title: "Imagens",
        content: "Adicione as imagens do tamanho do formato selecionado."
    },
    {
        element: ".footer-timeline .pull-left",
        placement: "top",
        title: "Visualizar peça",
        content: "Veja como ficou sua peça antes de fazer o download."
    },
    {
        element: ".footer-timeline .pull-right",
        placement: "top",
        title: "Download da peça",
        content: "Baixe um pacote ZIP completo da sua peça."
    }


]});
// Start the tour


$("#tour2").click(function(){
    tour2.init();
    tour2.restart();
    ga('send', 'event', 'Tour Interna', 'Start');
})

$(".footer-timeline .pull-left .btn").click(function(){
    nomePagina = $(document).attr('title');
    ga('send', 'event', 'Preview', 'Click', nomePagina);
})

$(".footer-timeline .pull-right .btn").click(function(){
    nomePagina = $(document).attr('title');
    ga('send', 'event', 'Download', 'Click', nomePagina);
})


});