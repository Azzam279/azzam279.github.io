$(function() {
    $.ajax({
        url: 'prices.json',
        type: 'GET',
        success: function(res) {
            let bayi = res.bayi;
            let pelajar = res.pelajar;
            let personal = res.personal;
            let bisnis = res.bisnis;
            let harga_bayi = parseInt(bayi.harga);
            let harga_pelajar = parseInt(pelajar.harga);
            let harga_personal = parseInt(personal.harga);
            let harga_bisnis = parseInt(bisnis.harga);
            let diskon_bayi = parseInt(bayi.diskon.replace(/%/g, ""));
            let diskon_pelajar = parseInt(pelajar.diskon.replace(/%/g, ""));
            let diskon_personal = parseInt(personal.diskon.replace(/%/g, ""));
            let diskon_bisnis = parseInt(bisnis.diskon.replace(/%/g, ""));

            let datas = [
                {'harga': harga_bayi, 'diskon': diskon_bayi, 'class': '.bayi'},
                {'harga': harga_pelajar, 'diskon': diskon_pelajar, 'class': '.pelajar'},
                {'harga': harga_personal, 'diskon': diskon_personal, 'class': '.personal'},
                {'harga': harga_bisnis, 'diskon': diskon_bisnis, 'class': '.bisnis'},
            ];

            const formatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            });

            for (let i = 0; i < datas.length; i++) {
                let harga, length;
                if (datas[i].diskon > 0) {
                    let diskon = (datas[i].diskon / 100) * datas[i].harga;
                    harga = datas[i].harga - diskon;
                    harga = formatter.format(harga).substr(3);
                    length = harga.toString().length;

                    $(datas[i].class + " .old-price").show();
                    $(datas[i].class + " .old-price").html(formatter.format(datas[i].harga));
                    if (datas[i].harga >= 1000) {
                        $(datas[i].class + " .new-price").html('<sup class="sup1">Rp</sup><span>'+harga.toString().substr(0, length - 4)+'</span><sup class="sup2">'+harga.toString().substr(-4)+'</sup><sup class="sup3">/bln</sup>');
                    } else {
                        $(datas[i].class + " .new-price").html('<sup class="sup1">Rp</sup><span>'+harga+'</span><sup class="sup3">/bln</sup>');
                    }
                } else {
                    harga = formatter.format(datas[i].harga).substr(3);
                    length = harga.toString().length;
                    $(datas[i].class + " .new-price").html('<sup class="sup1">Rp</sup><span>'+harga.toString().substr(0, length - 4)+'</span><sup class="sup2">'+harga.toString().substr(-4)+'</sup><sup class="sup3">/bln</sup>');
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
});