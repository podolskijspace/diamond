function form () {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        setTimeout(() => {
            if (!document.querySelector('.parsley-errors-list li')) {
                NKH.order = parseFloat(NKH.order.replace(/\s+/g, ''))
                let ask = document.querySelector('.js-title-footer').textContent.trim() === 'Обратная связь';
                $.post(
                    'send.php', // адрес обработчика
                    $("#form").serialize(), // отправляемые данные          
                    
                    function(msg) { // получен ответ сервера 
                        document.querySelector('.popup-footer').classList.add('active');
                        NKH.body.classList.add('fixed');
        
                        if (ask) {
                            var goalParams = {
                                order_price: NKH.order,
                                currency: "RUB",
                            }
        
                            
                            ym(65567878,'reachGoal','send_form_without_calculator', goalParams);
        
                            gtag('event', 'generate_lead', {
                                'event_label': 'send_form_without_calculator',
                                'value': NKH.order
                            });
        
                        }
                        else {
                            var goalParams = {
                                order_price: NKH.order,
                                currency: "RUB",
                            }
        
                            ym(65567878,'reachGoal','send_form_with_calculator', goalParams)
                        
                            gtag('event', 'generate_lead', {
                                'event_label': 'send_form_with_calculator',
                                'value': NKH.order
                            });
                        }   
                    }
                );
                return false;
            }
        }, 500)
    });
}