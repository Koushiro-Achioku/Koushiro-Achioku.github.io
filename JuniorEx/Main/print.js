$(function(){
    //印刷ボタンをクリックした時の処理
    $('#print-btn').on('click', function(){
    
        //プリントしたいエリアの取得
        var printArea = document.getElementsByClassName("print-area");
        
        //プリント用の要素「#print」を作成し、上で取得したprintAreaをその子要素に入れる。
        $('body').append('<div id="print" class="printBc"></div>');

        $('#rogo_img').css('display','inline');
        $('#signature').css('display','table');

        $(printArea).clone().appendTo('#print');

        //この下に、以降の処理が入ります。
        $('body > :not(#print)').css('display','none');

        window.print();

        $('body > :not(#print)').css('display','inline');
        $('#rogo_img').css('display','none');
        $('#signature').css('display','none');

        $('#print').remove();

    });
});