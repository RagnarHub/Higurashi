check_time();
let storage_data = localStorage.getItem('data');
if (!storage_data) {
    startpage_render();
} else {
    workarea_render(true);
    forced_render(storage_data);
}



function check_time() {
    Time = new Date();
    let hour = Time.getHours();

    if (hour < 6 || hour >= 22) {
        document.querySelector('#workarea').className = 'workarea-night';
    }
    else if (hour >= 6 && hour < 10 || hour > 17 && hour < 22) {
        document.querySelector('#workarea').className = 'workarea-sunset';
    }
    else {
        document.querySelector('#workarea').className = 'workarea-day';
    }
}

function startpage_render() {
    let workarea = document.querySelector('#workarea');
    workarea.style.opacity = "1.0";

    let layer = document.querySelector('#layer');
    layer.style.display = 'block';
    let modal = document.createElement('div');
    modal.id = "modal-settings";

    let modal_top = document.createElement('div');
    modal_top.id = "modal-settings-top";
    modal_top.innerHTML = "Настройки игры";
    modal.append(modal_top);


    let modal_center = document.createElement('div');
    modal_center.id = "modal-settings-center";
    modal.append(modal_center);


    let modal_center_players = document.createElement('div');
    modal_center_players.id = "modal-center-players";
    modal_center.append(modal_center_players);

    let players_selector_desc_container = document.createElement('div');
    players_selector_desc_container.id = "players-selector-desc-container";
    modal_center_players.append(players_selector_desc_container);

    let players_selector_desc = document.createElement('div');
    players_selector_desc.id = "players-selector-desc";
    players_selector_desc.innerHTML = 'Количество игроков';
    players_selector_desc_container.append(players_selector_desc);


    let players_selector_container = document.createElement('div');
    players_selector_container.id = "players-selector-container";
    modal_center_players.append(players_selector_container);

    let players_selector = document.createElement('select');
    players_selector.id = "players-selector";
    players_selector_container.append(players_selector);

    for (let i = 2; i <= 7; i++) {
        let i_text = '';
        if (i == 1) {
            i_text = i + ' игрок';
        } else if (i >= 2 && i <= 4) {
            i_text = i + ' игрока';
        } else {
            i_text = i + ' игроков';
        }
        let players_option = document.createElement('option');
        players_option.value = i;
        players_option.className = "players-selector";
        players_option.innerHTML = i_text;
        if (i == 7) {
            players_option.selected = "selected";
        }
        players_selector.append(players_option);
    }
    players_selector.className = "players-selector";


    let modal_center_maxscore = document.createElement('div');
    modal_center_maxscore.id = "modal-center-maxscore";
    modal_center.append(modal_center_maxscore);

    let maxscore_selector_desc_container = document.createElement('div');
    maxscore_selector_desc_container.id = "maxscore-selector-desc-container";
    modal_center_maxscore.append(maxscore_selector_desc_container);

    let maxscore_selector_desc = document.createElement('div');
    maxscore_selector_desc.id = "maxscore-selector-desc";
    maxscore_selector_desc.innerHTML = 'Счет для победы';
    maxscore_selector_desc_container.append(maxscore_selector_desc);


    let maxscore_selector_container = document.createElement('div');
    maxscore_selector_container.id = "maxscore-selector-container";
    modal_center_maxscore.append(maxscore_selector_container);

    let maxscore_selector = document.createElement('select');
    maxscore_selector.id = "maxscore-selector";
    maxscore_selector_container.append(maxscore_selector);

    let maxscores = [1, 3, 5, 7, 10, 15, 20, 25, 50];
    for (let score of maxscores) {
        let score_text = '';
        if (score == 1) {
            score_text = score + ' очко';
        } else if (score >= 2 && score <= 4) {
            score_text = score + ' очка';
        } else {
            score_text = score + ' очков';
        }
        let maxscore_option = document.createElement('option');
        maxscore_option.value = score;
        maxscore_option.className = "maxscore-selector";
        maxscore_option.innerHTML = score_text;
        if (score == 3) {
            maxscore_option.selected = "selected";
        }
        maxscore_selector.append(maxscore_option);
    }
    maxscore_selector.className = "maxscore-selector";


    let modal_center_name = document.createElement('div');
    modal_center_name.id = "modal-center-name";
    modal_center.append(modal_center_name);

    let name_selector_desc_container = document.createElement('div');
    name_selector_desc_container.id = "name-selector-desc-container";
    modal_center_name.append(name_selector_desc_container);

    let name_selector_desc = document.createElement('div');
    name_selector_desc.id = "name-selector-desc";
    name_selector_desc.innerHTML = 'Имя игрока';
    name_selector_desc_container.append(name_selector_desc);


    let name_selector_container = document.createElement('div');
    name_selector_container.id = "name-selector-container";
    modal_center_name.append(name_selector_container);

    let name_selector = document.createElement('input');
    name_selector.id = "name-selector";
    name_selector.value = "Новенький";
    name_selector.maxLength = 10;
    name_selector_container.append(name_selector);


    let modal_center_punishment = document.createElement('div');
    modal_center_punishment.id = "modal-center-punishment";
    modal_center.append(modal_center_punishment);

    let punishment_selector_desc_container = document.createElement('div');
    punishment_selector_desc_container.id = "punishment-selector-desc-container";
    modal_center_punishment.append(punishment_selector_desc_container);

    let punishment_selector_desc = document.createElement('div');
    punishment_selector_desc.id = "punishment-selector-desc";
    punishment_selector_desc.innerHTML = 'Наказание для проигравшего';
    punishment_selector_desc_container.append(punishment_selector_desc);


    let punishment_selector_container = document.createElement('div');
    punishment_selector_container.id = "punishment-selector-container";
    modal_center_punishment.append(punishment_selector_container);

    let punishment_selector = document.createElement('textarea');
    punishment_selector.id = "punishment-selector";
    punishment_selector.value = "Отдать свой обед победителю";
    punishment_selector.maxLength = 120;
    punishment_selector_container.append(punishment_selector);


    let modal_bottom = document.createElement('div');
    modal_bottom.id = "modal-settings-bottom";
    modal.append(modal_bottom);

    let modal_center_controls = document.createElement('div');
    modal_center_controls.className = "modal-center-control";
    modal_bottom.append(modal_center_controls);

    let settings_apply_button = document.createElement('button');
    settings_apply_button.id = "settings-apply-button";
    settings_apply_button.className = "modal-button";
    settings_apply_button.textContent = "Начать!";
    settings_apply_button.onclick = settings_apply_button_click;
    modal_center_controls.append(settings_apply_button);

    layer.append(modal);
}

function settings_apply_button_click() {
    let player_selector = document.querySelector('#players-selector');
    let players = +player_selector.value;
    let maxscore_selector = document.querySelector('#maxscore-selector');
    let maxscore = +maxscore_selector.value;
    let name_selector = document.querySelector('#name-selector');
    let name = name_selector.value;
    let punishment_selector = document.querySelector('#punishment-selector');
    let punishment = punishment_selector.value;
    if (!name) {
        name = 'Новенький';
    }
    if (!punishment) {
        punishment = 'Ничего не делать';
    }

    let layer = document.querySelector('#layer');
    layer.style.display = 'none';
    while (layer.firstChild) {
        layer.removeChild(layer.firstChild);
    }

    set_data(players, name, maxscore, punishment);
    workarea_render(false);
    show_rules();
}

function workarea_render(forced_render) {
    let data = get_data();

    Time = new Date();
    let hour = Time.getHours();
    if ((hour < 6 || hour >= 22) && data.round > 1 && data.special_mode != true && !forced_render) {
        let random_value = Math.floor(Math.random() * 100);
        let sr_chanse = 2;
        if (hour >= 2 && hour < 4) {
            let sr_chanse = 6;
        } else if (hour < 6) {
            let sr_chanse = 4;
        }
        if (random_value < sr_chanse) {
            data.special_mode = true; //запуск спец. режима
        }
    }

    let top_container = document.querySelector('#top-container-area');
    let left_container = document.querySelector('#left-container-area');
    let right_container = document.querySelector('#right-container-area');
    let bottom_container = document.querySelector('#bottom-container-area');

    let main_page = document.querySelector('#main-page');
    let workarea = document.querySelector('#workarea');
    if (data.special_mode) {
        main_page.style.backgroundImage = "url('images/bg/eye.jpg')";
        main_page.classList.add('bg-cover');
        let main_page_class_name = workarea.classList[0];
        workarea.classList.add(main_page_class_name + '-opacity');
        workarea.classList.remove(main_page_class_name);
    } else {
        main_page.style.backgroundImage = "url('images/bg/main_page.jpg')";
        main_page.classList.remove('bg-cover');
        check_time();
    }

    let cards_info = get_cards_info(data.user_name);
    let min_score = false;
    let max_score = false;
    let min_score_players = [];
    let max_score_players = [];
    for (let player_key in data.players_data) {
        player = data.players_data[player_key];
        if (min_score === false) {
            min_score = player.score;
        }
        if (max_score === false) {
            max_score = player.score;
        }
        if (player.score < min_score) {
            min_score = player.score;
            min_score_players = [player_key];
        } else if (player.score == min_score) {
            min_score_players.push(player_key);
        }
        if (player.score > max_score) {
            max_score = player.score;
            max_score_players = [player_key];
        } else if (player.score == max_score) {
            max_score_players.push(player_key);
        }
    }
    let score_diff = max_score - min_score;
    let behind_players = [];
    let leading_players = [];
    if (data.players_amount == 7 || data.players_amount == 6) {
        if (min_score_players.length == 1) {
            behind_players = min_score_players;
        } else if (min_score_players.length == 2 && score_diff >= 2) {
            behind_players = min_score_players;
        } else if (min_score_players.length == 3 && score_diff >= 3) {
            behind_players = min_score_players;
        }
        if (max_score_players.length == 1) {
            leading_players = max_score_players;
        } else if (max_score_players.length == 2 && score_diff >= 2) {
            leading_players = max_score_players;
        } else if (max_score_players.length == 3 && score_diff >= 3) {
            leading_players = max_score_players;
        }
    } else if (data.players_amount == 5) {
        if (min_score_players.length == 1) {
            behind_players = min_score_players;
        } else if (min_score_players.length == 2 && score_diff >= 2) {
            behind_players = min_score_players;
        }
        if (max_score_players.length == 1) {
            leading_players = max_score_players;
        } else if (max_score_players.length == 2 && score_diff >= 2) {
            leading_players = max_score_players;
        }
    } else if (data.players_amount == 4 || data.players_amount == 3) {
        if (min_score_players.length == 1) {
            behind_players = min_score_players;
        }
        if (max_score_players.length == 1) {
            leading_players = max_score_players;
        }
    } else if (data.players_amount == 2) {
        if (min_score_players.length == 1 && score_diff >= 2) {
            behind_players = min_score_players;
        }
        if (max_score_players.length == 1 && score_diff >= 2) {
            leading_players = max_score_players;
        }
    }

    for (let player_key in data.players_data) {
        player = data.players_data[player_key];
        if (player.type == "user") {
            let card_pos_min = 9;
            let card_pos_dist = 60;
            if (data.players_amount == 4 && data.players_amount == 5) {
                card_pos_min = 0;
                card_pos_dist = 78;
            } else if (data.players_amount <= 3) {
                card_pos_min = -25;
                card_pos_dist = 128;
            }
            let user_cards = data.players_data.user1.cards;
            for (let i = 1; i <= data.cards_info.each_player; i++) {
                let card = document.createElement('div');
                card.className = "card bottom-card own-card";
                let card_pos = card_pos_min + (i - 1) * (Math.floor((card_pos_dist / (data.cards_info.each_player - 1)) * 100) / 100);
                card.style.left = card_pos + "%";

                let card_key = i - 1;
                let card_img = document.createElement('img');
                card_img.src = "images/cards/" + user_cards[card_key] + ".png";
                /*
                if (cards_info[user_cards[card_key]]['id'] == "user1") {
                    let user_card_name = document.createElement('div');
                    user_card_name.className = "user-card-name";
                    user_card_name.innerHTML = "Юзер";
                    user_card_name.style['z-index'] = 20;

                    let user_card_name_container = document.createElement('div');
                    user_card_name_container.className = "user-card-name-container";
                    user_card_name_container.append(user_card_name);

                    card.append(user_card_name_container);
                }*/
                card.append(card_img);

                bottom_container.append(card);
            }
            let controls = document.createElement('div');
            controls.className = "control-pannel";

            let left_controls = document.createElement('div');
            left_controls.className = "left-control";
            controls.append(left_controls);

            let restart_button = document.createElement('button');
            restart_button.id = "restart-button";
            restart_button.className = "bottom-button";
            restart_button.textContent = "Рестарт";
            restart_button.onclick = restart_button_click;
            left_controls.append(restart_button);

            let middle_controls = document.createElement('div');
            middle_controls.className = "middle-control";
            controls.append(middle_controls);

            let stats_own_cont = document.createElement('div');
            stats_own_cont.className = "stats-own-container";
            middle_controls.append(stats_own_cont);

            let stats_own = document.createElement('div');
            stats_own.className = "stats-own";
            stats_own.innerHTML = player.name + "<br>Счет: " + player.score;
            stats_own.style['z-index'] = 20;
            stats_own_cont.append(stats_own);

            let right_controls = document.createElement('div');
            right_controls.className = "right-control";
            controls.append(right_controls);

            let next_button = document.createElement('button');
            next_button.id = "next-button";
            next_button.className = "bottom-button";
            if (data.phase.point == "user_action") {
                next_button.textContent = "Догадка";
            } else {
                next_button.textContent = "Продолжить";
            }
            next_button.onclick = next_button_click;
            right_controls.append(next_button);
            localStorage.setItem('button_block', JSON.stringify(false));

            bottom_container.append(controls);
        }
        else {
            let card_pos_min = 0;
            let card_pos_dist = 0;
            let card_align = false;
            let card_pos = false;
            if (player.side == 'left' || player.side == 'right') {
                player.subside = 'side';
                player.subpos = player.side;
                card_align = 'top';
                if (data.players_amount == 4 || data.players_amount == 3) {
                    card_pos_min = 10;
                    card_pos_dist = 60;
                } else if (data.players_amount == 2) {
                    card_pos_min = 0;
                    card_pos_dist = 80;
                } else {
                    card_pos_min = 20;
                    card_pos_dist = 40;
                }
            } else {
                player.subside = player.side;
                player.subpos = player.pos
                if (player.pos == 'ltop' || player.side == 'lbottom') {
                    card_align = 'right';
                    if (data.players_amount == 4 || data.players_amount == 3) {
                        card_pos_min = -10;
                        card_pos_dist = 80;
                    } else if (data.players_amount == 2) {
                        card_pos_min = -30;
                        card_pos_dist = 120;
                    } else {
                        card_pos_min = 10;
                        card_pos_dist = 40;
                    }
                } else if (player.pos == 'rtop' || player.pos == 'ctop' || player.side == 'rbottom') {
                    card_align = 'left';
                    if (data.players_amount == 4 || data.players_amount == 3) {
                        card_pos_min = -10;
                        card_pos_dist = 80;
                    } else if (data.players_amount == 2) {
                        card_pos_min = -30;
                        card_pos_dist = 120;
                    } else {
                        card_pos_min = 10;
                        card_pos_dist = 40;
                    }
                }
            }

            let pos_player = document.createElement('div');
            pos_player.className = player.side + "-player " + player.pos + "-player";

            let player_info_cont = document.createElement('div');
            player_info_cont.className = "player-info-container player-info-container-" + player.subside + " " + player.subpos + "-info";
            pos_player.append(player_info_cont);

            let player_info = document.createElement('div');
            player_info.className = "player-info";
            player_info_cont.append(player_info);

            let container_img = document.createElement('div');
            container_img.className = "player-img player-info-container-" + player.subside + "-img img-" + player.subpos;

            let portrait_type = 'normal';
            if (in_array(player_key, leading_players)) {
                portrait_type = 'happy';
            } else if (in_array(player_key, behind_players)) {
                portrait_type = 'sad';
            }
            let portrait = document.createElement('img');
            portrait.className = 'player-image ' + player.border;
            if (data.special_mode) {
                portrait.src = "images/sprites/" + player_key + "/type2.png";
            } else {
                portrait.src = "images/sprites/" + player_key + "/type1_" + portrait_type + ".png";
            }
            portrait.setAttribute('player', player_key);
            container_img.append(portrait);

            let name = document.createElement('div');
            name.className = "name name-" + player.subside + " " + player.border;
            name.textContent = player.name;

            let score = document.createElement('div');
            score.className = "score score-" + player.subside + " " + player.border;
            score.setAttribute('player', player_key);
            score.textContent = "Счет: " + player.score;

            if (player.subside == 'side') {
                player_info.append(name);
                player_info.append(container_img);
                player_info.append(score);
            } else {
                let player_info_data = document.createElement('div');
                player_info_data.className = "player-info-" + player.subpos + "-data";
                player_info_data.append(name);
                player_info_data.append(score);
                player_info.append(container_img);
                player_info.append(player_info_data);
            }

            for (let i = 1; i <= data.cards_info.each_player; i++) {
                let card = document.createElement('div');
                card.className = "card " + player.side + "-card";
                card_pos = card_pos_min + (i - 1) * (Math.floor((card_pos_dist / (data.cards_info.each_player - 1)) * 100) / 100);
                if (card_align == 'top') {
                    card.style.top = card_pos + "%";
                } else if (card_align == 'right') {
                    card.style.right = card_pos + "%";
                } else if (card_align == 'left') {
                    card.style.left = card_pos + "%";
                    let zindex = (data.cards_info.each_player - i) + 1;
                    card.style['z-index'] = zindex;
                }
                pos_player.append(card);

                let card_img = document.createElement('img');
                if (data.special_mode) {
                    card_img.src = "images/cards/back2.png";
                } else {
                    card_img.src = "images/cards/back.png";
                }
                card.append(card_img);
            }

            if (player.side == 'top') {
                top_container.append(pos_player);
            } else if (player.side == 'left') {
                left_container.append(pos_player);
            } else if (player.side == 'right') {
                right_container.append(pos_player);
            } else if (player.side == 'bottom') {
                bottom_container.append(pos_player);
            }
        }
    }

    let button_rules = document.createElement('div');
    button_rules.className = "button-rules";
    button_rules.innerHTML = '?';
    button_rules.onclick = show_rules;
    document.querySelector('#workarea').append(button_rules);

    let maxscore = document.createElement('div');
    maxscore.className = "informer-maxscore";
    maxscore.innerHTML = 'Счет для победы: ' + data.maxscore;
    document.querySelector('#workarea').append(maxscore);
    update_data(data);
}

