var round = 1;
var game_array = Array(3);

game_array['a'] = Array(3);
game_array['b'] = Array(3);
game_array['c'] = Array(3);

$(document).ready(function () {

    $(document).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            play();
        }
    });

    for (var i = 1; i <= 3; i++) {
        game_array['a'][i] = 0
        game_array['b'][i] = 0
        game_array['c'][i] = 0
    }

    $('#play').click(function () {
        play();

    });

    $('#btn_restart').click(function () {
        window.location.href = 'index.html';
    });


    $('.check').click(function () {
        var id_click = this.id;
        $('#' + id_click).off();
        shoot(id_click);
    });

    function play() {
        var nick1 = $('#nick1').val();
        var nick2 = $('#nick2').val();
        if (nick1 != '' && nick2 != '') {
            $('#menu').fadeOut("fast","linear",function(){
                $('#stage').fadeIn("slow","linear");
            });
            $('#name1').html(nick1);
            $('#name2').html(nick2);

        } else {
            alert('Please, fill all the inputs.');
            return false;
        }
    }

    function shoot(id) {
        var image = '';
        var point = 0;

        if (round % 2 != 0) {
            point = -1;
            image = 'url("./img/x1.png")'
        } else {
            point = 1;
            image = 'url("./img/o12.png")'
        }

        round++;

        $('#' + id).css('background-image', image);
        var row = id.substring(0, 1);
        var column = id.substring(2, 1);

        game_array[row][column] = point;

        check_sum();
    }

    function check_sum() {
        var sum = 0;
        for (var i = 1; i <= 3; i++) {
            sum = sum + game_array['a'][i];
        }
        winner(sum);

        var sum = 0;
        for (var i = 1; i <= 3; i++) {
            sum = sum + game_array['b'][i];
        }
        winner(sum);

        var sum = 0;
        for (var i = 1; i <= 3; i++) {
            sum = sum + game_array['c'][i];
        }
        winner(sum);

        for (var i = 1; i <= 3; i++) {
            var sum = 0;
            sum = sum + game_array['a'][i];
            sum = sum + game_array['b'][i];
            sum = sum + game_array['c'][i];
            winner(sum);
        }

        var sum = 0;
        sum = sum + game_array['a'][1];
        sum = sum + game_array['b'][2];
        sum = sum + game_array['c'][3];
        winner(sum);

        var sum = 0;
        sum = sum + game_array['a'][3];
        sum = sum + game_array['b'][2];
        sum = sum + game_array['c'][1];
        winner(sum);

    }

    function winner(sum) {
        if (sum == -3) {
            alert($('#nick1').val() + ' win!');
            $('.check').off();
            $('#btn_restart').css('display', 'inherit');

        }
        if (sum == 3) {
            alert($('#nick2').val() + ' win!');
            $('.check').off();
            $('#btn_restart').css('display', 'inherit');
        }
    }



});