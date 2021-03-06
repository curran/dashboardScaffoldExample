/*global define, document */
/*jslint nomen: true */ // this causes JSLint to tolerate "_"

define(['d3', 'underscore', 'leaflet', 'getterSetters', 'loadCSS', 'leafletProviders'], function (d3, _, L, getterSetters, loadCSS) {
    "use strict";

    loadCSS('http://cdn.leafletjs.com/leaflet-0.6.2/leaflet.css');

    return function () {
        var div = document.createElement('div'),
            // See http://bost.ocks.org/mike/chart/
            my = getterSetters({
                tileProvider: 'OpenStreetMap.Mapnik',
                minRadius: 8,
                maxRadius: 40,
                maxClusterRadius: 80,
                showNumbers: false,
                width: 0,
                height: 0,
                pan: [0, 0],
                zoom: 1
            }),
            map = L.map(div, {
                attributionControl: false
            }),
            settingPanZoom = false,
            updatePanZoom = function () {
                if (!settingPanZoom) {
                    map.setView(my.pan(), my.zoom());
                }
            },
            updateSize = _.debounce(function () {
                // This call causes proper resize handling.
                map.invalidateSize();
            }, 0),
            updateTileProvider = (function () {
                var providers = {},
                    oldProvider;
                return function (tileProvider) {
                    var provider = providers[tileProvider];
                    if (oldProvider) {
                        oldProvider.setOpacity(0);
                    }
                    if (!provider) {
                        provider = L.tileLayer.provider(tileProvider);
                        providers[tileProvider] = provider;
                        provider.addTo(map);
                    } else {
                        provider.setOpacity(1);
                    }
                    oldProvider = provider;
                };
            }());

        d3.select(div)
            .style('width', '100%')
            .style('height', '100%');

        getterSetters.connect(my.tileProvider, updateTileProvider);

        my.width.on('change', updateSize);
        my.height.on('change', updateSize);

        updatePanZoom();
        my.pan.on('change', updatePanZoom);
        my.zoom.on('change', updatePanZoom);
        map.on('moveend', function () {
            var latLng = map.getCenter(),
                pan = [latLng.lat, latLng.lng],
                zoom = map.getZoom();
            settingPanZoom = true;
            if (!_.isEqual(my.pan(), pan)) {
                my.pan(pan);
            }
            if (my.zoom() !== zoom) {
                my.zoom(zoom);
            }
            settingPanZoom = false;
        });
    //TODO          minRadius: 8,
    //TODO          maxRadius: 40,
    //TODO          maxClusterRadius: 80,
    //TODO          showNumbers: false,
    //TODO          width: 0,
    //TODO          height: 0
    //TODO    my.bkgColor.on('change', updateRect);
    //TODO    my.lineColor.on('change', updateLines);
    //TODO    my.lineWidth.on('change', updateLines);
    //TODO    my.labelText.on('change', updateLabel);
    //TODO    my.labelSize.on('change', updateLabel);

        return {
            domElement: div,
            chart: my
        };
    };
});