function set_special_mode() {
    let data = get_data();
    data.special_mode = true;
    update_data(data);
}

function unset_special_mode() {
    let data = get_data();
    data.special_mode = false;
    update_data(data);
}

function forced_render(storage_data) {
    storage_data = JSON.parse(storage_data);
    if (storage_data.phase.point == "user_assumption") {
        assumption_reaction(true, false);
    } else if (storage_data.phase.point == "bot_action") {
        show_bot_selected();
    } else if (storage_data.phase.point == "bot_assumption") {
        show_bot_selected();
        assumption_reaction(true, true);
    } else if (storage_data.phase.point == "bot_answer_action") {
        show_bot_answer();
    } else if (storage_data.phase.point == "user_answer") {
        answer_button_click(true, false)
    } else if (storage_data.phase.point == "bot_answer") {
        show_bot_answer();
        answer_button_click(true, true)
    } else if (storage_data.phase.point == "endgame") {
        let data = get_data();
        next_round(data, true);
    }
}

function show_rules() {
    let workarea = document.querySelector('#workarea');
    workarea.style.opacity = "1.0";

    let layer = document.querySelector('#layer');
    layer.style.display = 'block';
    let modal = document.createElement('div');
    modal.id = "modal-rules";

    let modal_top = document.createElement('div');
    modal_top.id = "modal-rules-top";
    modal_top.innerHTML = "Правила игры";
    modal.append(modal_top);

    let modal_center = document.createElement('div');
    modal_center.id = "modal-rules-center";
    modal_center.innerHTML = "Добро пожаловать в наш клуб! Сегодня сыграем в детективную игру. Произошло убийство, и тебе нужно быстрее других распутать это дело. " +
        "Преступник находится среди сидящих в этой комнате. Тебе необходимо отгадать преступника, орудие и место преступления.<br>" +
        "В специальной колоде содержатся карты для всех присутствующих в этой комнате, различных орудий и локаций. Перед игрой они перемешиваются, " +
        "и из колоды откладывается по одной карте для человека, оружия и места, эти 3 карты и будут являться правильным ответом. " +
        "Остальные карты поровну раздаются между участниками. В итоге игроку необходимо отгадать те 3 карты, которых ни у кого на руках нет. " +
        "В свой ход игрок может высказать предположение, либо огласить ответ. В случае предположения он называет человека/орудие/место, " +
        "и остальные участники сверяют догадку со своими картами. Если у кого-то из них на руках есть хотя бы одна из этих карт, он должен об этом сообщить. " +
        "После этого ход передается по часовой стрелке к следующему игроку. В случае ответа, участник называет комбинацию, которая, по его мнению, наверняка является правильной. " +
        "В этом случае раунд сразу завершается и выскрываются отложенные в начале карты с правильным ответом. Если игрок верно отгадал его, он получает 1 балл на счет, " +
        "если не отгадал - 1 балл у него забирается. После этого начинается следующий раунд. Игра идет, пока кто-либо из участников не наберет установленное для победы количество баллов. " +
        "Перед началом игры каждый придумывает наказание, и если он побеждает, то проигравший должен будет его выполнить. " +
        "При нажатии конпки \"Догадка\" можно высказать предположение или дать ответ. При нажатии конпки \"Рестарт\" игра будет перезапущена.<br>" +
        "Ну вот и все. Вперед и в бой же!";
    modal.append(modal_center);

    let modal_bottom = document.createElement('div');
    modal_bottom.id = "modal-rules-bottom";
    modal.append(modal_bottom);

    let modal_center_controls = document.createElement('div');
    modal_center_controls.className = "modal-center-control";
    modal_bottom.append(modal_center_controls);

    let rules_close_button = document.createElement('button');
    rules_close_button.id = "rules-close-button";
    rules_close_button.className = "modal-button";
    rules_close_button.textContent = "Понятно!";
    rules_close_button.onclick = rules_close_button_click;
    modal_center_controls.append(rules_close_button);

    layer.append(modal);
}

function rules_close_button_click() {
    let layer = document.querySelector('#layer');
    layer.style.display = 'none';
    while (layer.firstChild) {
        layer.removeChild(layer.firstChild);
    }
}

function restart_button_click() {
    let restart = confirm("Сбросить весь прогресс и перезапустить игру?");
    if (restart) {
        restart_game();
    }
}

function endgame() {
    alert('Партия закончена, игра будет перезапущена');
    let data = get_data();
    if (data.special_mode) {
        data.special_mode = false; //выход из спец. режима
    }
    update_data(data);
    restart_game();
}

function restart_game() {
    let data = get_data();
    if (data.special_mode) {
        data.special_mode = false;
        let main_page = document.querySelector('#main-page');
        main_page.style.backgroundImage = "url('images/bg/main_page.jpg')";
        main_page.classList.remove('bg-cover');
        update_data(data);
    }
    check_time();
    localStorage.clear();
    document.querySelector('#top-container-area').innerHTML = null;
    document.querySelector('#left-container-area').innerHTML = null;
    document.querySelector('#right-container-area').innerHTML = null;
    document.querySelector('#bottom-container-area').innerHTML = null;
    document.querySelector('.button-rules').remove();
    document.querySelector('.informer-maxscore').remove();
    let workarea = document.querySelector('#workarea');
    let answer_cards = document.querySelectorAll('.answer-card');
    for (let i = 0; i < answer_cards.length; i++) {
        workarea.removeChild(answer_cards[i]);
    }
    startpage_render();
}

function next_button_click() {
    let block = JSON.parse(localStorage.getItem('button_block'));
    if (block == true) {
        return false;
    }
    let data = get_data();
    if (!data.special_mode) {
        check_time();
    }
    if (data.phase.point == "user_action") {
        speach_clear();
        new_user_action(data);
    } else if (data.phase.point == "user_assumption") {
        speach_clear();
        assumption_calc(data);
    } else if (data.phase.point == "bot_action") {
        assumption_reaction(false, true);
    } else if (data.phase.point == "bot_assumption") {
        speach_clear();
        assumption_calc(data);
    } else if (data.phase.point == "bot_answer_action") {
        answer_button_click(false, true);
    } else if (data.phase.point == "user_answer" || data.phase.point == "bot_answer") {
        speach_clear();
        next_round(data, false);
    } else if (data.phase.point == "endgame") {
        endgame();
    } else {
        speach_clear();
        console.log('not a new action');
    }

}

function speach_clear() {
    for (player_speach of document.querySelectorAll('div.player-speach')) {
        player_speach.remove();
    }
    for (speach_anchor of document.querySelectorAll('div.speach-anchor')) {
        speach_anchor.remove();
    }
}

function new_user_action(data) {
    let cards_info = get_cards_info(data.user_name);

    let workarea = document.querySelector('#workarea');
    workarea.style.opacity = "1.0";

    let layer = document.querySelector('#layer');
    layer.style.display = 'block';
    let modal = document.createElement('div');
    modal.id = "modal";

    let modal_top = document.createElement('div');
    modal_top.id = "modal-top";
    modal_top.innerHTML = "Сформировать обвинение";
    modal.append(modal_top);

    let modal_center = document.createElement('div');
    modal_center.id = "modal-center";
    modal.append(modal_center);


    let modal_center_person = document.createElement('div');
    modal_center_person.id = "modal-center-person";
    modal_center.append(modal_center_person);

    let person_selector_desc_container = document.createElement('div');
    person_selector_desc_container.id = "person-selector-desc-container";
    modal_center_person.append(person_selector_desc_container);

    let person_selector_desc = document.createElement('div');
    person_selector_desc.id = "person-selector-desc";
    person_selector_desc.innerHTML = 'Преступник';
    person_selector_desc_container.append(person_selector_desc);

    let person_selector_container = document.createElement('div');
    person_selector_container.id = "person-selector-container";
    modal_center_person.append(person_selector_container);

    let person_selector = document.createElement('select');
    person_selector.id = "person-selector";
    person_selector.onchange = player_selector_change;
    person_selector_container.append(person_selector);

    let first_id = null;
    for (let card_code of data.cards_info.cards_players) {
        let card_id = cards_info[card_code]['id'];
        if (!(first_id)) {
            first_id = card_id;
        }
        card_name = cards_info[card_code]['name'];
        let person_option = document.createElement('option');
        person_option.value = card_id;
        person_option.className = card_id + "-selector";
        person_option.setAttribute('card_code', card_code);
        person_option.innerHTML = card_name;
        person_selector.append(person_option);
    }
    person_selector.className = first_id + "-selector";


    let modal_center_weapon = document.createElement('div');
    modal_center_weapon.id = "modal-center-weapon";
    modal_center.append(modal_center_weapon);

    let weapon_selector_desc_container = document.createElement('div');
    weapon_selector_desc_container.id = "weapon-selector-desc-container";
    modal_center_weapon.append(weapon_selector_desc_container);

    let weapon_selector_desc = document.createElement('div');
    weapon_selector_desc.id = "weapon-selector-desc";
    weapon_selector_desc.innerHTML = 'Оружие';
    weapon_selector_desc_container.append(weapon_selector_desc);

    let weapon_selector_container = document.createElement('div');
    weapon_selector_container.id = "weapon-selector-container";
    modal_center_weapon.append(weapon_selector_container);

    let weapon_selector = document.createElement('select');
    weapon_selector.id = "weapon-selector";
    weapon_selector_container.append(weapon_selector);

    for (let card_code of data.cards_info.cards_weapons) {
        let card_id = cards_info[card_code]['id'];
        card_name = cards_info[card_code]['name'];
        let weapon_option = document.createElement('option');
        weapon_option.setAttribute('card_code', card_code);
        weapon_option.innerHTML = card_name;
        weapon_selector.append(weapon_option);
    }

    let modal_center_location = document.createElement('div');
    modal_center_location.id = "modal-center-location";
    modal_center.append(modal_center_location);

    let location_selector_desc_container = document.createElement('div');
    location_selector_desc_container.id = "location-selector-desc-container";
    modal_center_location.append(location_selector_desc_container);

    let location_selector_desc = document.createElement('div');
    location_selector_desc.id = "location-selector-desc";
    location_selector_desc.innerHTML = 'Место';
    location_selector_desc_container.append(location_selector_desc);

    let location_selector_container = document.createElement('div');
    location_selector_container.id = "location-selector-container";
    modal_center_location.append(location_selector_container);

    let location_selector = document.createElement('select');
    location_selector.id = "location-selector";
    location_selector_container.append(location_selector);

    for (let card_code of data.cards_info.cards_locations) {
        let card_id = cards_info[card_code]['id'];
        card_name = cards_info[card_code]['name'];
        let location_option = document.createElement('option');
        location_option.setAttribute('card_code', card_code);
        location_option.innerHTML = card_name;
        location_selector.append(location_option);
    }

    let modal_bottom = document.createElement('div');
    modal_bottom.id = "modal-bottom";
    modal.append(modal_bottom);

    let modal_left_controls = document.createElement('div');
    modal_left_controls.className = "modal-left-control";
    modal_bottom.append(modal_left_controls);

    let answer_button = document.createElement('button');
    answer_button.id = "answer-button";
    answer_button.className = "modal-button";
    answer_button.textContent = "Ответ";
    answer_button.onclick = answer_button_click;
    modal_left_controls.append(answer_button);

    let modal_right_controls = document.createElement('div');
    modal_right_controls.className = "modal-right-control";
    modal_bottom.append(modal_right_controls);

    let assumption_button = document.createElement('button');
    assumption_button.id = "assumption-button";
    assumption_button.className = "modal-button";
    assumption_button.textContent = "Догадка";
    assumption_button.onclick = assumption_reaction;
    modal_right_controls.append(assumption_button);

    layer.append(modal);
}

