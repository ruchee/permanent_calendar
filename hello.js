// TODO 从数据库取出 date_list，动态填充
var date_list = {
    '2018-3-3': '节假日',
    '2018-3-5': '节假日',
    '2018-3-6': '节假日',
    '2018-2-24': '节假日',
};


var myCalendar = new SimpleCalendar('#hello', { mark: date_list });
myCalendar.updateSize('800px', '500px');


$('.sc-yleft, .sc-yright, .sc-mleft, .sc-mright, .sc-return-today').click(function() {
    updateSelectedDays();
});
$('.sc-select-year, .sc-select-month').change(function() {
    updateSelectedDays();
});


// 切换年份和月份时，更新日期标注
function updateSelectedDays() {
    var dates = $('.sc-item');
    dates.each(function(item) {
        item = dates[item];

        var year  = parseInt($('.sc-select-year').val());
        var month = parseInt($('.sc-select-month').val());
        var day   = parseInt($(item).find('.day').text());

        if ($(item).hasClass('sc-othermenth')) {
            if (day >= 20) {
                month--;
            } else if (day <= 15) {
                month++;
            }

            if (month <= 0) {
                month = 12;
                year--;
            } else if (month >= 13) {
                month = 1;
                year++;
            }
        }
        var date = year + '-' + month + '-' + day;

        if ($.inArray(date, Object.keys(date_list)) >= 0) {
            date_list[date] = '节假日';
            $(item).addClass('sc-mark');
            $(item).find('.lunar-day').text('节假日');
        } else {
            delete date_list[date];
            $(item).removeClass('sc-mark');
            if ($(item).find('.lunar-day').text() == '节假日') {
                $(item).find('.lunar-day').text('已取消');
            }
        }
    });
}


// 选择日期
$('.sc-item').click(function() {
    var year  = parseInt($('.sc-select-year').val());
    var month = parseInt($('.sc-select-month').val());
    var day   = parseInt($(this).find('.day').text());

    if ($(this).hasClass('sc-othermenth')) {
        if (day >= 20) {
            month--;
        } else if (day <= 15) {
            month++;
        }

        if (month <= 0) {
            month = 12;
            year--;
        } else if (month >= 13) {
            month = 1;
            year++;
        }
    }

    var date = year + '-' + month + '-' + day;

    if ($.inArray(date, Object.keys(date_list)) >= 0) {
        delete date_list[date];
        $(this).removeClass('sc-mark');
        $(this).find('.lunar-day').text('已取消');
    } else {
        date_list[date] = '节假日';
        $(this).addClass('sc-mark');
        $(this).find('.lunar-day').text('节假日');
    }

    // TODO AJAX 请求后端接口，将 date_list 保存进数据库
});
