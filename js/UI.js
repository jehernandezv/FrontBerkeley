class UI {

     renderTable(date) {

        var dataSet = [
            {
                hora_anterior: date.anterior,
                hora_actual: date.actual
            }
        ];
        var datatable = $('.exceptionTable').DataTable({
            retrieve: true,
            lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            columns: [
                { title: "Hora anterior", data: "hora_anterior" },
                { title: "Hora actual", data: "hora_actual" },
            ]
        });
        datatable.rows.add(dataSet);
        datatable.draw();
        console.log(dataSet);
    }
}
exports = UI;
