'use strict';

$(function() {
    // ドロワー
    $('.drawer').drawer();

    // スムーススクロール
    $('a[href^="#"]').on('click', function() {
        // #js-headerがついた要素の高さを取得
        let header = $('#js-header').innerHeight();
        // 移動速度を指定（ミリ秒）
        let speed = 300;
        // hrefで指定されたidを取得
        let id = $(this).attr("href");
        // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
        let target = $("#" == id ? "html" : id);
        // ページのトップを基準にターゲットの位置を取得
        let position = $(target).offset().top - header;
        // ターゲットの位置までspeedの速度で移動
        $("html, body").animate(
            {
                scrollTop: position
            },
            speed
        );
        return false;
    });

    // wow
    new WOW().init();

    // google form
    // contactの送信の挙動
    let $form = $('#js-form');
    $form.submit(function(e) { 
        $.ajax({ 
            url: $form.attr('action'), 
            data: $form.serialize(), 
            type: "POST", 
            dataType: "xml", 
            statusCode: { 
                0: function() { 
                    //送信に成功したときの処理 
                    $form.slideUp();
                    $('#js-success').slideDown();
                }, 
                200: function() { 
                    //送信に失敗したときの処理 
                    $form.slideUp();
                    $('#js-error').slideDown();
                }
            } 
        });
        return false; 
    }); 

    // formの入力確認
    let $submit = $('#js-submit');
    // #js-submitのinputまたは#js-formのtextareaが変更された時の処理
    $('#js-form input, #js-form textarea').on('change', function() {
        // 全ての必須項目が入力されていたら$submitの色が変わる処理
        if(
            // #js-formのtype="text"があるinputのvalueが空ではない時、且つ、
            $('#js-form input[type="text"]').val() !== "" &&
            // #js-formのtype="email"があるinputのvalueが空ではない時、且つ、
            $('#js-form input[type="email"]').val() !== "" &&
            // #js-formのname="entry.1250616051"があるinputがチェックされている時、且つ、
            $('#js-form input[name="entry.1250616051"]').prop('checked') === true &&
            // #js-formのname="entry.1355243199"があるtextareaのvalueが空ではない時
            $('#js-form textarea[name="entry.1355243199"]').val() !== ""
        ) {
            // 全ての必須項目が入力された時
            // disabled属性をfalseにする
            $submit.prop('disabled', false);
            $submit.addClass('-active'); 
        } else {
            // 必須項目が入力されていない時
            // disabled属性をtrueにする
            $submit.prop('disabled', true);
            $submit.removeClass('-active');
        }
    });
});