function player_selector_change() {
    let selector = document.querySelector('#person-selector');
    let index = selector.options.selectedIndex;
    let value = selector.options[index].value;
    selector.className = value + "-selector";
}

function assumption_reaction(forced_render = false, bot_action = false) {
    let data = get_data();
    let selected = [];

    if (forced_render === true || bot_action === true) {
        selected = data.phase.assumption;
    } else {
        let player_selector = document.querySelector('#person-selector');
        let weapon_selector = document.querySelector('#weapon-selector');
        let location_selector = document.querySelector('#location-selector');
        let selected_player = player_selector.options[player_selector.options.selectedIndex].getAttribute('card_code');
        let selected_weapon = weapon_selector.options[weapon_selector.options.selectedIndex].getAttribute('card_code');
        let selected_location = location_selector.options[location_selector.options.selectedIndex].getAttribute('card_code');
        selected = [selected_player, selected_weapon, selected_location];

        if (!data.special_mode) {
            check_time();
        }
        let workarea = document.querySelector('#workarea');
        workarea.style.opacity = "0.95";

        let layer = document.querySelector('#layer');
        layer.style.display = 'none';
        while (layer.firstChild) {
            layer.removeChild(layer.firstChild);
        }

        let next_button = document.querySelector('#next-button');
        next_button.textContent = "Продолжить";
        data.phase.point = "user_assumption";
        data.phase.assumption = selected;
        update_data(data);
    }
    if (bot_action === true && forced_render !== true) {
        data.phase.point = "bot_assumption";
        update_data(data);
    }

    let first_delay = 100;
    if (bot_action !== true) {
        let player = data.phase.active_player;
        let cards_info = get_cards_info(data.user_name);
        let text = data.players_data[player]["name"];
        let text_block = data.players_data[player]["name"];
        text = text + ' : Думаю, что преступник - ';
        text_block = text_block + ' : Думаю, что преступник - <span class="color_person">';
        text = text + cards_info[selected[0]]["name"] + ", орудие - " + cards_info[selected[1]]["name"] + ", место - " + cards_info[selected[2]]["name"];
        text_block = text_block + cards_info[selected[0]]["name"] + '</span>, орудие - <span class="color_weapon">' + cards_info[selected[1]]["name"] + '</span>, место - <span class="color_location">' + cards_info[selected[2]]["name"] + '</span>';
        player_speach_show(data.players_data[player]["pos"], data.players_data[player]["side"], text, text_block);
        first_delay = first_delay + 300;
    }

    let order = clone(data.order);
    order = order.splice(order.indexOf(data.phase.position)).concat(order);
    let reaction = [];

    localStorage.setItem('button_block', JSON.stringify(true));
    setTimeout(() => {
        for (let i = 1; i < data.players_amount; i++) {
            let order_now = order[i];
            //sleep(500);
            let delay = 300 * i;
            let unblock = false;
            if (i == data.players_amount - 1) {
                unblock = true;
            }
            reaction = action_react(data, order_now, selected, reaction, delay, unblock);
        }
        data.phase.reaction = reaction;
        update_data(data);
        if (is_player_next(data, order[1]) == true) {
            let next_button = document.querySelector('#next-button');
            next_button.textContent = "Догадка";
        }
    }, first_delay);
}

function action_react(data, order_now, selected, reaction, delay, unblock) {
    let player_id = null;
    let player = null;
    let have_card = false;
    for (id in data.players_data) {
        if (data.players_data[id]['pos'] == order_now) {
            player_id = id;
            player = data.players_data[id];
        }
    }

    for (card of selected) {
        if (in_array(card, player.cards)) {
            have_card = true;
        }
    }

    let text = '';
    let text_block = false;
    if (have_card) {
        reaction.push(player_id);
        text = 'У меня есть!';
        text_block = '<span class="color_has_card">У меня есть!</span>';
    } else {
        text = 'У меня нету';
    }
    setTimeout(() => {
        player_speach_show(order_now, player.side, text, text_block);
        if (unblock == true) {
            localStorage.setItem('button_block', JSON.stringify(false));
        }
    }, delay);
    return reaction;
}

function assumption_calc(data) {
    let selected = data.phase.assumption;
    let position = data.phase.position;
    let active_player = data.phase.active_player;
    let corr_factor = get_corr_factor(data.history, active_player, selected);
    //console.log(data);

    let reaction_amount = data.phase.reaction.length;
    for (let player_id in data.players_data) {
        let player_data = data.players_data[player_id];
        if (player_data.type == 'user') { continue; }
        let self_calc = false;
        let self_unknown = 3;
        let self_unknown_cards = [];
        if (player_data.pos == position) {
            self_calc = true;
            for (card of data.phase.assumption) {
                if (in_array(card, player_data.cards)) {
                    self_unknown--;
                } else {
                    self_unknown_cards.push(card);
                }
            }
        }
        //распределение по группам (правильная / неправильная / неизвестная)
        let calc_list = player_data.calc_list;
        let cards_info = get_cards_info(data.user_name);
        let groups = group_distribution(player_id, calc_list, cards_info, false, true);
        let true_cards = groups['true_cards'];
        let cards_player = groups['cards_player'];
        let cards_weapon = groups['cards_weapon'];
        let cards_location = groups['cards_location'];
        let true_cards_in_selected = [];
        if (in_array(cards_player['true'], selected)) {
            true_cards_in_selected.push(cards_player['true']);
        }
        if (in_array(cards_weapon['true'], selected)) {
            true_cards_in_selected.push(cards_weapon['true']);
        }
        if (in_array(cards_location['true'], selected)) {
            true_cards_in_selected.push(cards_location['true']);
        }
        //проверка ответа самого игрока
        let player_reaction = false;
        if (in_array(player_id, data.phase.reaction, false)) {
            player_reaction = true; //один из ответивших
        }
        //спрашивал сам, никто не ответил
        if (self_calc && reaction_amount == 0) {
            for (let selected_card of self_unknown_cards) {
                player_data['calc_list'][selected_card]['rate'] = 10000; //все неизвестные - точно верные
            }
        }
        //ответили по количеству неизвестных (спрашивал сам или нет)
        else if (reaction_amount == self_unknown) {
            for (let selected_card of selected) {
                if (!in_array(selected_card, player_data.cards)) {
                    player_data['calc_list'][selected_card]['rate'] = -10000; //исключаем все из запроса
                }
            }
        }
        //ответили по количеству неизвестных (с учетом заведомо правильных карт в вопросе)
        else if (reaction_amount == (self_unknown - true_cards_in_selected.length)) {
            //console.log('new root');
            //console.log(true_cards_in_selected);
            for (let selected_card of selected) {
                if (!in_array(selected_card, player_data.cards) && !in_array(selected_card, true_cards_in_selected)) {
                    player_data['calc_list'][selected_card]['rate'] = -10000; //исключаем все из запроса
                }
            }
        }
        //ответили двое, он среди них; либо спрашивал сам, неизвестных 2, ответил 1
        else if ((reaction_amount == 2 && player_reaction) || (self_calc && reaction_amount == 1 && self_unknown == 2)) {
            if (selected.filter(x => player_data.cards.includes(x)).length >= 2) { //у него 2 карты из запроса
                for (let selected_card of selected.filter(x => !player_data.cards.includes(x))) {
                    player_data['calc_list'][selected_card]['rate'] = -10000; //исключаем третью
                }
            } else {
                let change_ratio = calc_ratio_2in(data, self_calc);
                for (let selected_card of selected) {
                    if (!in_array(selected_card, player_data.cards)) {
                        let rate = player_data['calc_list'][selected_card]['rate'];
                        let change_ratio_corr = change_ratio;
                        if (in_array(selected_card, corr_factor.factor_group)) {
                            change_ratio_corr = Math.round(change_ratio * corr_factor.corr_factor); //корректировка
                        }
                        player_data['calc_list'][selected_card]['rate'] = rate + change_ratio_corr;
                    }
                }
            }
        }
        //ответили двое, тебя среди них нет; либо спрашивал сам, неизвестных 3, ответили 2
        else if (reaction_amount == 2) {
            let change_ratio = calc_ratio_2(data, self_calc);
            for (let selected_card of selected) {
                if (!in_array(selected_card, player_data.cards)) {
                    let rate = player_data['calc_list'][selected_card]['rate'];
                    let change_ratio_corr = change_ratio;
                    if (in_array(selected_card, corr_factor.factor_group)) {
                        change_ratio_corr = Math.round(change_ratio * corr_factor.corr_factor); //корректировка
                    }
                    player_data['calc_list'][selected_card]['rate'] = rate + change_ratio_corr;
                }
            }
        }
        //ответил один, и это он
        else if (reaction_amount == 1 && player_reaction) {
            let change_ratio = calc_ratio_1in(data);
            for (let selected_card of selected) {
                if (!in_array(selected_card, player_data.cards)) {
                    let rate = player_data['calc_list'][selected_card]['rate'];
                    let change_ratio_corr = change_ratio * 0.5; //тут усиление коэффициента
                    if (in_array(selected_card, corr_factor.factor_group)) {
                        change_ratio_corr = Math.round(change_ratio * corr_factor.corr_factor); //корректировка
                    }
                    player_data['calc_list'][selected_card]['rate'] = rate + change_ratio_corr;
                }
            }
        }
        //ответил один, и не он; либо спрашивал сам, неизвестных 3, ответил 1
        else if (reaction_amount == 1) {
            let change_ratio = calc_ratio_1(data, self_calc);
            for (let selected_card of selected) {
                if (!in_array(selected_card, player_data.cards)) {
                    let rate = player_data['calc_list'][selected_card]['rate'];
                    let change_ratio_corr = change_ratio;
                    if (in_array(selected_card, corr_factor.factor_group)) {
                        change_ratio_corr = Math.round(change_ratio * corr_factor.corr_factor); //корректировка
                    }
                    player_data['calc_list'][selected_card]['rate'] = rate + change_ratio_corr;
                }
            }
        }
        //никто не ответил
        else if (reaction_amount == 0) {
            let change_ratio = calc_ratio_1in(data);
            for (let selected_card of selected) {
                let rate = player_data['calc_list'][selected_card]['rate'];
                let change_ratio_corr = change_ratio * 0.5; //тут усиление коэффициента
                if (in_array(selected_card, corr_factor.factor_group)) {
                    change_ratio_corr = Math.round(change_ratio * corr_factor.corr_factor); //корректировка
                }
                player_data['calc_list'][selected_card]['rate'] = rate + change_ratio_corr;
            }
        }
        //отдельная корректировка - если 2 игрока и в вопросе предположительно 1 незвестная, которой у тебя нет
        if (data.players_amount == 2 && !self_calc && reaction_amount == 0) {
            let add_extra_rate = 30;
            let known_array = [].concat([cards_player['true']], [cards_weapon['true']], [cards_location['true']], cards_player['false'], cards_weapon['false'], cards_location['false']);
            if (cards_player['true']) {
                known_array.concat(cards_player['unknown']);
            }
            if (cards_weapon['true']) {
                known_array.concat(cards_weapon['unknown']);
            }
            if (cards_location['true']) {
                known_array.concat(cards_location['unknown']);
            }
            //let known_array_noplayer = [].concat([cards_weapon['true']], [cards_location['true']], cards_weapon['false'], cards_location['false']);
            let probably_true_cards = [];
            //console.log(known_array);
            for (let selected_card of selected) {
                if (!in_array(selected_card, known_array)) {
                    probably_true_cards.push(selected_card);
                }
            }
            //console.log(probably_true_cards);
            if (probably_true_cards.length < 3) {
                for (let probably_true_card of probably_true_cards) {
                    //console.log(probably_true_card + ' add 30 extra rate');
                    player_data['calc_list'][probably_true_card]['rate'] = player_data['calc_list'][probably_true_card]['rate'] + add_extra_rate;
                }
            }
        }
        //запомнить, что спрашивали
        for (let selected_card of selected) {
            player_data['calc_list'][selected_card]['actions'] = player_data['calc_list'][selected_card]['actions'] + 1;
        }
    }
    data.history.push({ "player": active_player, "selected": selected }); //запись в историю
    //перевод действия на следующий ход
    update_data(data);
    next_action_prepare();
}

function next_action_prepare(repeat_action = false, new_round = false) {
    let data = get_data();
    let order = clone(data.order);
    order = order.splice(order.indexOf(data.phase.position)).concat(order);
    if (repeat_action) {
        data.phase.position = order[0];
    } else {
        data.phase.position = order[1];
    }
    let next_player_type = null;
    for (player_id in data.players_data) {
        let player = data.players_data[player_id];
        if (player.pos == data.phase.position) {
            data.phase.active_player = player_id;
            next_player_type = data.players_data[player_id].type;
        }
    }
    data.phase.reaction = [];
    data.phase.assumption = [];
    if (next_player_type == 'bot') {
        data.phase.point = "bot_action";
        update_data(data);
        new_bot_action(data);
    } else if (next_player_type == 'user') {
        let next_button = document.querySelector('#next-button');
        next_button.textContent = "Догадка";
        data.phase.point = "user_action";
        update_data(data);
        if (!repeat_action) {
            new_user_action(data);
        }
    }
}

