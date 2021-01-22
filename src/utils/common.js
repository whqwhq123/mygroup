// 流程图
export function chart_html(arr) {
  for (let i = 0; i < arr.length; i++) {
    this.chart += '<div class="chart_content">'
    if (arr[i]['type']) {
      this.chart +=
        '<div class="chart_line_bottom"><span class="chart_line_bottom1"></span><span class="chart_line_bottom2">' +
        arr[i]['type'] + '</span></div><span class="chart_line_bottom1"></span>'
    } else {
      this.chart += '<div class="chart_line_bottom"><span class="chart_line_bottom1"></span></div>'
    }

    if (arr[i]['connect'] && arr[i]['all_user']) {
      this.chart += '<div class="chart_block"><div class="chart_border"><div class="chart_block_content">' + arr[
        i]['name'] + '</div><div class="chart_block_bottom"><span>' + arr[i]['connect'] + '/人次 ' + parseInt(arr[i][
        'connect'
      ] / arr[i]['all_user'] * 100) + '%/' + arr[i]['all_user'] + '人次</div></div>'
    } else {
      this.chart += '<div class="chart_block"><div class="chart_border"><div class="chart_block_content">' + arr[
        i]['name'] + '</div></div>'
    }

    if (arr[i]['children']) {
      this.chart += '<div class="chart_line_top"><span></span></div></div><div class="chart_line_center"><span></span>'
    }
    this.chart += '</div>'
    if (arr[i]['children']) {
      this.chart += '<div class="chart_child">'
    }
    if (arr[i]['children']) {
      this.chart_html(arr[i]['children'])
    }
    if (arr[i]['children']) {
      this.chart += '</div>'
    }
    this.chart += '</div>'
  }
}
