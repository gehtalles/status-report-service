$(
  (function (appState) {
    var stats = Object.values(appState.pieChartData.stats)

    var total = stats.reduce(function (sum, value) {
      return (sum += value)
    }, 0)

    var finalDataset = {
      data: stats.concat([total]),
      backgroundColor: ['#198754', '#dc3545', '#ffc107', '#efefef'],
    }

    var pieChart = new Chart(document.getElementById('pie-chart'), {
      type: 'pie',
      data: {
        datasets: [finalDataset],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        events: [],
      },
    })

    // NOTE: initially hide total data entry
    pieChart.hide(0, stats.length)

    var $table = $('.table')

    $('[data-trigger]').on('click', function () {
      var atIndex = parseInt(this.dataset.index, 10)
      var statusCode = this.dataset.statusCode
      var $tableRows = $table.find(`[data-status-code='${statusCode}']`)

      if ($(this).hasClass('is-active')) {
        pieChart.hide(0, atIndex)
        $tableRows.hide()
        $(this).removeClass('is-active')
      } else {
        pieChart.show(0, atIndex)
        $tableRows.show()
        $(this).addClass('is-active')
      }

      var activeTriggers = $('[data-trigger].is-active')
      if (activeTriggers.length === stats.length) {
        pieChart.hide(0, stats.length)
      } else {
        pieChart.show(0, stats.length)
      }
    })
  })(WSD_APP_STATE),
)