//ну я типа пытался рассчитать эти вероятности, лол, но я не статистик. Надеюсь, они будут не слишком тупить
function calc_ratio_2(data, self_calc) {
    let players = data.players_amount;
    let cards = data.cards_info.total;
    let cards_each = data.cards_info.each_player;
    let right = 33; //изначальный процент правильности 1 карты
    //срез на то, что у 1 игрока может быть на руках 2 из пачки
    let chance_1_1 = cards_each / (cards - cards_each); //шанс, что любая 1 карта у него с 1 попытки (минус свои, их знаем)
    let chanse_1_3 = 1 - Math.pow((1 - chance_1_1), 3); //шанс, что 1 карта с 3 попыток (считаем от обратной вероятности)
    let chanse2_1_1 = (cards_each - 1) / (cards - cards_each - 1); //шанс, что, когда первая совпала, у него есть вторая
    let chanse2_1_2 = 1 - Math.pow((1 - chanse2_1_1), 2); //тогда на вторую карту остается 2 попытки
    let chanse_2_3 = chanse_1_3 * chanse2_1_2; //шанс, что есть 2 карты одновременно
    let cut_1st = chanse_2_3 * 2; //поскольку может быть как у первого ответившего, так и у второго
    right = right * (1 - cut_1st); //срезаем правильность первой группой условий
    if (!self_calc) {
        //срез на то, что карта может быть у спрашивающего и он падлит / точечно проверяет (если не расчет для спрашивающего)
        right = right * (1 - chance_1_1); //срезаем правильность второй группой условий
    }
    let ratio = right - 50; //отклонение от середины в 50 процентов (тут будет отрицательное)
    return Math.round(ratio);
}

function calc_ratio_1(data, self_calc) {
    let players = data.players_amount;
    let cards = data.cards_info.total;
    let cards_each = data.cards_info.each_player;
    let right = 66; //изначальный процент правильности 1 карты
    //срез на то, что у 1 игрока может быть на руках 3 из пачки
    let chance_1_1 = cards_each / (cards - cards_each); //шанс, что любая 1 карта у него с 1 попытки (минус свои, их знаем)
    let chanse_1_3 = 1 - Math.pow((1 - chance_1_1), 3); //шанс, что 1 карта с 3 попыток (считаем от обратной вероятности)
    let chanse2_1_1 = (cards_each - 1) / (cards - cards_each - 1); //шанс, что, когда первая совпала, у него есть вторая
    let chanse2_1_2 = 1 - Math.pow((1 - chanse2_1_1), 2); //тогда на вторую карту остается 2 попытки
    let chanse_2_3 = chanse_1_3 * chanse2_1_2; //шанс, что есть 2 карты одновременно
    let chanse3_1_1 = (cards_each - 2) / (cards - cards_each - 2); //шанс, что когда совпала 1 и 2, совпала 3
    let chanse_3_3 = chanse_2_3 * chanse3_1_1; //шанс, что есть 3 карты одновременно
    right = right * (1 - chanse_3_3); //срезаем правильность первой группой условий
    if (!self_calc) {
        //срез на то, что карта может быть у спрашивающего и он падлит / точечно проверяет (если не расчет для спрашивающего)
        right = right * (1 - chance_1_1); //срезаем правильность второй группой условий
    }
    let ratio = right - 50; //отклонение от середины в 50 процентов (будет в районе 0, не в +, но не улетит вниз от проверки)
    return Math.round(ratio);
}

function calc_ratio_2in(data, self_calc) {
    let players = data.players_amount;
    let cards = data.cards_info.total;
    let cards_each = data.cards_info.each_player;
    let right = 50; //изначальный процент правильности 1 карты
    //срез на то, что у второго ответившего может быть на руках 2 из остатка пачки
    let chance_1_1 = cards_each / (cards - cards_each); //шанс, что любая 1 карта у него с 1 попытки (минус свои, их знаем)
    let chanse_1_2 = 1 - Math.pow((1 - chance_1_1), 2); //шанс, что 1 карта с 2 попыток (считаем от обратной вероятности)
    let chanse2_1_1 = (cards_each - 1) / (cards - cards_each - 1); //шанс, что, когда первая совпала, у него есть вторая
    let chanse_2_2 = chanse_1_2 * chanse2_1_1; //шанс, что есть 2 карты одновременно
    right = right * (1 - chanse_2_2); //срезаем правильность первой группой условий
    if (!self_calc) {
        //срез на то, что карта может быть у спрашивающего и он падлит / точечно проверяет (если не расчет для спрашивающего)
        right = right * (1 - chance_1_1); //срезаем правильность второй группой условий
    }
    let ratio = right - 50; //отклонение от середины в 50 процентов (тут будет отрицательное)
    return Math.round(ratio);
}

function calc_ratio_1in(data) {
    let players = data.players_amount;
    let cards = data.cards_info.total;
    let cards_each = data.cards_info.each_player;
    let right = 100; //изначальный процент правильности 1 карты
    //срез на то, что карта может быть у спрашивающего и он падлит / точечно проверяет
    let chance_1_1 = cards_each / (cards - cards_each); //шанс, что любая 1 карта у него с 1 попытки (минус свои, их знаем)
    right = right * (1 - chance_1_1); //срезаем правильность второй группой условий
    let ratio = right - 50; //отклонение от середины в 50 процентов (тут будет положительное)
    return Math.round(ratio);
}

//расчет поправочного коэффициента (если подобное уже спрашивали, вес повторных запросов меньше)
function get_corr_factor(history, active_player, selected) {
    let factor_level = 5;
    let factor_group = [];
    let corr_factor = 1;
    for (note of history) {
        let note_player = note.player;
        let note_selected = note.selected;
        let common = selected.filter(x => note_selected.includes(x));
        let common_length = common.length;
        if (common_length == 3 && note_player == active_player) { //эта группа уже спрашивалась этим игроком
            factor_level = 0;
            factor_group = common;
            corr_factor = 0;
        } else if (common_length == 3 && factor_level > 1) { //эта группа уже спрашивалась другими
            factor_level = 1;
            factor_group = common;
            corr_factor = 0.6;
        } else if (common_length == 2 && note_player == active_player && factor_level > 2) { //2 из группы спрашивались этим
            factor_level = 2;
            factor_group = common;
            corr_factor = 0.6;
        } else if (common_length == 2 && factor_level > 3) { //2 из группы спрашивались другими
            factor_level = 3;
            factor_group = common;
            corr_factor = 0.8;
        } else if (common_length == 1 && note_player == active_player && factor_level > 4) { //1 из группы спрашивались этим
            factor_level = 4;
            factor_group = common;
            corr_factor = 0.8;
        }
    }
    return { "corr_factor": corr_factor, "factor_group": factor_group };
}

function new_bot_action() {
    let data = get_data();
    if (!data.special_mode) {
        check_time();
    }

    let player = data.phase.active_player;
    let position = data.phase.position;
    let calc_list = data.players_data[player].calc_list;
    let cards_info = get_cards_info(data.user_name);

    //подготовка к проверкам - распределение по группам
    let groups = group_distribution(player, calc_list, cards_info, true, false);
    let true_cards = groups['true_cards'];
    let cards_player = groups['cards_player'];
    let cards_weapon = groups['cards_weapon'];
    let cards_location = groups['cards_location'];

    //проверка готовности дать ответ (все известно)
    if (cards_player['true'] && cards_weapon['true'] && cards_location['true']) {
        let bot_selected = [cards_player['true'], cards_weapon['true'], cards_location['true']];
        data.phase.point = "bot_answer_action";
        data.phase.assumption = bot_selected;
        update_data(data);
        show_bot_answer();
        return true;
    }

    //определение стратегии
    let player_pick = null;
    let weapon_pick = null;
    let location_pick = null;
    let false_check = [];
    let target_regime = false;
    //предпроверка большого отклонения - срабатывает в 50 проц. случаев (для 2 игроков в 75)
    let dev_check = 50;
    if (data.players_amount == 2) {
        dev_check = 75;
    }
    let random_value0 = Math.floor(Math.random() * 100);
    if (random_value0 < dev_check) {
        if (!cards_location['true'] && cards_location['unknown']) {
            let target_card_location = neutral_distribution_target_check(cards_location['unknown'], calc_list);
            if (target_card_location) {
                location_pick = target_card_location;
                target_regime = true;
                false_check = ["player", "weapon"];
            }
        }
        if (!cards_weapon['true'] && cards_weapon['unknown'] && !target_regime) {
            let target_card_weapon = neutral_distribution_target_check(cards_weapon['unknown'], calc_list);
            if (target_card_weapon) {
                weapon_pick = target_card_weapon;
                target_regime = true;
                false_check = ["player", "location"];
            }
        }
        if (!cards_player['true'] && cards_player['unknown'] && !target_regime) {
            let target_card_player = neutral_distribution_target_check(cards_player['unknown'], calc_list);
            if (target_card_player) {
                player_pick = target_card_player;
                target_regime = true;
                false_check = ["weapon", "location"];
            }
        }
    }
    //основная логика расчета
    //поправочные коэффициенты для малого количества игроков
    let k_unknown3_false2 = 1;
    let k_unknown3_false1 = 1;
    let k_unknown2_false1 = 1;
    let k_unknown2_false0 = 1;
    if (data.players_amount == 3) {
        k_unknown3_false2 = 2; //10 -> 20 проц.
        k_unknown3_false1 = 3.5; //20 -> 70 проц.
        k_unknown2_false1 = 3; //30 -> 90 проц.
    } else if (data.players_amount == 2) {
        k_unknown3_false2 = 9; //10 -> 90 проц.
        k_unknown3_false1 = 0.45; //20 -> 9 проц.
        k_unknown2_false1 = 3.13; //30 -> 94 проц.
        k_unknown2_false0 = 10; //0,5 -> 5 проц. (запутать)
    }
    //выбор логики
    if (true_cards == 0 && !target_regime) { //неизвестны три
        //70 процентов на выбор 3 неизвестных; 20 процетнов на выбор 2 неизвестных; 10 процетнов на выбор 1 неизвестной
        //0,5 процента выбрать все из своих, чтобы запутать нахрен
        let random_value = Math.floor(Math.random() * 1000);
        if (random_value < 5) { //во всех группах - "ложный выбор"
            false_check = ["player", "weapon", "location"];
        } else if (random_value < (5 + 10 * 10 * k_unknown3_false2)) { //в двух из групп - "ложный выбор"
            //в 80 проц. случаях пробуем определить игрока
            let random_inner = Math.floor(Math.random() * 10);
            if (random_inner < 8) {
                false_check = ["weapon", "location"];
            } else {
                let packs = ["player", "weapon", "location"];
                let first_check = arrayRandElement(packs);
                false_check.push(first_check);
                packs = packs.filter(val => val !== first_check);
                false_check.push(arrayRandElement(packs));
            }
        } else if (random_value < (5 + 10 * 10 * k_unknown3_false2 + 20 * 10 * k_unknown3_false1)) { //в одной из групп - "ложный выбор"
            let packs = ["player", "weapon", "location"];
            //в 80 проц. случаях пробуем определить игрока
            let random_inner = Math.floor(Math.random() * 10);
            if (random_inner < 8) {
                let packs = ["weapon", "location"];
            }
            false_check.push(arrayRandElement(packs));
        }
    } else if (true_cards == 1 && !target_regime) { //неизвестны две
        //70 процентов на выбор 2 неизвестных; 30 процетнов на выбор 1 неизвестной, а 1 заведомо неверной
        //0,5 процента выбрать все из своих, чтобы запутать нахрен
        let random_value = Math.floor(Math.random() * 1000);
        if (random_value < (5 * k_unknown2_false0)) { //во всех группах - "ложный выбор"
            false_check = ["player", "weapon", "location"];
        } else if (random_value < (5 * k_unknown2_false0 + 30 * 10 * k_unknown2_false1)) { //в одной из групп - "ложный выбор"
            let packs = [];
            if (cards_player['true']) {
                packs = ["weapon", "location"];
            } else if (cards_weapon['true']) {
                packs = ["player", "location"];
                //в 80 проц. случаях пробуем определить игрока
                let random_inner = Math.floor(Math.random() * 10);
                if (random_inner < 8) {
                    packs = ["location"];
                }
            } else if (cards_location['true']) {
                packs = ["player", "weapon"];
                //в 80 проц. случаях пробуем определить игрока
                let random_inner = Math.floor(Math.random() * 10);
                if (random_inner < 8) {
                    packs = ["weapon"];
                }
            }
            false_check.push(arrayRandElement(packs));
        }
    }
    //из групп, где есть ответы (или если попали в процент ложного выбора) - берем заведомо неверную
    let random_value_fc_from_true = Math.floor(Math.random() * 100);
    let fc_from_true = false;
    if (random_value_fc_from_true < 95 || data.players_amount == 2) {
        fc_from_true = true; //если для ложного выбора нет заведомо неверных - взять заведомо верную с шансом 95 проц.
    }
    if (cards_player['true'] || in_array("player", false_check)) {
        if (cards_player['false'].length != 0 && (data.players_amount != 2 || (data.players_amount == 2 && in_array(cards_player['false'][0], data.players_data[player].cards)))) {
            player_pick = array_false_change(cards_player['false'], data.players_data[player].cards);
        } else if (cards_player['true'] && fc_from_true) {
            player_pick = cards_player['true'];
        } else {
            player_pick = arrayRandElement(cards_player['unknown']);
        }
    }
    if (cards_weapon['true'] || in_array("weapon", false_check)) {
        if (cards_weapon['false'].length != 0) {
            weapon_pick = array_false_change(cards_weapon['false'], data.players_data[player].cards);
        } else if (cards_weapon['true'] && fc_from_true) {
            weapon_pick = cards_weapon['true'];
        } else {
            weapon_pick = arrayRandElement(cards_weapon['unknown']);
        }
    }
    if (cards_location['true'] || in_array("location", false_check)) {
        if (cards_location['false'].length != 0) {
            location_pick = array_false_change(cards_location['false'], data.players_data[player].cards);
        } else if (cards_location['true'] && fc_from_true) {
            location_pick = cards_location['true'];
        } else {
            location_pick = arrayRandElement(cards_location['unknown']);
        }
    }
    //из прочих групп берем из нейтрального распределения
    if (!player_pick) { //неизвестен игрок
        let unknown_array = cards_player['unknown'];
        if (unknown_array.length == 0) {
            unknown_array = cards_player['false'];
        }
        player_pick = neutral_distribution_select(unknown_array, calc_list);
        if (!player_pick) {
            player_pick = arrayRandElement(cards_player['total']);
        }
    }
    if (!weapon_pick) { //неизвестно оружие
        let unknown_array = cards_weapon['unknown'];
        if (unknown_array.length == 0) {
            unknown_array = cards_weapon['false'];
        }
        weapon_pick = neutral_distribution_select(unknown_array, calc_list);
        if (!weapon_pick) {
            weapon_pick = arrayRandElement(cards_weapon['total']);
        }
    }
    if (!location_pick) { //неизвестно место
        let unknown_array = cards_location['unknown'];
        if (unknown_array.length == 0) {
            unknown_array = cards_location['false'];
        }
        location_pick = neutral_distribution_select(unknown_array, calc_list);
        if (!location_pick) {
            location_pick = arrayRandElement(cards_location['total']);
        }
    }
    let bot_selected = [player_pick, weapon_pick, location_pick];
    //console.log('selected ' + bot_selected);
    data.phase.point = "bot_action";
    data.phase.assumption = bot_selected;
    update_data(data);
    show_bot_selected();
}

