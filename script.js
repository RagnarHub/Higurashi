check_time();
let storage_data = localStorage.getItem('data');
if (!storage_data) {
    startpage_render();
} else {
    workarea_render();
    forced_render(storage_data);
}



function check_time() {
    Data = new Date();
    let hour = Data.getHours();

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
    set_data(7, 'Юзер');
    workarea_render();
}

function workarea_render() {
    let data = get_data();
    let top_container = document.querySelector('#top-container-area');
    let left_container = document.querySelector('#left-container-area');
    let right_container = document.querySelector('#right-container-area');
    let bottom_container = document.querySelector('#bottom-container-area');

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
            console.log('user_maps: ' + data.players_data.user1.cards); //убери потом
            for (let i = 1; i <= data.cards_info.each_player; i++) {
                let card = document.createElement('div');
                card.className = "card bottom-card own-card";
                let card_pos = card_pos_min + (i - 1) * (Math.floor((card_pos_dist / (data.cards_info.each_player - 1)) * 100) / 100);
                card.style.left = card_pos + "%";

                let card_img = document.createElement('img');
                card_img.src = "images/cards/empty.png";
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
            stats_own_cont.append(stats_own);

            let right_controls = document.createElement('div');
            right_controls.className = "right-control";
            controls.append(right_controls);

            let next_button = document.createElement('button');
            next_button.id = "next-button";
            next_button.className = "bottom-button";
            next_button.textContent = "Продолжить";
            next_button.onclick = next_button_click;
            right_controls.append(next_button);

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
            container_img.className = "player-info-container-" + player.subside + "-img img-" + player.subpos;

            let portrait = document.createElement('img');
            portrait.className = player.border;
            portrait.src = "images/sprites/" + player_key + "/type1_normal.png";
            container_img.append(portrait);

            let name = document.createElement('div');
            name.className = "name name-" + player.subside + " " + player.border;
            name.textContent = player.name;

            let score = document.createElement('div');
            score.className = "score score-" + player.subside + " " + player.border;
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
                card_img.src = "images/cards/back.png";
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
    }

}

function restart_button_click() {
    check_time();
    localStorage.clear();
    document.querySelector('#top-container-area').innerHTML = null;
    document.querySelector('#left-container-area').innerHTML = null;
    document.querySelector('#right-container-area').innerHTML = null;
    document.querySelector('#bottom-container-area').innerHTML = null;
    startpage_render();
}

function next_button_click() {
    check_time();
    let data = get_data();
    if (data.phase.point == "user_action") {
        new_user_action(data);
    } else if (data.phase.point == "user_assumption") {
        assumption_calc(data);
    } else if (data.phase.point == "bot_action") {
        assumption_reaction(false, true);
    } else if (data.phase.point == "bot_assumption") {
        assumption_calc(data);
    } else {
        console.log('not a new action');
    }

}

function new_user_action(data) {
    let cards_info = get_cards_info(null);

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

        check_time();
        let workarea = document.querySelector('#workarea');
        workarea.style.opacity = "0.95";

        let layer = document.querySelector('#layer');
        layer.style.display = 'none';
        while (layer.firstChild) {
            layer.removeChild(layer.firstChild);
        }

        data.phase.point = "user_assumption";
        data.phase.assumption = selected;
        update_data(data);
    }
    if (bot_action === true && forced_render !== true) {
        data.phase.point = "bot_assumption";
        update_data(data);
    }

    let order = clone(data.order);
    order = order.splice(order.indexOf(data.phase.position)).concat(order);
    let reaction = [];

    setTimeout(() => {
        for (let i = 1; i < data.players_amount; i++) {
            let order_now = order[i];
            sleep(500);
            reaction = action_react(data, order_now, selected, reaction);
        }
        data.phase.reaction = reaction;
        update_data(data);
    }, 100);
}

function action_react(data, order_now, selected, reaction) {
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
    if (have_card) {
        reaction.push(player_id);
        text = player.name + ' : у меня есть!';
    } else {
        text = player.name + ' : у меня нету';
    }
    player_speach(order_now, text);
    return reaction;
}

