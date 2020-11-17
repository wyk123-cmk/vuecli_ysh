//日期转换 例如：2019-04-07T16:00:00.000+0000 转换后 2019-04-08 08:00:00
function formatDateTime(date){
    // debugger;
    if(date == null) return '';
    var time = new Date(Date.parse(date));
        time.setTime(time.setHours(time.getHours()));
        var Y = time.getFullYear() + '-';
        var M = addZero(time.getMonth() + 1) + '-';
        var D = addZero(time.getDate()) + ' ';
        var h = addZero(time.getHours()) + ':';
        var m = addZero(time.getMinutes()) + ':';
        var s = addZero(time.getSeconds());
        return Y + M + D + h + m + s;
}

function addZero(num) {
    return num < 10 ? '0' + num : num;
} 

export { formatDateTime };