function show_bot_selected() {
    let data = get_data();
    //sleep(700);
    let player = data.phase.active_player;
    let cards_info = get_cards_info(data.user_name);
    let selected = data.phase.assumption;
    let text = data.players_data[player]["name"];
    let text_block = data.players_data[player]["name"];
    text = text + ' : Думаю, что преступник - ';
    text_block = text_block + ' : Думаю, что преступник - <span class="color_person">';
    text = text + cards_info[data.phase.assumption[0]]["name"] + ", орудие - " + cards_info[data.phase.assumption[1]]["name"] + ", место - " + cards_info[data.phase.assumption[2]]["name"];
    text_block = text_block + cards_info[data.phase.assumption[0]]["name"] + '</span>, орудие - <span class="color_weapon">' + cards_info[data.phase.assumption[1]]["name"] + '</span>, место - <span class="color_location">' + cards_info[data.phase.assumption[2]]["name"] + '</span>';
    if (data.special_mode) {
        let random_value = Math.floor(Math.random() * 100);
        if (random_value < 15) {
            text_block = text_block + '. ';
            if (cards_info[selected[0]]["id"] == data.phase.active_player) {
                if (data.phase.active_player == 'ri') {
                    text_block = text_block + 'Я всегда знаю, как это сделать тихо и быстро же!';
                } else if (data.phase.active_player == 'ha') {
                    text_block = text_block + 'Я долго ходила по пятам за этим человеком.';
                } else if (data.phase.active_player == 're') {
                    text_block = text_block + 'Как думаешь, Рэна здорово его прикончила, прикончила?';
                } else if (data.phase.active_player == 'sa') {
                    text_block = text_block + 'Меня вынудили это сделать, но иногда есть только один выход.';
                } else if (data.phase.active_player == 'mi') {
                    text_block = text_block + 'У нас в имении достаточно метса, чтобы спрятать его труп.';
                } else if (data.phase.active_player == 'si') {
                    text_block = text_block + 'Его навсегда унес демон. В этот раз им была я.';
                }
            } else {
                if (data.phase.active_player == 'ri') {
                    text_block = text_block + 'Это было довольно расчетливо же, ты не находишь?';
                } else if (data.phase.active_player == 'ha') {
                    text_block = text_block + 'Он просто был проклят, но не осознавал этого.';
                } else if (data.phase.active_player == 're') {
                    text_block = text_block + 'Просто за ним пришло проклятие Оясиро-сама.';
                } else if (data.phase.active_player == 'sa') {
                    text_block = text_block + 'Вы тоже наслаждались этим зрелищем, не так ли?';
                } else if (data.phase.active_player == 'mi') {
                    text_block = text_block + 'Как думаешь, жертва успела помучиться? Надеюсь, что да.';
                } else if (data.phase.active_player == 'si') {
                    text_block = text_block + 'Жаль, что не удалось провернуть это лично.';
                }
            }
        }
    }
    setTimeout(() => {
        player_speach_show(data.players_data[player]["pos"], data.players_data[player]["side"], text, text_block);
    }, 300);
}

function show_bot_answer() {
    let data = get_data();
    let player = data.phase.active_player;
    let cards_info = get_cards_info(data.user_name);
    let selected = data.phase.assumption;
    let text = data.players_data[player]["name"];
    let text_block = data.players_data[player]["name"];
    text = text + ' : Я ЗНАЮ ОТВЕТ! Преступник - ';
    text_block = text_block + ' : <span class="color_answer">Я ЗНАЮ ОТВЕТ!</span> Преступник - <span class="color_person">';
    text = text + cards_info[data.phase.assumption[0]]["name"] + ", орудие - " + cards_info[data.phase.assumption[1]]["name"] + ", место - " + cards_info[data.phase.assumption[2]]["name"];
    text_block = text_block + cards_info[data.phase.assumption[0]]["name"] + '</span>, орудие - <span class="color_weapon">' + cards_info[data.phase.assumption[1]]["name"] + '</span>, место - <span class="color_location">' + cards_info[data.phase.assumption[2]]["name"] + '</span>';
    if (data.special_mode) {
        text_block = text_block + '. ';
        if (cards_info[selected[0]]["id"] == data.phase.active_player) {
            if (data.phase.active_player == 'ri') {
                text_block = text_block + 'Я всегда знаю, как это сделать тихо и быстро же!';
            } else if (data.phase.active_player == 'ha') {
                text_block = text_block + 'Я долго ходила по пятам за этим человеком.';
            } else if (data.phase.active_player == 're') {
                text_block = text_block + 'Как думаешь, Рэна здорово его прикончила, прикончила?';
            } else if (data.phase.active_player == 'sa') {
                text_block = text_block + 'Меня вынудили это сделать, но иногда есть только один выход.';
            } else if (data.phase.active_player == 'mi') {
                text_block = text_block + 'У нас в имении достаточно метса, чтобы спрятать его труп.';
            } else if (data.phase.active_player == 'si') {
                text_block = text_block + 'Его навсегда унес демон. В этот раз им была я.';
            }
        } else {
            if (data.phase.active_player == 'ri') {
                text_block = text_block + 'Это было довольно расчетливо же, ты не находишь?';
            } else if (data.phase.active_player == 'ha') {
                text_block = text_block + 'Он просто был проклят, но не осознавал этого.';
            } else if (data.phase.active_player == 're') {
                text_block = text_block + 'Просто за ним пришло проклятие Оясиро-сама.';
            } else if (data.phase.active_player == 'sa') {
                text_block = text_block + 'Вы тоже наслаждались этим зрелищем, не так ли?';
            } else if (data.phase.active_player == 'mi') {
                text_block = text_block + 'Как думаешь, жертва успела помучиться? Надеюсь, что да.';
            } else if (data.phase.active_player == 'si') {
                text_block = text_block + 'Жаль, что не удалось провернуть это лично.';
            }
        }
    }

    setTimeout(() => {
        player_speach_show(data.players_data[player]["pos"], data.players_data[player]["side"], text, text_block);
    }, 300);
}

function group_distribution(player, calc_list, cards_info, extra_correct, return_only_real) {
    let true_border = 5000;
    if (return_only_real) {
        true_border = 9000;
    }
    //подготовка к проверкам - распределение по группам
    let true_cards = 0;
    let cards_player = { 'total': [], 'false': [], 'unknown': [], 'true': false };
    let cards_weapon = { 'total': [], 'false': [], 'unknown': [], 'true': false };
    let cards_location = { 'total': [], 'false': [], 'unknown': [], 'true': false };
    for (card in calc_list) {
        if (cards_info[card]["type"] == "player") {
            cards_player['total'].push(card);
            if (calc_list[card]["rate"] > true_border) {
                cards_player['true'] = card;
                true_cards++;
            } else if (calc_list[card]["rate"] < -5000) {
                cards_player['false'].push(card);
            } else {
                cards_player['unknown'].push(card);
            }
        } else if (cards_info[card]["type"] == "weapon") {
            cards_weapon['total'].push(card);
            if (calc_list[card]["rate"] > true_border) {
                cards_weapon['true'] = card;
                true_cards++;
            } else if (calc_list[card]["rate"] < -5000) {
                cards_weapon['false'].push(card);
            } else {
                cards_weapon['unknown'].push(card);
            }
        } else if (cards_info[card]["type"] == "location") {
            cards_location['total'].push(card);
            if (calc_list[card]["rate"] > true_border) {
                cards_location['true'] = card;
                true_cards++;
            } else if (calc_list[card]["rate"] < -5000) {
                cards_location['false'].push(card);
            } else {
                cards_location['unknown'].push(card);
            }
        }
    }
    //корректировки групп
    for (let i = 0; i < 3; i++) {
        let cards_group = false;
        if (i == 0) {
            cards_group = cards_player;
        } else if (i == 1) {
            cards_group = cards_weapon;
        } else if (i == 2) {
            cards_group = cards_location;
        }
        //основная корректировка (поиск правильных)
        if (!cards_group['true'] && cards_group['unknown'].length == 1) {
            let move_card = cards_group['unknown'][0];
            cards_group['true'] = move_card;
            cards_group['unknown'] = [];
            calc_list[move_card]["rate"] = 10000; //наверняка верная
            //console.log('correct1 ' + move_card);
        }
        //поправочная вероятностная корректировка
        if (extra_correct && !cards_group['true'] && cards_group['unknown'].length > 1) {
            let total_rate = 0
            for (card of cards_group['unknown']) {
                total_rate = total_rate + calc_list[card]["rate"];
            }
            let average_rate = Math.round(total_rate / cards_group['unknown'].length);
            let dev_list = [];
            for (card of cards_group['unknown']) {
                let rate = calc_list[card]["rate"];
                let deviation = rate - average_rate;
                dev_list.push({ name: card, val: deviation });
            }
            dev_list.sort(function (a, b) { return b.val - a.val; });
            let max_dev_card = dev_list[0]['name'];
            if (neutral_to_true_check(player, dev_list[0]['val'], dev_list[1]['val'], calc_list[max_dev_card]["actions"], cards_group['unknown'].length, max_dev_card)) {
                cards_group['true'] = max_dev_card;
                cards_group['unknown'].splice(cards_group['unknown'].indexOf(max_dev_card), 1);
                calc_list[max_dev_card]["rate"] = 8000; //вероятностно верная
                //console.log('correct2 ' + max_dev_card);
            }
        } else {
            //console.log('НЕ запуск для ' + player + ' i=' + i + ' верная группа' + cards_group['true'] + 'длина распр. ' + cards_group['unknown'].length);
        }
    }
    let result = {
        'true_cards': true_cards,
        'cards_player': cards_player,
        'cards_weapon': cards_weapon,
        'cards_location': cards_location,
    };
    return result;
}

//выбор точно отрицательной карты для "ложной" части запроса
function array_false_change(false_array, player_cards) {
    let player_false_cards = false_array.filter(x => player_cards.includes(x));
    let random_value = Math.floor(Math.random() * 100);
    if (random_value < 80 && player_false_cards) { //80 процентов взять из своих карт, если такие есть под запрос
        return arrayRandElement(player_false_cards);
    }
    return arrayRandElement(false_array); //иначе - из всех, подходящих под запрос
}

//выбор карты из нейтрального распределения
function neutral_distribution_select(array, calc_list) {
    if (array.length == 0) {
        return false;
    }
    let total_rate = 0
    for (card_info of array) {
        total_rate = total_rate + calc_list[card]["rate"];
    }
    let average_rate = total_rate / array.length;
    let base_chance = 100;
    let selection = {};
    let selection_point = 0;
    for (card of array) {
        let chance = 0;
        let rate = calc_list[card]["rate"];
        let actions = calc_list[card]["actions"];
        //чем выше карта в распределении - тем больше шанс ее выбора
        let deviation = rate - average_rate;
        if (deviation >= 1) {
            chance = Math.round(base_chance * Math.sqrt(deviation));
        } else if (deviation <= -1) {
            chance = Math.round(base_chance / Math.sqrt(-deviation));
        } else {
            chance = base_chance;
        }
        //чем чаще спрашивали карту, тем меньше шанс ее выбора
        chance = Math.round(chance / Math.sqrt(actions * 2 + 1)); //*2 для увеличенной поправки
        if (chance < 1) {
            chance = 1;
        }
        //распределяем карты с шансами по отрезку
        selection[card] = { "min": selection_point };
        selection_point = selection_point + chance;
        selection[card]["max"] = selection_point;
    }
    //случайный выбор
    let random_value = Math.floor(Math.random() * selection_point);
    for (card in selection) {
        if (random_value >= selection[card]["min"] && random_value < selection[card]["max"]) {
            return card;
        }
    }
    return false;
}

//проверка сверхбольшого отклонения из распределения + по карте уже спрашивали
function neutral_distribution_target_check(array, calc_list) {
    let deviation_target_level = 30;
    if (array.length == 0) {
        return false;
    }
    let total_rate = 0
    for (card of array) {
        total_rate = total_rate + calc_list[card]["rate"];
    }
    let average_rate = total_rate / array.length;
    for (card of array) {
        let rate = calc_list[card]["rate"];
        let actions = calc_list[card]["actions"];
        let deviation = rate - average_rate;
        if (deviation >= deviation_target_level && actions >= 1) {
            return card;
        }
    }
    return false;
}

//проверка на выведение карты из нейтрального распределения в предположительно верную
function neutral_to_true_check(player_id, first_dev_rate, second_dev_rate, actions, neutral_amount, max_dev_card) {
    let data = get_data();
    //задать параметры для игроков
    let params = {
        'ri': { 'border': 50, 'chance': 10 }, //Рика - осторожная, при превышении бьет наверняка
        'ha': { 'border': 50, 'chance': 5 }, //Ханю - осторожная
        'mi': { 'border': 40, 'chance': 5 }, //Мион - средняя, средний шанс
        're': { 'border': 60, 'chance': 3 }, //Рэна - максимальная осторожность
        'si': { 'border': 40, 'chance': 8 }, //Шион - средняя, бьет решительно
        'sa': { 'border': 30, 'chance': 8 }, //Сатоко - максимально агрессивная
    };
    let player_border = params[player_id]['border'];
    if (in_array(max_dev_card, data.cards_info.cards_players)) {
        player_border = player_border * 2; //карты игроков проходяет с меньшим шансом
    }
    let player_chance = params[player_id]['chance'];
    //нулевая проверка - по заполненности данных (исключение ошибок)
    if (!player_border || !player_chance) {
        return false;
    }
    //первая проверка - по верхней хотя бы 3 проверки
    if (neutral_amount <= 2) {
        return false;
    }
    //вторая проверка - отклонение верхней превышает порог с поправкой на оставшееся число в распределении
    let real_border = Math.floor((neutral_amount / 5) * player_border);
    if (first_dev_rate < real_border) {
        //console.log('не превышает границы, надо ' + real_border);
        return false;
    }
    //третья проверка - увеличивается шанс прохода в зависимости от отклонения между 1 и 2
    let dev_amount = first_dev_rate - second_dev_rate;
    let k = dev_amount / 28; //если больше 28 - шанс возрастает прогрессией 3-ей степени
    let real_chance = Math.floor(player_chance * Math.pow(k, 3));
    let random_value = Math.floor(Math.random() * 100);
    if (random_value < real_chance) {
        //console.log('ПРОШЛО по разнице 1-2, шанс ' + real_chance);
        return true;
    } else {
        //console.log('не прошло по разнице 1-2, шанс ' + real_chance);
        return false;
    }
}