function assumption_calc(data) {
    let selected = data.phase.assumption;
    let position = data.phase.position;
    let active_player = data.phase.active_player;
    let corr_factor = get_corr_factor(data.history, active_player, selected);
    console.log(data);

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
        //спрашивал сам, ответило по количеству неизвестных
        else if (self_calc && reaction_amount == self_unknown) {
            for (let selected_card of self_unknown_cards) {
                player_data['calc_list'][selected_card]['rate'] = -10000; //все неизвестные - точно неверные
            }
        }
        //ответили трое
        else if (reaction_amount == 3) {
            for (let selected_card of selected) {
                if (!in_array(selected_card, player_data.cards)) {
                    player_data['calc_list'][selected_card]['rate'] = -10000; //исключаем все из запроса
                }
            }
        }
        //ответили двое, он среди них; либо спрашивал сам, неизвестных 2, ответил 1
        else if ((reaction_amount == 2 && player_reaction) || (self_calc && reaction_amount == 1 && self_unknown == 2)) {
            if (selected.filter(x => player_data.cards.includes(x)).length == 2) { //у него 2 карты из запроса
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
        for (let selected_card of selected) {
            player_data['calc_list'][selected_card]['actions'] = player_data['calc_list'][selected_card]['actions'] + 1;
        }
    }
    data.history.push({ "player": active_player, "selected": selected }); //запись в историю
    //перевод действия на следующий ход
    let order = clone(data.order);
    order = order.splice(order.indexOf(position)).concat(order);
    data.phase.position = order[1];
    let next_player_type = null;
    for (player_id in data.players_data) {
        let player = data.players_data[player_id];
        if (player.pos == order[1]) {
            data.phase.active_player = player.id;
            next_player_type = player.type;
        }
    }
    data.phase.reaction = [];
    data.phase.assumption = [];
    if (next_player_type == 'bot') {
        data.phase.point = "bot_action";
        update_data(data);
        new_bot_action(data);
    } else if (next_player_type == 'user') {
        data.phase.point = "user_action";
        update_data(data);
        new_user_action(data);
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
    check_time();
    let data = get_data();

    let player = data.phase.active_player;
    let position = data.phase.position;
    let calc_list = data.players_data[player].calc_list;
    let cards_info = get_cards_info(data.user_name);

    //подготовка к проверкам - распределение по группам
    let true_cards = 0;
    let cards_player = { 'total': [], 'false': [], 'unknown': [] };
    let cards_weapon = { 'total': [], 'false': [], 'unknown': [] };
    let cards_location = { 'total': [], 'false': [], 'unknown': [] };
    for (card in calc_list) {
        if (cards_info[card]["type"] == "player") {
            cards_player['total'].push(card);
            if (calc_list[card]["rate"] > 5000) {
                cards_player['true'] = card;
                true_cards++;
            } else if (calc_list[card]["rate"] < -5000) {
                cards_player['false'].push(card);
            } else {
                cards_player['unknown'].push(card);
            }
        } else if (cards_info[card]["type"] == "weapon") {
            cards_weapon['total'].push(card);
            if (calc_list[card]["rate"] > 5000) {
                cards_weapon['true'] = card;
                true_cards++;
            } else if (calc_list[card]["rate"] < -5000) {
                cards_weapon['false'].push(card);
            } else {
                cards_weapon['unknown'].push(card);
            }
        } else if (cards_info[card]["type"] == "location") {
            cards_location['total'].push(card);
            if (calc_list[card]["rate"] > 5000) {
                cards_location['true'] = card;
                true_cards++;
            } else if (calc_list[card]["rate"] < -5000) {
                cards_location['false'].push(card);
            } else {
                cards_location['unknown'].push(card);
            }
        }
    }

    //определение стратегии
    let player_pick = null;
    let weapon_pick = null;
    let location_pick = null;
    let false_check = [];
    let target_regime = false;
    //предпроверка большого отклонения - срабатывает в 50 проц. случаев
    let random_value0 = Math.floor(Math.random() * 100);
    if (random_value0 < 50) {
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
    if (true_cards == 0 && !target_regime) { //неизвестны три
        //75 процентов на выбор 3 неизвестных; 20 процетнов на выбор 2 неизвестных; 5 процетнов на выбор 1 неизвестной
        let random_value = Math.floor(Math.random() * 100);
        if (random_value < 5) { //в двух из групп - "ложный выбор"
            let packs = ["player", "weapon", "location"];
            let first_check = arrayRandElement(packs);
            false_check.push(first_check);
            packs = packs.filter(val => val !== first_check);
            false_check.push(arrayRandElement(packs));
        } else if (random_value < 25) { //в одной из групп - "ложный выбор"
            let packs = ["player", "weapon", "location"];
            false_check.push(arrayRandElement(packs));
        }
    } else if (true_cards == 1 && !target_regime) { //неизвестны две
        //80 процентов на выбор 2 неизвестных; 20 процетнов на выбор 1 неизвестной, а 1 заведомо неверной
        let random_value = Math.floor(Math.random() * 100);
        if (random_value < 20) { //в одной из групп - "ложный выбор"
            let packs = [];
            if (cards_player['true']) {
                packs = ["weapon", "location"];
            } else if (cards_weapon['true']) {
                packs = ["player", "location"];
            } else if (cards_location['true']) {
                packs = ["player", "weapon"];
            }
            false_check.push(arrayRandElement(packs));
        }
    }
    //из групп, где есть ответы (или если попали в процент ложного выбора) - берем заведомо неверную
    if (cards_player['true'] || in_array("player", false_check)) {
        if (cards_player['false'].length != 0) {
            player_pick = array_false_change(cards_player['false'], data.players_data[player].cards);
        } else {
            player_pick = arrayRandElement(cards_player['unknown']);
        }
    }
    if (cards_weapon['true'] || in_array("weapon", false_check)) {
        if (cards_weapon['false'].length != 0) {
            weapon_pick = array_false_change(cards_weapon['false'], data.players_data[player].cards);
        } else {
            weapon_pick = arrayRandElement(cards_weapon['unknown']);
        }
    }
    if (cards_location['true'] || in_array("location", false_check)) {
        if (cards_location['false'].length != 0) {
            location_pick = array_false_change(cards_location['false'], data.players_data[player].cards);
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
    }
    if (!weapon_pick) { //неизвестно оружие
        let unknown_array = cards_weapon['unknown'];
        if (unknown_array.length == 0) {
            unknown_array = cards_weapon['false'];
        }
        weapon_pick = neutral_distribution_select(unknown_array, calc_list);
    }
    if (!location_pick) { //неизвестно место
        let unknown_array = cards_location['unknown'];
        if (unknown_array.length == 0) {
            unknown_array = cards_location['false'];
        }
        location_pick = neutral_distribution_select(unknown_array, calc_list);
    }
    let bot_selected = [player_pick, weapon_pick, location_pick];
    console.log('selected ' + bot_selected);
    data.phase.point = "bot_action";
    data.phase.assumption = bot_selected;
    update_data(data);
    show_bot_selected();
}

function show_bot_selected() {
    let data = get_data();
    sleep(700);
    let player = data.phase.active_player;
    let cards_info = get_cards_info(data.user_name);
    let selected = data.phase.assumption;
    console.log(data.players_data[player]["name"] + " : Думаю, что преступник - " + cards_info[data.phase.assumption[0]]["name"] + ", орудие - " + cards_info[data.phase.assumption[1]]["name"] + ", место - " + cards_info[data.phase.assumption[2]]["name"]);
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
        chance = Math.round(chance / Math.sqrt(actions + 1));
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

function player_speach(position, text) {
    let pos_container = document.querySelector('div.' + position + '-player');
    let pos_player = pos_container.querySelector('div.player-info-container');

    let player_speach = document.createElement('div');
    player_speach.textContent = text;
    player_speach.className = "player-speach";
    //pos_player.append(player_speach);

    console.log(position + ' - ' + text);
    //console.log(pos_player);
}



function answer_button_click() {
    check_time();
    console.log('answer');
}





function set_data(players_amount, user_name) {
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
        order = ['cright', 'bottom', 'cleft'];
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
    let player = { "id": "user1", "side": "bottom", "pos": "bottom", "type": "user", "name": user_name, "score": 0 };
    players_data["user1"] = player;
    let players_ids = ["user1"];

    for (let i = 0; i < bots_amount; i++) {
        player = { "id": bots[i], "side": sides[i], "pos": positions[i], "type": "bot", "name": bots_info[bots[i]].name, "border": bots_info[bots[i]].border, "score": 0 }
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
    }

    let data = {
        "players_amount": players_amount,
        "user_name": user_name,
        "order": order,
        "players_data": players_data,
        "cards_info": cards_info,
        "phase": phase,
        "history": [],
    }

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
        "w1": { "id": "w1", "type": "weapon", "name": "Топор" },
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
        "l8": { "id": "l8", "type": "location", "name": "Спортзал" },
        "l9": { "id": "l9", "type": "location", "name": "Кладбище" },
        "l10": { "id": "l10", "type": "location", "name": "Сарай" },
        "l11": { "id": "l11", "type": "location", "name": "Библиотека" },
        "l12": { "id": "l12", "type": "location", "name": "Школа" },
        "l13": { "id": "l13", "type": "location", "name": "Офис" },
        "l14": { "id": "l14", "type": "location", "name": "Склад" },
        "l15": { "id": "l15", "type": "location", "name": "Подвал" },
        "l16": { "id": "l16", "type": "location", "name": "Лес" },
        "l17": { "id": "l17", "type": "location", "name": "Свалка" },
    };
    return cards_base_info;
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