function player_speach_show(position, side, text, text_block = false) {
    //text = "Я думаю, что преступник - ты, орудие - твои руки, место - где-то"
    let pos_player = null;
    if (position == "bottom") {
        pos_player = document.querySelector('div.stats-own-container');
    } else {
        let pos_container = document.querySelector('div.' + position + '-player');
        pos_player = pos_container.querySelector('div.player-img');
    }

    let player_speach = document.createElement('div');
    if (text_block) {
        player_speach.innerHTML = text_block;
    } else {
        player_speach.textContent = text;
    }
    player_speach.className = "player-speach player-speach-" + side;
    if (text.length <= 20) {
        player_speach.classList.add("text-nowrap");
    } else {
        player_speach.classList.add("text-200per");
    }
    pos_player.append(player_speach);

    let speach_anchor = document.createElement('div');
    speach_anchor.className = "speach-anchor speach-anchor-" + side;
    pos_player.append(speach_anchor);

    //console.log(position + ' - ' + text);
    //console.log(pos_player);
}

function is_player_next(data, next_pos) {
    let players_data = data['players_data'];
    for (player_key in players_data) {
        player = players_data[player_key];
        if (player['pos'] == next_pos && player['type'] == 'user') {
            return true;
        }
    }
    return false;
}


function answer_button_click(forced_render = false, bot_action = false) {
    let data = get_data();
    let cards_info = get_cards_info(data.user_name);
    let selected = [];

    if (forced_render === true || bot_action === true) {
        selected = [data.phase.assumption[1], data.phase.assumption[2], data.phase.assumption[0]];
    } else {
        let player_selector = document.querySelector('#person-selector');
        let weapon_selector = document.querySelector('#weapon-selector');
        let location_selector = document.querySelector('#location-selector');
        let selected_player = player_selector.options[player_selector.options.selectedIndex].getAttribute('card_code');
        let selected_weapon = weapon_selector.options[weapon_selector.options.selectedIndex].getAttribute('card_code');
        let selected_location = location_selector.options[location_selector.options.selectedIndex].getAttribute('card_code');
        selected = [selected_player, selected_weapon, selected_location];

        if (!data.special_mode) {
            check_time();
        }
        let workarea = document.querySelector('#workarea');
        workarea.style.opacity = "0.95";

        let layer = document.querySelector('#layer');
        layer.style.display = 'none';
        while (layer.firstChild) {
            layer.removeChild(layer.firstChild);
        }

        let next_button = document.querySelector('#next-button');
        next_button.textContent = "Продолжить";
        data.phase.point = "user_answer";
        data.phase.assumption = selected;
    }
    if (bot_action === true && forced_render !== true) {
        data.phase.point = "bot_answer";
    }

    let answered_by = data.phase.active_player;
    let first_delay = 2000;
    if (bot_action !== true) {
        let player = data.phase.active_player;
        let text = data.players_data[player]["name"];
        let text_block = data.players_data[player]["name"];
        text = text + ' : Я ЗНАЮ ОТВЕТ! Преступник - ';
        text_block = text_block + ' : <span class="color_answer">Я ЗНАЮ ОТВЕТ!</span> Преступник - <span class="color_person">';
        text = text + cards_info[selected[0]]["name"] + ", орудие - " + cards_info[selected[1]]["name"] + ", место - " + cards_info[selected[2]]["name"];
        text_block = text_block + cards_info[selected[0]]["name"] + '</span>, орудие - <span class="color_weapon">' + cards_info[selected[1]]["name"] + '</span>, место - <span class="color_location">' + cards_info[selected[2]]["name"] + '</span>';
        player_speach_show(data.players_data[player]["pos"], data.players_data[player]["side"], text, text_block);
    }

    //расчет верного ответа
    let all_players_cards = [];
    let answer = [];
    for (player_id in data.players_data) {
        let player = data.players_data[player_id];
        all_players_cards = all_players_cards.concat(player.cards);
    }
    for (card_unit of data.cards_info.cards_list) {
        if (!in_array(card_unit, all_players_cards)) {
            answer.push(card_unit);
        }
    }

    //проверка ответа
    let answer_result = false;
    if (selected.length === answer.length && selected.sort().every(function (value, index) { return value === answer.sort()[index] })) {
        answer_result = true;
    }
    data.phase['answer_result'] = answer_result;
    update_data(data);

    //показать карты из ответа - рубашкой вниз
    localStorage.setItem('button_block', JSON.stringify(true));
    setTimeout(() => {
        let workarea = document.querySelector('#workarea');
        for (let i = 0; i <= 2; i++) {
            let answer_card = document.createElement('div');
            answer_card.className = "answer-card";
            answer_card.style.left = (28 + 15 * i) + "%";
            answer_card.style['z-index'] = 50 + i;

            let answer_card_img = document.createElement('img');
            answer_card_img.className = "answer-card-img";
            answer_card_img.src = "images/cards/" + answer[i] + ".png";

            let answer_card_img_back = document.createElement('img');
            answer_card_img_back.className = "answer-card-img-back";
            if (data.special_mode) {
                answer_card_img_back.src = "images/cards/back2.png";
            } else {
                answer_card_img_back.src = "images/cards/back.png";
            }
            answer_card.append(answer_card_img);
            answer_card.append(answer_card_img_back);
            workarea.append(answer_card);
        }
    }, 500);

    //показать карты из ответа - перевернуть
    setTimeout(() => {
        let answer_cards = document.querySelectorAll('.answer-card');
        for (let i = 0; i < answer_cards.length; i++) {
            answer_cards[i].classList.add("is-flipped");
        }
    }, 1000);

    //показать карты из ответа - скрыть рубашку
    setTimeout(() => {
        let answer_cards_back = document.querySelectorAll('.answer-card-img-back');
        for (let i = 0; i < answer_cards_back.length; i++) {
            answer_cards_back[i].classList.add("is-flipped2");
        }
    }, 1300);

    //расчет порядка ходов и реакция
    let order = clone(data.order);
    order = order.splice(order.indexOf(data.phase.position)).concat(order);
    let reaction = [];
    setTimeout(() => {
        for (let i = 1; i < data.players_amount; i++) {
            let order_now = order[i];
            //sleep(500);
            let delay = 300 * i;
            let unblock = false;
            if (i == data.players_amount - 1) {
                unblock = true;
            }
            answer_react(data, order_now, answer_result, delay, unblock, answered_by);
        }
        update_data(data);
        if (is_player_next(data, order[1]) == true) {
            let next_button = document.querySelector('#next-button');
        }
    }, first_delay);
}

function answer_react(data, order_now, answer_result, delay, unblock, answered_by) {
    let player_id = null;
    let player = null;
    for (id in data.players_data) {
        if (data.players_data[id]['pos'] == order_now) {
            player_id = id;
            player = data.players_data[id];
        }
    }

    let text = '';
    let girl = false;
    if (in_array(answered_by, ['ri', 'ha', 'mi', 'si', 're', 'sa'])) {
        girl = true;
    }
    answered_by = data.players_data[answered_by].name;
    if (answer_result) {
        text = 'Тебе просто повезло!';
        let random = Math.floor(Math.random() * 5)
        if (player.id == 'ri') {
            if (data.special_mode) {
                text = 'Похоже, ты прекрасно разбираешься в таких вещах, не так ли?';
            } else if (random == 0) {
                text = 'Миии... С нами с легкостью разделались же!';
            } else if (random == 1) {
                text = 'У тебя совсем не плохо получается';
            } else if (random == 2) {
                text = answered_by + ' очень хорошо постарался же!';
                if (girl) text = answered_by + ' очень хорошо постаралась же!';
            } else if (random == 3) {
                text = answered_by + ' совсем нас не жалеет';
            } else if (random >= 4) {
                text = 'Миии... Снова нас обыграли же...';
            }
        } else if (player.id == 'ha') {
            if (data.special_mode) {
                text = 'Не думай, что сможешь всегда побеждать судьбу.';
            } else if (random == 0) {
                text = 'Ау-ау-ау... Опять обыграли...';
            } else if (random == 1) {
                text = 'Ты хорошо постарался!';
                if (girl) text = 'Ты хорошо постаралась!';
            } else if (random == 2) {
                text = answered_by + ' совсем не оставил мне шансов';
                if (girl) text = answered_by + ' совсем не оставила мне шансов';
            } else if (random == 3) {
                text = answered_by + ' протсо уничтожил нас.. Ау...';
                if (girl) text = answered_by + ' протсо уничтожила нас.. Ау...';
            } else if (random >= 4) {
                text = 'Ау... ' + answered_by + ' слишком хорошо играет';
            }
        } else if (player.id == 're') {
            if (data.special_mode) {
                text = 'Ложь! Так быстро угадать нельзя! Что ты от нас скрываешь, скрываешь?';
            } else if (random == 0) {
                text = 'Хаууу! ' + answered_by + ' так здорово играет!';
            } else if (random == 1) {
                text = 'Хаууу! Как ты так смог, так смог?';
                if (girl) text = 'Хаууу! Как ты так смогла, смогла?';
            } else if (random == 2) {
                text = answered_by + ' такой умелый! Хочу забрать домой!';
                if (girl) text = answered_by + ' такая умелая! Хочу забрать домой!';
            } else if (random == 3) {
                text = 'Рэна так и не успела угадать, угадать...';
            } else if (random >= 4) {
                text = 'Ну и что Рэна теперь будет делать, делать...';
            }
        } else if (player.id == 'sa') {
            if (data.special_mode) {
                text = 'Вы просто хотите уничтожить меня. Не подходи ко мне!';
            } else if (random == 0) {
                text = 'О-хо-хо! ' + answered_by + ', похоже, решил всех победить!';
                if (girl) text = 'О-хо-хо! ' + answered_by + ', похоже, решила всех победить!';
            } else if (random == 1) {
                text = 'И как я могу тягаться с такими профессионалами...';
            } else if (random == 2) {
                text = answered_by + ', вы решили совсем нас не щадить?';
            } else if (random == 3) {
                text = 'О-хо-хо! А претворялись таким неумелым';
                if (girl) text = 'О-хо-хо! А претворялись такой неумелой';
            } else if (random >= 4) {
                text = 'Думаете, этого будет достаточно вам для победы? Как бы не так!';
            }
        } else if (player.id == 'mi') {
            if (data.special_mode) {
                text = 'Это не сойдет тебе с рук. Я не позволю.';
            } else if (random == 0) {
                text = 'А ' + answered_by + ' в этот раз неплохо себя показал';
                if (girl) text = 'А ' + answered_by + ' в этот раз неплохо себя показала';
            } else if (random == 1) {
                text = 'Тебе все равно не избежать наказания!';
            } else if (random == 2) {
                text = answered_by + ', а ты растешь на глазах...';
            } else if (random == 3) {
                text = 'Меньшего от члена клуба и не ожидалось!';
            } else if (random >= 4) {
                text = 'Эй, эй! Я тоже собиралась ответить!';
            }
        } else if (player.id == 'si') {
            if (data.special_mode) {
                text = 'Откуда ты знал? Я заставлю тебя рассказть, что ты скрываешь от меня!';
                if (girl) text = 'Откуда ты знала? Я заставлю тебя рассказть, что ты скрываешь от меня!';
            } else if (random == 0) {
                text = 'Не думала, что ' + answered_by + ' способен на такое';
                if (girl) text = 'Не думала, что ' + answered_by + ' способна на такое';
            } else if (random == 1) {
                text = 'Наверняка сговорился с кем-то';
                if (girl) text = 'Наверняка сговорилась с кем-то';
            } else if (random == 2) {
                text = 'Хех, ' + answered_by + ' решил бросить мне вызов...';
                if (girl) text = 'Хех, ' + answered_by + ' решила бросить мне вызов...';
            } else if (random == 3) {
                text = 'Кто-то настолько испугался моего наказания?';
            } else if (random >= 4) {
                text = 'Не думай, что такой мелочи будет достаточно для победы';
            }
        }
    } else {
        text = 'Отчаянная, но безуспешная попытка';
        let random = Math.floor(Math.random() * 5)
        if (player.id == 'ri') {
            if (data.special_mode) {
                text = 'Твои усердия достойны похвалы, но неужели ты думаешь, что их достаточно?';
            } else if (random == 0) {
                text = 'Вперед и в бой же!';
            } else if (random == 1) {
                text = 'Бедненький, бедненький, совсем не умеет играть же...';
                if (girl) text = 'Бедненькая, бедненькая, совсем не умеет играть же...';
            } else if (random == 2) {
                text = 'Миии... ' + answered_by + ' переоценил свои силы';
                if (girl) text = 'Миии... ' + answered_by + ' переоценила свои силы';
            } else if (random == 3) {
                text = answered_by + ' совсем глупенький же';
                if (girl) text = answered_by + ' совсем глупенькая же';
            } else if (random >= 4) {
                text = 'Нипаааа~☆ Не стоило переживать';
            }
        } else if (player.id == 'ha') {
            if (data.special_mode) {
                text = 'Бросать вызов своей судьбе. Так глупо для тебя.';
            } else if (random == 0) {
                text = 'Ау-ау! Не стоило из-за тебя волноваться';
            } else if (random == 1) {
                text = 'Не переживай, в следующий раз все получится!';
            } else if (random == 2) {
                text = 'Ау-ау-ау... ' + answered_by + ' напрасно не проверил все еще раз';
                if (girl) text = 'Ау-ау-ау... ' + answered_by + ' напрасно не проверила все еще раз';
            } else if (random == 3) {
                text = answered_by + ' все равно хорошо постарался!';
                if (girl) text = answered_by + ' все равно хорошо постаралась!';
            } else if (random >= 4) {
                text = 'Ау... Зачем ты так спешил?';
                if (girl) text = 'Ау... Зачем ты так спешила?';
            }
        } else if (player.id == 're') {
            if (data.special_mode) {
                text = 'Что случилось? В твоей крови уже копошатся личинки, личинки?';
            } else if (random == 0) {
                text = 'Хаууу... Ты был близко...';
                if (girl) text = 'Хауу... Ты была близко...';
            } else if (random == 1) {
                text = 'И зачем было так рисовать, рисковать?';
            } else if (random == 2) {
                text = 'Хаууу! ' + answered_by + ' такой расстроенный, хочу забрать домой!';
                if (girl) text = 'Хаууу! ' + answered_by + ' такой расстроенная, хочу забрать домой!';
            } else if (random == 3) {
                text = answered_by + ' облегчил Рэне победу';
                if (girl) text = answered_by + ' облегчила Рэне победу';
            } else if (random >= 4) {
                text = 'Ты совсем не думая сказал, сказал?';
                if (girl) text = 'Ты совсем не думая сказала, сказала?';
            }
        } else if (player.id == 'sa') {
            if (data.special_mode) {
                text = 'В своем желании уничтожить меня вы зашли так далеко, что сами готовы все потерять?';
            } else if (random == 0) {
                text = 'О-хо-хо! Вы решили облегчить мне победу?';
            } else if (random == 1) {
                text = 'Уф, не стоило из-за вас даже переживать';
            } else if (random == 2) {
                text = 'О-хо-хо! ' + answered_by + ' явно хочет получить наказание!';
            } else if (random == 3) {
                text = answered_by + ' слишком бесстрашный';
                if (girl) text = answered_by + ' слишком бесстрашная';
            } else if (random >= 4) {
                text = 'А вы, похоже, совсем не боитесь рисковать?';
            }
        } else if (player.id == 'mi') {
            if (data.special_mode) {
                text = 'Ты собственноручно приближаешь развязку. Тем удобнее будет нам.';
            } else if (random == 0) {
                text = 'Эхехе, кто-то собственноручно движется к наказанию!';
            } else if (random == 1) {
                text = 'Вот это смелость, достойная члена нашего клуба!';
            } else if (random == 2) {
                text = answered_by + '...ты правда собираешься побеждать?';
            } else if (random == 3) {
                text = answered_by + ' что-то явно перепутал';
                if (girl) text = answered_by + ' что-то явно перепутала';
            } else if (random >= 4) {
                text = 'А я знала правильный ответ! Он не дал ответить мне! Нечестно!';
                if (girl) text = 'А я знала правильный ответ! Она не дала ответить мне! Нечестно!';
            }
        } else if (player.id == 'si') {
            if (data.special_mode) {
                text = 'Ты ведешь себя странно. Зачем тебе это? Что ты скрываешь?';
            } else if (random == 0) {
                text = 'А это было дерзко!';
            } else if (random == 1) {
                text = 'Да ты рисковый! Вот только этого мало';
                if (girl) text = 'Да ты рисковая! Вот только этого мало';
            } else if (random == 2) {
                text = answered_by + ' думал, что всех переиграл?';
                if (girl) text = answered_by + ' думала, что всех переиграла?';
            } else if (random == 3) {
                text = answered_by + ' ожидал, что сможет так удивить нас?';
                if (girl) text = answered_by + ' ожидала, что сможет так удивить нас?';
            } else if (random >= 4) {
                text = 'Только зря переживала';
            }
        }
    }

    setTimeout(() => {
        player_speach_show(order_now, player.side, text);
        if (unblock == true) {
            localStorage.setItem('button_block', JSON.stringify(false));
        }
    }, delay);
    return true;
}

function next_round(data, forced_render) {
    //расчет результатов
    let score = data.players_data[data.phase.active_player].score;
    let repeat_action = false;
    if (data.phase['answer_result'] === true) {
        if (!forced_render) {
            data.players_data[data.phase.active_player].score = score + 1;
        }
        repeat_action = true;
    } else if (data.phase['answer_result'] === false) {
        data.players_data[data.phase.active_player].score = score - 1;
    }
    data.phase['answer_result'] = null;

    //проверка на окончание игры
    if (data.players_data[data.phase.active_player].score >= data.maxscore) {
        let winner = data.phase.active_player;
        let score_block = document.querySelector('.score[player="' + winner + '"]');
        score_block.textContent = "Счет: " + data.players_data[winner].score;
        let punishment = '';
        if (data.players_data[winner].type == 'user') {
            punishment = data.players_data[winner].punishment;
        } else {
            let punishment_code = data.players_data[winner].punishment;
            punishment = get_punishment(winner, punishment_code, data.special_mode);
            if (!data.special_mode) {
                let portrait = document.querySelector('.player-image[player="' + winner + '"]');
                portrait.src = "images/sprites/" + winner + "/type1_happy.png";
            }
        }
        let win_text = '';
        if (winner == 'ri') {
            if (data.special_mode) {
                win_text = 'Что ж, после стольких циклов я все же смогла победить.';
            } else {
                win_text = 'Нипаааа~☆ Я победила же!';
            }
        } else if (winner == 'ha') {
            if (data.special_mode) {
                win_text = 'Наивные людишки, и вы хотели победить меня? На что вы надеялись?';
            } else {
                win_text = 'Ау-ау! Я наконец смогла вас всех обыграть!';
            }
        } else if (winner == 're') {
            if (data.special_mode) {
                win_text = 'А-ХА-ХА-ХА! Что случилось? Не вышло совладать с РэноЙ?';
            } else {
                win_text = 'Хаууу! Рэна так увлеклась, что и не заметила, как выйграла!';
            }
        } else if (winner == 'sa') {
            if (data.special_mode) {
                win_text = 'Вы все хотели мне плохого! Но только не в этот раз!';
            } else {
                win_text = 'О-хо-хо! Вы даже не представляли, с кем связались!';
            }
        } else if (winner == 'mi') {
            if (data.special_mode) {
                win_text = 'Готово. Это оказалось даже легче, чем я думала.';
            } else {
                win_text = 'Моя взяла! Эх, и не завидую я этому несчастному...';
            }
        } else if (winner == 'si') {
            if (data.special_mode) {
                win_text = 'Вам не удалось меня запутать! Теперь я разберусь с вами!';
            } else {
                win_text = 'Вы серьезно надеялись обыграть меня? Наивно...';
            }
        } else {
            win_text = 'Ну вот и все, победа за мной!';
        }
        if (data.special_mode) {
            win_text_block = win_text + ' Прими же свое полное ужаса наказание - <span class="color_weapon">' + punishment + '!</span>';
            win_text = win_text + ' Прими же свое полное ужаса наказание - ' + punishment + '!';
        } else {
            win_text_block = win_text + ' Наказание для проигравшего - <span class="color_weapon">' + punishment + '!</span>';
            win_text = win_text + ' Наказание для проигравшего - ' + punishment + '!';
        }
        let min_score = false;
        let min_score_players = [];
        for (let player_key in data.players_data) {
            player = data.players_data[player_key];
            if (min_score === false) {
                min_score = player.score;
            }
            if (player.score < min_score) {
                min_score = player.score;
                min_score_players = [player_key];
            } else if (player.score == min_score) {
                min_score_players.push(player_key);
            }
        }
        if (min_score_players.length == 1) {
            if (data.special_mode) {
                win_text = win_text + ' И страдать сегодня будет ' + data.players_data[min_score_players[0]].name;
                win_text_block = win_text_block + ' И страдать сегодня будет <span class="' + min_score_players[0] + '-text">' + data.players_data[min_score_players[0]].name + '<span>';
            } else {
                win_text = win_text + ' И выполнять его будет ' + data.players_data[min_score_players[0]].name;
                win_text_block = win_text_block + ' И выполнять его будет <span class="' + min_score_players[0] + '-text">' + data.players_data[min_score_players[0]].name + '<span>';
            }
        } else {
            if (data.special_mode) {
                win_text = win_text + ' И страдать сегодня будут:';
                win_text_block = win_text_block + ' И страдать сегодня будут:';
            } else {
                win_text = win_text + ' И выполнять его будут:';
                win_text_block = win_text_block + ' И выполнять его будут:';
            }
            for (let loose_player_key in min_score_players) {
                let loose_player = min_score_players[loose_player_key];
                if (loose_player_key != 0) {
                    win_text = win_text + ',';
                    win_text_block = win_text_block + ',';
                }
                win_text = win_text + ' ' + data.players_data[loose_player].name;
                win_text_block = win_text_block + ' <span class="' + loose_player + '-text">' + data.players_data[loose_player].name + '</span>';
            }
        }
        let delay = 100;
        localStorage.setItem('button_block', JSON.stringify(true));
        setTimeout(() => {
            player_speach_show(data.players_data[winner].pos, data.players_data[winner].side, win_text, win_text_block);
        }, delay);

        let girl = false;
        if (in_array(winner, ['ri', 'ha', 'mi', 'si', 're', 'sa'])) {
            girl = true;
        }
        for (let loose_player_key in min_score_players) {
            let loose_player = min_score_players[loose_player_key];
            delay = delay + 300;
            let loose_text = '';
            if (loose_player == 'ri') {
                if (data.special_mode) {
                    loose_text = 'В очередной раз я проиграла судьбе... Неужели это никогда не закончится?';
                } else {
                    loose_text = 'Мииии... ' + data.players_data[winner].name + ' слишком жесток ко мне же...';
                    if (girl) loose_text = 'Мииии... ' + data.players_data[winner].name + ' слишком жестока ко мне же...';
                }
            } else if (loose_player == 'ha') {
                if (data.special_mode) {
                    loose_text = 'Значит, вот какой конец вы для меня приготовили...';
                } else {
                    loose_text = 'Ау-ау-ау! ' + data.players_data[winner].name + ' решил совсем меня не жалеть...';
                    if (girl) loose_text = 'Ау-ау-ау! ' + data.players_data[winner].name + ' решила совсем меня не жалеть...';
                }
            } else if (loose_player == 're') {
                if (data.special_mode) {
                    loose_text = 'Я не позволю! Не позволю тебе! И ты тоже уничтожаешь жизнь Рэны!';
                } else {
                    loose_text = 'Хаууу... Теперь Рэне придется эту жуть выполнять, выполнять?';
                }
            } else if (loose_player == 'sa') {
                if (data.special_mode) {
                    loose_text = 'Так вот какой был ваш план с самого начала! Не подходи ко мне! Неееет!';
                } else {
                    loose_text = 'Уаааааааа! ' + data.players_data[winner].name + ' просто издевается надо мноооой!';
                }
            } else if (loose_player == 'mi') {
                if (data.special_mode) {
                    loose_text = 'Ты же это не серьезно? Ты же не заставишь меня делать это? Эй! Отвечай!';
                } else {
                    loose_text = 'Лидер клуба вынуждена выполнять наказание... Как я могла до такого дойти...';
                }
            } else if (loose_player == 'si') {
                if (data.special_mode) {
                    loose_text = 'Да как ты смеешь? Я буду мстить за это! Я из под земли тебя достану!';
                } else {
                    loose_text = 'Ну ничего, в следующий раз я напишу там такое, что ты еще пожалеешь!';
                }
            } else {
                if (data.special_mode) {
                    loose_text = 'Эй, ты это серьезно вообще?';
                } else {
                    loose_text = 'Придется это выполнять, кажется...';
                }
            }
            if (data.players_data[loose_player].type != 'user' && !data.special_mode) {
                let portrait = document.querySelector('.player-image[player="' + loose_player + '"]');
                portrait.src = "images/sprites/" + loose_player + "/type1_sad.png";
            }
            let unblock = false;
            if (loose_player_key == min_score_players.length - 1) {
                unblock = true;
            }
            setTimeout(() => {
                player_speach_show(data.players_data[loose_player].pos, data.players_data[loose_player].side, loose_text, false);
                if (unblock == true) {
                    localStorage.setItem('button_block', JSON.stringify(false));
                }
            }, delay);
        }
        data.phase.point = "endgame";
        update_data(data);
        return;
    }

    //перераздача карт
    if (data.special_mode) {
        let random_value = Math.floor(Math.random() * 10);
        if (random_value >= 3) {
            data.special_mode = false; //выход из спец. режима
        }
    }
    data.round = data.round + 1;
    let cards_players = data.cards_info.cards_players;
    let cards_weapons = data.cards_info.cards_weapons;
    let cards_locations = data.cards_info.cards_locations;
    let players_data = data.players_data;
    let cards_each_player = data.cards_info.each_player;
    let cards_base_info = get_cards_info(data.user_name);
    let cards_list = data.cards_info.cards_list;
    let bots_amount = data.players_amount - 1;
    let bots = data.bots;
    set_players_cards(cards_players, cards_weapons, cards_locations, players_data, cards_each_player, cards_base_info, cards_list, bots_amount, bots);
    data["history"] = [];
    main_encoding(data);
    //очистка и перерендер поля
    document.querySelector('#top-container-area').innerHTML = null;
    document.querySelector('#left-container-area').innerHTML = null;
    document.querySelector('#right-container-area').innerHTML = null;
    document.querySelector('#bottom-container-area').innerHTML = null;
    let workarea = document.querySelector('#workarea');
    check_time();
    let answer_cards = document.querySelectorAll('.answer-card');
    for (let i = 0; i < answer_cards.length; i++) {
        workarea.removeChild(answer_cards[i]);
    }
    update_data(data);
    workarea_render(false);
    //перевод действия на следующий ход
    next_action_prepare(repeat_action, true);
}




function set_data(players_amount, user_name, maxscore, punishment) {
    let bots_info = {
        "ri": { "name": "Рика", "border": "ri-border" },
        "ha": { "name": "Ханю", "border": "ha-border" },
        "mi": { "name": "Мион", "border": "mi-border" },
        "re": { "name": "Рэна", "border": "re-border" },
        "si": { "name": "Шион", "border": "si-border" },
        "sa": { "name": "Сатоко", "border": "sa-border" },
    };
    let bots = ['ri', 'ha', 'mi', 're', 'si', 'sa'];
    bots = shuffle(bots);
    bots.splice(players_amount - 1);

    let cards_base_info = get_cards_info(user_name);
    let cards_players = [];
    let cards_weapons = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w10', 'w11', 'w12', 'w13', 'w14', 'w15', 'w16'];
    let cards_locations = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10', 'l11', 'l12', 'l13', 'l14', 'l15', 'l16', 'l17'];

    let bots_amount = players_amount - 1;
    let sides = [];
    let positions = [];
    let order = [];
    let total_cards = 0;
    let player_cards = players_amount;
    let weapon_cards = 0;
    let location_cards = 0;
    if (players_amount == 7) {
        sides = ['top', 'top', 'left', 'left', 'right', 'right'];
        positions = ['ltop', 'rtop', 'tleft', 'bleft', 'tright', 'bright'];
        order = ['ltop', 'rtop', 'tright', 'bright', 'bottom', 'bleft', 'tleft'];
        total_cards = 38;
        weapon_cards = 15;
        location_cards = 16;
    } else if (players_amount == 6) {
        sides = ['top', 'left', 'left', 'right', 'right'];
        positions = ['ctop', 'tleft', 'bleft', 'tright', 'bright'];
        order = ['ctop', 'tright', 'bright', 'bottom', 'bleft', 'tleft'];
        total_cards = 39;
        weapon_cards = 16;
        location_cards = 17;
    } else if (players_amount == 5) {
        sides = ['top', 'top', 'left', 'right'];
        positions = ['ltop', 'rtop', 'cleft', 'cright'];
        order = ['ltop', 'rtop', 'cright', 'bottom', 'cleft'];
        total_cards = 38;
        weapon_cards = 16;
        location_cards = 17;
    } else if (players_amount == 4) {
        sides = ['top', 'left', 'right'];
        positions = ['ctop', 'cleft', 'cright'];
        order = ['ctop', 'cright', 'bottom', 'cleft'];
        total_cards = 35;
        weapon_cards = 15;
        location_cards = 16;
    } else if (players_amount == 3) {
        sides = ['left', 'right'];
        positions = ['tleft', 'tright'];
        order = ['tright', 'bottom', 'tleft'];
        total_cards = 33;
        weapon_cards = 15;
        location_cards = 15;
    } else if (players_amount == 2) {
        sides = ['top'];
        positions = ['ctop'];
        order = ['ctop', 'bottom'];
        total_cards = 23;
        weapon_cards = 10;
        location_cards = 11;
    }

    let players_data = {};
    let player = { "id": "user1", "side": "bottom", "pos": "bottom", "type": "user", "name": user_name, "score": 0, "punishment": punishment };
    players_data["user1"] = player;
    let players_ids = ["user1"];

    for (let i = 0; i < bots_amount; i++) {
        bot_punishment = Math.floor(Math.random() * 5);
        player = { "id": bots[i], "side": sides[i], "pos": positions[i], "type": "bot", "name": bots_info[bots[i]].name, "border": bots_info[bots[i]].border, "score": 0, "punishment": bot_punishment }
        players_data[bots[i]] = player;
        players_ids.push(bots[i]);
    }

    cards_weapons = shuffle(cards_weapons);
    cards_locations = shuffle(cards_locations);
    for (let card_key in cards_base_info) {
        card_unit = cards_base_info[card_key];
        if (card_unit.type == 'player') {
            if (in_array(card_unit.id, players_ids, false)) {
                cards_players.push(card_key);
            }
        }
    }
    cards_weapons.splice(weapon_cards);
    cards_locations.splice(location_cards);
    let cards_each_player = (total_cards - 3) / players_amount;
    let cards_list = cards_players.concat(cards_weapons, cards_locations);

    //раздача карт игрокам
    set_players_cards(cards_players, cards_weapons, cards_locations, players_data, cards_each_player, cards_base_info, cards_list, bots_amount, bots);

    let cards_info = {
        "total": total_cards,
        "players": player_cards,
        "weapons": weapon_cards,
        "locations": location_cards,
        "each_player": cards_each_player,
        "cards_list": cards_list,
        "cards_players": cards_players,
        "cards_weapons": cards_weapons,
        "cards_locations": cards_locations,
    }

    let phase = {
        "point": "user_action",
        "position": "bottom",
        "active_player": "user1",
        "assumption": [],
        "reaction": [],
        "answer_result": null,
    }

    let data = {
        "players_amount": players_amount,
        "bots": bots,
        "user_name": user_name,
        "maxscore": maxscore,
        "order": order,
        "players_data": players_data,
        "cards_info": cards_info,
        "phase": phase,
        "history": [],
        "special_mode": false,
        "round": 1,
    }

    main_encoding(data);
}

function set_players_cards(cards_players, cards_weapons, cards_locations, players_data, cards_each_player, cards_base_info, cards_list, bots_amount, bots) {
    let cards_players_rand = shuffle(cards_players.slice());
    let cards_weapons_rand = shuffle(cards_weapons.slice());
    let cards_locations_rand = shuffle(cards_locations.slice());
    let answer = [cards_players_rand[0], cards_weapons_rand[0], cards_locations_rand[0]];
    let cards_list_rand = shuffle(cards_players_rand.slice(1).concat(cards_weapons_rand.slice(1), cards_locations_rand.slice(1)));
    let cards_list_rand_dump = cards_list_rand.slice();
    for (player_key in players_data) {
        player = players_data[player_key];
        let cards_pack = cards_list_rand_dump.slice(0, cards_each_player);
        players_data[player_key]['cards'] = cards_pack;
        cards_list_rand_dump.splice(0, cards_each_player);
    }
    //списки для расчета вероятностей
    for (line_key in cards_base_info) {
        if (!in_array(line_key, cards_list)) {
            delete cards_base_info[line_key];
        } else {
            cards_base_info[line_key] = { 'rate': 0, "actions": 0 };
        }
    }
    for (let i = 0; i < bots_amount; i++) {
        let cards_base_info_dump = clone(cards_base_info);
        players_data[bots[i]]['calc_list'] = cards_base_info_dump;
        for (card of players_data[bots[i]]['cards']) {
            players_data[bots[i]]['calc_list'][card]['rate'] = -10000;
        }
    }
}

function main_encoding(data) {
    let key = '';
    key += String.fromCharCode(getRandomInt(100, 9999));
    key += String.fromCharCode(getRandomInt(100, 9999));
    key += String.fromCharCode(getRandomInt(100, 9999));
    key += String.fromCharCode(getRandomInt(100, 9999));
    key += String.fromCharCode(getRandomInt(100, 9999));
    key += String.fromCharCode(getRandomInt(100, 9999));
    data.cards_info['answer_cards'] = key; //lol no
    let data_code = clone(data);
    data_code = data_encode(data_code, key);
    localStorage.setItem('data', JSON.stringify(data_code));
}

function get_data() {
    let data = localStorage.getItem('data');
    data = JSON.parse(data);
    let key = data.cards_info['answer_cards'];
    data = data_encode(data, key);
    return data;
}

function update_data(data) {
    let key = data.cards_info['answer_cards'];
    let data_code = clone(data);
    data_code = data_encode(data_code, key);
    localStorage.setItem('data', JSON.stringify(data_code));
}

function get_cards_info(user_name) {
    if (!user_name) {
        user_name = JSON.parse(localStorage.getItem('data')).user_name;
    }
    let cards_base_info = {
        "p1": { "id": "user1", "type": "player", "name": user_name },
        "p2": { "id": "ri", "type": "player", "name": "Рика" },
        "p3": { "id": "ha", "type": "player", "name": "Ханю" },
        "p4": { "id": "mi", "type": "player", "name": "Мион" },
        "p5": { "id": "re", "type": "player", "name": "Рэна" },
        "p6": { "id": "si", "type": "player", "name": "Шион" },
        "p7": { "id": "sa", "type": "player", "name": "Сатоко" },
        "w1": { "id": "w1", "type": "weapon", "name": "Тесак" },
        "w2": { "id": "w2", "type": "weapon", "name": "Нож" },
        "w3": { "id": "w3", "type": "weapon", "name": "Яд" },
        "w4": { "id": "w4", "type": "weapon", "name": "Пистолет" },
        "w5": { "id": "w5", "type": "weapon", "name": "Веревка" },
        "w6": { "id": "w6", "type": "weapon", "name": "Кирка" },
        "w7": { "id": "w7", "type": "weapon", "name": "Гантель" },
        "w8": { "id": "w8", "type": "weapon", "name": "Пепельница" },
        "w9": { "id": "w9", "type": "weapon", "name": "Бита" },
        "w10": { "id": "w10", "type": "weapon", "name": "Граната" },
        "w11": { "id": "w11", "type": "weapon", "name": "Пила" },
        "w12": { "id": "w12", "type": "weapon", "name": "Лопата" },
        "w13": { "id": "w13", "type": "weapon", "name": "Молоток" },
        "w14": { "id": "w14", "type": "weapon", "name": "Газ" },
        "w15": { "id": "w15", "type": "weapon", "name": "Автомат" },
        "w16": { "id": "w16", "type": "weapon", "name": "Брусок" },
        "l1": { "id": "l1", "type": "location", "name": "Гостиная" },
        "l2": { "id": "l2", "type": "location", "name": "Кабинет" },
        "l3": { "id": "l3", "type": "location", "name": "Двор" },
        "l4": { "id": "l4", "type": "location", "name": "Медкабинет" },
        "l5": { "id": "l5", "type": "location", "name": "Прихожая" },
        "l6": { "id": "l6", "type": "location", "name": "Чердак" },
        "l7": { "id": "l7", "type": "location", "name": "Река" },
        "l8": { "id": "l8", "type": "location", "name": "Мост" },
        "l9": { "id": "l9", "type": "location", "name": "Кладбище" },
        "l10": { "id": "l10", "type": "location", "name": "Сарай" },
        "l11": { "id": "l11", "type": "location", "name": "Библиотека" },
        "l12": { "id": "l12", "type": "location", "name": "Школа" },
        "l13": { "id": "l13", "type": "location", "name": "Офис" },
        "l14": { "id": "l14", "type": "location", "name": "Бункер" },
        "l15": { "id": "l15", "type": "location", "name": "Подвал" },
        "l16": { "id": "l16", "type": "location", "name": "Лес" },
        "l17": { "id": "l17", "type": "location", "name": "Свалка" },
    };
    return cards_base_info;
}

function get_punishment(winner, punishment_code, special_mode) {
    let punishment = 'Ничего не делать';
    if (winner == 'ri') {
        if (special_mode) {
            punishment = 'Испытать на себе пыточные орудия из храмового хранилища';
        } else if (punishment_code == 0) {
            punishment = 'Погладить директора по лысине';
        } else if (punishment_code == 1) {
            punishment = 'Целый день мяукать вместо обычной речи';
        } else if (punishment_code == 2) {
            punishment = 'Незаметно погладить по голове соседа слева';
        } else if (punishment_code == 3) {
            punishment = 'Все предыдущие сегодняшние наказания вместе взятые';
        } else if (punishment_code >= 4) {
            punishment = 'Выпить вечером вместе со мной';
        }
    } else if (winner == 'ha') {
        if (special_mode) {
            punishment = 'Отправить кусочек себя плыть по реке в ночь Ватанагаши';
        } else if (punishment_code == 0) {
            punishment = 'Незаметно следовать за соседом справа до конца дня';
        } else if (punishment_code == 1) {
            punishment = 'Попросить прощения у каждого в этой комнате, когда он не ждет';
        } else if (punishment_code == 2) {
            punishment = 'Купить мне булочек с кремом';
        } else if (punishment_code == 3) {
            punishment = 'Напугать ночью деревенского старосту';
        } else if (punishment_code >= 4) {
            punishment = 'Забрать у Рики из холодильника всю горчицу';
        }
    } else if (winner == 're') {
        if (special_mode) {
            punishment = 'Расковырять себе вену и достать оттуда всех-всех личинок';
        } else if (punishment_code == 0) {
            punishment = 'Провести ночь одному на свалке вдали от людей';
        } else if (punishment_code == 1) {
            punishment = 'Пройти ночью через лес до ближайшего города одному';
        } else if (punishment_code == 2) {
            punishment = 'Помочь Рэне немного почесать шею, где ей неудобно самой';
        } else if (punishment_code == 3) {
            punishment = 'Проснуться посреди ночи и пролежать полчаса с открытыми глазами';
        } else if (punishment_code >= 4) {
            punishment = 'Пойти с Рэной слушать пение цикад вечером';
        }
    } else if (winner == 'sa') {
        if (special_mode) {
            punishment = 'Провести два дня в моей ловушке на дереве, вися вниз головой';
        } else if (punishment_code == 0) {
            punishment = 'Переночевать в собачьей конуре';
        } else if (punishment_code == 1) {
            punishment = 'Съесть целую тарелку печеной тыквы';
        } else if (punishment_code == 2) {
            punishment = 'Называть меня хозяйкой до конца дня';
        } else if (punishment_code == 3) {
            punishment = 'Называть меня старшей сестренкой до конца дня';
        } else if (punishment_code >= 4) {
            punishment = 'Забрать меня к себе домой до завтра';
        }
    } else if (winner == 'mi') {
        if (special_mode) {
            punishment = 'Съесть охаги со швейной иглой внутри';
        } else if (punishment_code == 0) {
            punishment = 'Купить в аптеке мазь от геморроя';
        } else if (punishment_code == 1) {
            punishment = 'Прицепить к носу прищепкой усы и ходить так до вечера';
        } else if (punishment_code == 2) {
            punishment = 'Пройти до дома в присяде спиной';
        } else if (punishment_code == 3) {
            punishment = 'Демонстративно заснуть на уроке';
        } else if (punishment_code >= 4) {
            punishment = 'Съесть обед со связанными за спиной руками';
        }
    } else if (winner == 'si') {
        if (special_mode) {
            punishment = 'Отодрать себе ноготь с помощью нашего инструмента';
        } else if (punishment_code == 0) {
            punishment = 'Выйти за меня в смену на работе';
        } else if (punishment_code == 1) {
            punishment = 'Приготовить мне что-нибудь на обед';
        } else if (punishment_code == 2) {
            punishment = 'Побыть моим личным телохранителем до вечера';
        } else if (punishment_code == 3) {
            punishment = 'Рассказать мне одну из своих тайн';
        } else if (punishment_code >= 4) {
            punishment = 'Вывести чем-нибудь сеструху из себя';
        }
    }
    return punishment;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function arrayRandElement(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function in_array(needle, haystack, strict) {
    var found = false, key, strict = !!strict;
    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }
    return found;
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function data_encode(data, key) {
    for (player_key in data.players_data) {
        let player_cards = data.players_data[player_key]['cards'];
        for (card_key in player_cards) {
            data.players_data[player_key]['cards'][card_key] = str_encode(player_cards[card_key], key);
        }
        let player_calc_list = clone(data.players_data[player_key]['calc_list']);
        data.players_data[player_key]['calc_list'] = {};
        for (card_key in player_calc_list) {
            data.players_data[player_key]['calc_list'][str_encode(card_key, key)] = player_calc_list[card_key];
        }
    }
    return data;
}

function str_encode(item, key) {
    let output = '';
    for (i = 0; i < item.length; i++) {
        inp = item.charCodeAt(i);
        k = key.charCodeAt(i);
        output += String.fromCharCode(inp ^ k);
    }
    return output;
}

