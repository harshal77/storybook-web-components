/** @preserve OverlappingMarkerSpiderfier
https://github.com/jawj/OverlappingMarkerSpiderfier
Copyright (c) 2011 - 2017 George MacKerron
Released under the MIT licence: http://opensource.org/licenses/mit-license
 */

(function () {
  var callbackName,
    callbackRegEx,
    scriptTag,
    tag,
    _ref,
    _ref1,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  this["OverlappingMarkerSpiderfier"] = (function () {
    var ge, gm, mt, p, twoPi, x, _i, _len, _ref;

    p = _Class.prototype;

    _ref = [_Class, p];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      x = _ref[_i];
      x["VERSION"] = "1.0.3";
    }

    twoPi = Math.PI * 2;

    gm = ge = mt = null;

    _Class["markerStatus"] = {
      SPIDERFIED: "SPIDERFIED",
      SPIDERFIABLE: "SPIDERFIABLE",
      UNSPIDERFIABLE: "UNSPIDERFIABLE",
      UNSPIDERFIED: "UNSPIDERFIED",
    };

    function _Class(_at_map, opts) {
      var k, lcH, lcU, v;
      this.map = _at_map;
      if (opts == null) {
        opts = {};
      }
      if (this.constructor.hasInitialized == null) {
        this.constructor.hasInitialized = true;
        gm = google.maps;
        ge = gm.event;
        mt = gm.MapTypeId;
        p["keepSpiderfied"] = false;
        p["ignoreMapClick"] = false;
        p["markersWontHide"] = false;
        p["markersWontMove"] = false;
        p["basicFormatEvents"] = false;
        p["minZoomLevel"] = 0;
        p["nearbyDistance"] = 20;
        p["circleSpiralSwitchover"] = 9;
        p["circleFootSeparation"] = 23;
        p["circleStartAngle"] = twoPi / 12;
        p["spiralFootSeparation"] = 26;
        p["spiralLengthStart"] = 11;
        p["spiralLengthFactor"] = 4;
        p["spiderfiedZIndex"] = gm.Marker.MAX_ZINDEX + 20000;
        p["highlightedLegZIndex"] = gm.Marker.MAX_ZINDEX + 10000;
        p["usualLegZIndex"] = gm.Marker.MAX_ZINDEX + 1;
        p["legWeight"] = 1.5;
        p["legColors"] = {
          usual: {},
          highlighted: {},
        };
        lcU = p["legColors"]["usual"];
        lcH = p["legColors"]["highlighted"];
        lcU[mt.HYBRID] = lcU[mt.SATELLITE] = opts.legColorNormalSatellite
          ? opts.legColorNormalSatellite
          : "#fff";
        lcH[mt.HYBRID] = lcH[mt.SATELLITE] = opts.legColorHoveredSatellite
          ? opts.legColorHoveredSatellite
          : "#f00";
        lcU[mt.TERRAIN] = lcU[mt.ROADMAP] = opts.legColorNormal
          ? opts.legColorNormal
          : "#444";
        lcH[mt.TERRAIN] = lcH[mt.ROADMAP] = opts.legColorHovered
          ? opts.legColorHovered
          : "#f00";
        this.constructor.ProjHelper = function (map) {
          return this.setMap(map);
        };
        this.constructor.ProjHelper.prototype = new gm.OverlayView();
        this.constructor.ProjHelper.prototype["draw"] = function () {};
      }
      for (k in opts) {
        if (!__hasProp.call(opts, k)) continue;
        v = opts[k];
        this[k] = v;
      }
      this.projHelper = new this.constructor.ProjHelper(this.map);
      this.initMarkerArrays();
      this.listeners = {};
      this.formatIdleListener = this.formatTimeoutId = null;
      this.addListener("click", function (marker, e) {
        return ge.trigger(marker, "spider_click", e);
      });
      this.addListener("format", function (marker, status) {
        return ge.trigger(marker, "spider_format", status);
      });
      if (!this["ignoreMapClick"]) {
        ge.addListener(
          this.map,
          "click",
          (function (_this) {
            return function () {
              return _this["unspiderfy"]();
            };
          })(this)
        );
      }
      ge.addListener(
        this.map,
        "maptypeid_changed",
        (function (_this) {
          return function () {
            return _this["unspiderfy"]();
          };
        })(this)
      );
      ge.addListener(
        this.map,
        "zoom_changed",
        (function (_this) {
          return function () {
            _this["unspiderfy"]();
            if (!_this["basicFormatEvents"]) {
              return _this.formatMarkers();
            }
          };
        })(this)
      );
    }

    p.initMarkerArrays = function () {
      this.markers = [];
      return (this.markerListenerRefs = []);
    };

    p["addMarker"] = function (marker, spiderClickHandler) {
      marker.setMap(this.map);
      return this["trackMarker"](marker, spiderClickHandler);
    };

    p["trackMarker"] = function (marker, spiderClickHandler) {
      var listenerRefs;
      if (marker["_oms"] != null) {
        return this;
      }
      marker["_oms"] = true;
      listenerRefs = [
        ge.addListener(
          marker,
          "click",
          (function (_this) {
            return function (e) {
              return _this.spiderListener(marker, e);
            };
          })(this)
        ),
      ];
      if (!this["markersWontHide"]) {
        listenerRefs.push(
          ge.addListener(
            marker,
            "visible_changed",
            (function (_this) {
              return function () {
                return _this.markerChangeListener(marker, false);
              };
            })(this)
          )
        );
      }
      if (!this["markersWontMove"]) {
        listenerRefs.push(
          ge.addListener(
            marker,
            "position_changed",
            (function (_this) {
              return function () {
                return _this.markerChangeListener(marker, true);
              };
            })(this)
          )
        );
      }
      if (spiderClickHandler != null) {
        listenerRefs.push(
          ge.addListener(marker, "spider_click", spiderClickHandler)
        );
      }
      this.markerListenerRefs.push(listenerRefs);
      this.markers.push(marker);
      if (this["basicFormatEvents"]) {
        this.trigger(
          "format",
          marker,
          this.constructor["markerStatus"]["UNSPIDERFIED"]
        );
      } else {
        this.trigger(
          "format",
          marker,
          this.constructor["markerStatus"]["UNSPIDERFIABLE"]
        );
        this.formatMarkers();
      }
      return this;
    };

    p.markerChangeListener = function (marker, positionChanged) {
      if (this.spiderfying || this.unspiderfying) {
        return;
      }
      if (
        marker["_omsData"] != null &&
        (positionChanged || !marker.getVisible())
      ) {
        this["unspiderfy"](positionChanged ? marker : null);
      }
      return this.formatMarkers();
    };

    p["getMarkers"] = function () {
      return this.markers.slice(0);
    };

    p["removeMarker"] = function (marker) {
      this["forgetMarker"](marker);
      return marker.setMap(null);
    };

    p["forgetMarker"] = function (marker) {
      var i, listenerRef, listenerRefs, _j, _len1;
      if (marker["_omsData"] != null) {
        this["unspiderfy"]();
      }
      i = this.arrIndexOf(this.markers, marker);
      if (i < 0) {
        return this;
      }
      listenerRefs = this.markerListenerRefs.splice(i, 1)[0];
      for (_j = 0, _len1 = listenerRefs.length; _j < _len1; _j++) {
        listenerRef = listenerRefs[_j];
        ge.removeListener(listenerRef);
      }
      delete marker["_oms"];
      this.markers.splice(i, 1);
      this.formatMarkers();
      return this;
    };

    p["removeAllMarkers"] = p["clearMarkers"] = function () {
      var marker, markers, _j, _len1;
      markers = this["getMarkers"]();
      this["forgetAllMarkers"]();
      for (_j = 0, _len1 = markers.length; _j < _len1; _j++) {
        marker = markers[_j];
        marker.setMap(null);
      }
      return this;
    };

    p["forgetAllMarkers"] = function () {
      var i, listenerRef, listenerRefs, marker, _j, _k, _len1, _len2, _ref1;
      this["unspiderfy"]();
      _ref1 = this.markers;
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        marker = _ref1[i];
        listenerRefs = this.markerListenerRefs[i];
        for (_k = 0, _len2 = listenerRefs.length; _k < _len2; _k++) {
          listenerRef = listenerRefs[_k];
          ge.removeListener(listenerRef);
        }
        delete marker["_oms"];
      }
      this.initMarkerArrays();
      return this;
    };

    p["addListener"] = function (eventName, func) {
      var _base;
      ((_base = this.listeners)[eventName] != null
        ? _base[eventName]
        : (_base[eventName] = [])
      ).push(func);
      return this;
    };

    p["removeListener"] = function (eventName, func) {
      var i;
      i = this.arrIndexOf(this.listeners[eventName], func);
      if (!(i < 0)) {
        this.listeners[eventName].splice(i, 1);
      }
      return this;
    };

    p["clearListeners"] = function (eventName) {
      this.listeners[eventName] = [];
      return this;
    };

    p.trigger = function () {
      var args, eventName, func, _j, _len1, _ref1, _ref2, _results;
      (eventName = arguments[0]),
        (args = 2 <= arguments.length ? __slice.call(arguments, 1) : []);
      _ref2 = (_ref1 = this.listeners[eventName]) != null ? _ref1 : [];
      _results = [];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        func = _ref2[_j];
        _results.push(func.apply(null, args));
      }
      return _results;
    };

    p.generatePtsCircle = function (count, centerPt) {
      var angle, angleStep, circumference, i, legLength, _j, _results;
      circumference = this["circleFootSeparation"] * (2 + count);
      legLength = circumference / twoPi;
      angleStep = twoPi / count;
      _results = [];
      for (
        i = _j = 0;
        0 <= count ? _j < count : _j > count;
        i = 0 <= count ? ++_j : --_j
      ) {
        angle = this["circleStartAngle"] + i * angleStep;
        _results.push(
          new gm.Point(
            centerPt.x + legLength * Math.cos(angle),
            centerPt.y + legLength * Math.sin(angle)
          )
        );
      }
      return _results;
    };

    p.generatePtsSpiral = function (count, centerPt) {
      var angle, i, legLength, pt, _j, _results;
      legLength = this["spiralLengthStart"];
      angle = 0;
      _results = [];
      for (
        i = _j = 0;
        0 <= count ? _j < count : _j > count;
        i = 0 <= count ? ++_j : --_j
      ) {
        angle += this["spiralFootSeparation"] / legLength + i * 0.0005;
        pt = new gm.Point(
          centerPt.x + legLength * Math.cos(angle),
          centerPt.y + legLength * Math.sin(angle)
        );
        legLength += (twoPi * this["spiralLengthFactor"]) / angle;
        _results.push(pt);
      }
      return _results;
    };

    p.spiderListener = function (marker, e) {
      // Store old map bounds
      if (this.map.getZoom() < this["minZoomLevel"]) {
        p["oldMapPosition"] = {
          bounds: this.map.getBounds(),
          zoom: this.map.getZoom(), // Added this since resetting bounds decreases zoom level by 1
        };

        // Change map zoom
        this.map.setZoom(this["minZoomLevel"]);
        this.map.setCenter(marker.getPosition());

        // If panned, delete old map bounds
        ge.addListenerOnce(this.map, "center_changed", (_) => {
          p["oldMapPosition"] = null;
        });

        ge.addListenerOnce(this.map, "idle", (e) => {
          return this.spiderListenerTrigger(marker, e);
        });
      } else {
        return this.spiderListenerTrigger(marker, e);
      }
    };

    p.spiderListenerTrigger = function (marker, e) {
      var m,
        mPt,
        markerPt,
        markerSpiderfied,
        nDist,
        nearbyMarkerData,
        nonNearbyMarkers,
        pxSq,
        _j,
        _len1,
        _ref1;
      markerSpiderfied = marker["_omsData"] != null;
      if (!(markerSpiderfied && this["keepSpiderfied"])) {
        this["unspiderfy"](null, false);
      }
      if (
        markerSpiderfied ||
        this.map.getStreetView().getVisible() ||
        this.map.getMapTypeId() === "GoogleEarthAPI"
      ) {
        return this.trigger("click", marker, e);
      } else {
        nearbyMarkerData = [];
        nonNearbyMarkers = [];
        nDist = this["nearbyDistance"];
        pxSq = nDist * nDist;
        markerPt = this.llToPt(marker.position);
        _ref1 = this.markers;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          m = _ref1[_j];
          if (!(m.map != null && m.getVisible())) {
            continue;
          }
          mPt = this.llToPt(m.position);
          if (this.ptDistanceSq(mPt, markerPt) < pxSq) {
            nearbyMarkerData.push({
              marker: m,
              markerPt: mPt,
            });
          } else {
            nonNearbyMarkers.push(m);
          }
        }
        if (nearbyMarkerData.length === 1) {
          return this.trigger("click", marker, e);
        } else {
          // Trigger pre spiderfy event
          this.trigger("pre-spiderfy", marker);

          return this.spiderfy(nearbyMarkerData, nonNearbyMarkers, marker);
        }
      }
    };

    p["markersNearMarker"] = function (marker, firstOnly) {
      var m,
        mPt,
        markerPt,
        markers,
        nDist,
        pxSq,
        _j,
        _len1,
        _ref1,
        _ref2,
        _ref3;
      if (firstOnly == null) {
        firstOnly = false;
      }
      if (this.projHelper.getProjection() == null) {
        throw "Must wait for 'idle' event on map before calling markersNearMarker";
      }
      nDist = this["nearbyDistance"];
      pxSq = nDist * nDist;
      markerPt = this.llToPt(marker.position);
      markers = [];
      _ref1 = this.markers;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        m = _ref1[_j];
        if (m === marker || m.map == null || !m.getVisible()) {
          continue;
        }
        mPt = this.llToPt(
          (_ref2 =
            (_ref3 = m["_omsData"]) != null ? _ref3.usualPosition : void 0) !=
            null
            ? _ref2
            : m.position
        );
        if (this.ptDistanceSq(mPt, markerPt) < pxSq) {
          markers.push(m);
          if (firstOnly) {
            break;
          }
        }
      }
      return markers;
    };

    p.markerProximityData = function () {
      var i1,
        i2,
        m,
        m1,
        m1Data,
        m2,
        m2Data,
        mData,
        nDist,
        pxSq,
        _j,
        _k,
        _len1,
        _len2,
        _ref1,
        _ref2;
      if (this.projHelper.getProjection() == null) {
        throw "Must wait for 'idle' event on map before calling markersNearAnyOtherMarker";
      }
      nDist = this["nearbyDistance"];
      pxSq = nDist * nDist;
      mData = function () {
        var _j, _len1, _ref1, _ref2, _ref3, _results;
        _ref1 = this.markers;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          m = _ref1[_j];
          _results.push({
            pt: this.llToPt(
              (_ref2 =
                (_ref3 = m["_omsData"]) != null
                  ? _ref3.usualPosition
                  : void 0) != null
                ? _ref2
                : m.position
            ),
            willSpiderfy: false,
          });
        }
        return _results;
      }.call(this);
      _ref1 = this.markers;
      for (i1 = _j = 0, _len1 = _ref1.length; _j < _len1; i1 = ++_j) {
        m1 = _ref1[i1];
        if (!(m1.getMap() != null && m1.getVisible())) {
          continue;
        }
        m1Data = mData[i1];
        if (m1Data.willSpiderfy) {
          continue;
        }
        _ref2 = this.markers;
        for (i2 = _k = 0, _len2 = _ref2.length; _k < _len2; i2 = ++_k) {
          m2 = _ref2[i2];
          if (i2 === i1) {
            continue;
          }
          if (!(m2.getMap() != null && m2.getVisible())) {
            continue;
          }
          m2Data = mData[i2];
          if (i2 < i1 && !m2Data.willSpiderfy) {
            continue;
          }
          if (this.ptDistanceSq(m1Data.pt, m2Data.pt) < pxSq) {
            m1Data.willSpiderfy = m2Data.willSpiderfy = true;
            break;
          }
        }
      }
      return mData;
    };

    p["markersNearAnyOtherMarker"] = function () {
      var i, m, mData, _j, _len1, _ref1, _results;
      mData = this.markerProximityData();
      _ref1 = this.markers;
      _results = [];
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        m = _ref1[i];
        if (mData[i].willSpiderfy) {
          _results.push(m);
        }
      }
      return _results;
    };

    p.setImmediate = function (func) {
      return window.setTimeout(func, 0);
    };

    p.formatMarkers = function () {
      if (this["basicFormatEvents"]) {
        return;
      }
      if (this.formatTimeoutId != null) {
        return;
      }
      return (this.formatTimeoutId = this.setImmediate(
        (function (_this) {
          return function () {
            _this.formatTimeoutId = null;
            if (_this.projHelper.getProjection() != null) {
              return _this._formatMarkers();
            } else {
              if (_this.formatIdleListener != null) {
                return;
              }
              return (_this.formatIdleListener = ge.addListenerOnce(
                _this.map,
                "idle",
                function () {
                  return _this._formatMarkers();
                }
              ));
            }
          };
        })(this)
      ));
    };

    p._formatMarkers = function () {
      var i,
        marker,
        proximities,
        status,
        _j,
        _k,
        _len1,
        _len2,
        _ref1,
        _results,
        _results1;
      if (this["basicFormatEvents"]) {
        _results = [];
        for (_j = 0, _len1 = markers.length; _j < _len1; _j++) {
          marker = markers[_j];
          status = marker["_omsData"] != null ? "SPIDERFIED" : "UNSPIDERFIED";
          _results.push(
            this.trigger(
              "format",
              marker,
              this.constructor["markerStatus"][status]
            )
          );
        }
        return _results;
      } else {
        proximities = this.markerProximityData();
        _ref1 = this.markers;
        _results1 = [];
        for (i = _k = 0, _len2 = _ref1.length; _k < _len2; i = ++_k) {
          marker = _ref1[i];
          status =
            marker["_omsData"] != null
              ? "SPIDERFIED"
              : proximities[i].willSpiderfy
              ? "SPIDERFIABLE"
              : "UNSPIDERFIABLE";
          _results1.push(
            this.trigger(
              "format",
              marker,
              this.constructor["markerStatus"][status]
            )
          );
        }
        return _results1;
      }
    };

    p.makeHighlightListenerFuncs = function (marker) {
      return {
        highlight: (function (_this) {
          return function () {
            return marker["_omsData"].leg.setOptions({
              strokeColor:
                _this["legColors"]["highlighted"][_this.map.mapTypeId],
              zIndex: _this["highlightedLegZIndex"],
            });
          };
        })(this),
        unhighlight: (function (_this) {
          return function () {
            return marker["_omsData"].leg.setOptions({
              strokeColor: _this["legColors"]["usual"][_this.map.mapTypeId],
              zIndex: _this["usualLegZIndex"],
            });
          };
        })(this),
      };
    };

    p.centerMap = function (map, markers) {
      this.bounds = new google.maps.LatLngBounds();

      markers.forEach((marker) => {
        var latlng = new google.maps.LatLng(
          marker.position.lat(),
          marker.position.lng()
        );
        this.bounds.extend(latlng);
      });

      // fit to bounds
      map.fitBounds(this.bounds);
    };

    p.spiderfy = function (markerData, nonNearbyMarkers, clickedMarker) {
      var bodyPt,
        footLl,
        footPt,
        footPts,
        highlightListenerFuncs,
        leg,
        marker,
        md,
        nearestMarkerDatum,
        numFeet,
        spiderfiedMarkers;
      this.spiderfying = true;
      numFeet = markerData.length;
      bodyPt = this.ptAverage(
        (function () {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = markerData.length; _j < _len1; _j++) {
            md = markerData[_j];
            _results.push(md.markerPt);
          }
          return _results;
        })()
      );
      footPts =
        numFeet >= this["circleSpiralSwitchover"]
          ? this.generatePtsSpiral(numFeet, bodyPt).reverse()
          : this.generatePtsCircle(numFeet, bodyPt);
      spiderfiedMarkers = function () {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = footPts.length; _j < _len1; _j++) {
          footPt = footPts[_j];
          footLl = this.ptToLl(footPt);
          nearestMarkerDatum = this.minExtract(
            markerData,
            (function (_this) {
              return function (md) {
                return _this.ptDistanceSq(md.markerPt, footPt);
              };
            })(this)
          );
          marker = nearestMarkerDatum.marker;
          leg = new gm.Polyline({
            map: this.map,
            path: [marker.position, footLl],
            // strokeColor: this["legColors"]["usual"][this.map.mapTypeId],
            // strokeColor: clickedMarker.iconDefault.fillColor,
            strokeColor: "#444",
            strokeWeight: this["legWeight"],
            zIndex: this["usualLegZIndex"],
          });
          marker["_omsData"] = {
            usualPosition: marker.getPosition(),
            usualZIndex: marker.getZIndex(),
            leg: leg,
          };
          // Function to highlight marker on hover
          // if (
          //   this["legColors"]["highlighted"][this.map.mapTypeId] !==
          //   this["legColors"]["usual"][this.map.mapTypeId]
          // ) {
          //   highlightListenerFuncs = this.makeHighlightListenerFuncs(marker);
          //   marker["_omsData"].hightlightListeners = {
          //     highlight: ge.addListener(
          //       marker,
          //       "mouseover",
          //       highlightListenerFuncs.highlight
          //     ),
          //     unhighlight: ge.addListener(
          //       marker,
          //       "mouseout",
          //       highlightListenerFuncs.unhighlight
          //     ),
          //   };
          // }
          this.trigger(
            "format",
            marker,
            this.constructor["markerStatus"]["SPIDERFIED"]
          );
          marker.setPosition(footLl);
          marker.setZIndex(Math.round(this["spiderfiedZIndex"] + footPt.y));
          _results.push(marker);
        }
        return _results;
      }.call(this);
      delete this.spiderfying;
      this.spiderfied = true;
      return this.trigger("spiderfy", spiderfiedMarkers, nonNearbyMarkers);
    };

    p["unspiderfy"] = function (markerNotToMove, resetZoom = true) {
      var listeners,
        marker,
        nonNearbyMarkers,
        status,
        unspiderfiedMarkers,
        _j,
        _len1,
        _ref1;
      if (markerNotToMove == null) {
        markerNotToMove = null;
      }
      if (this.spiderfied == null) {
        return this;
      }
      this.unspiderfying = true;
      unspiderfiedMarkers = [];
      nonNearbyMarkers = [];
      _ref1 = this.markers;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        marker = _ref1[_j];
        if (marker["_omsData"] != null) {
          marker["_omsData"].leg.setMap(null);
          if (marker !== markerNotToMove) {
            marker.setPosition(marker["_omsData"].usualPosition);
          }
          marker.setZIndex(marker["_omsData"].usualZIndex);
          listeners = marker["_omsData"].hightlightListeners;
          if (listeners != null) {
            ge.removeListener(listeners.highlight);
            ge.removeListener(listeners.unhighlight);
          }
          delete marker["_omsData"];
          if (marker !== markerNotToMove) {
            status = this["basicFormatEvents"]
              ? "UNSPIDERFIED"
              : "SPIDERFIABLE";
            this.trigger(
              "format",
              marker,
              this.constructor["markerStatus"][status]
            );
          }
          unspiderfiedMarkers.push(marker);
        } else {
          nonNearbyMarkers.push(marker);
        }
      }
      delete this.unspiderfying;
      delete this.spiderfied;

      if (resetZoom && p["oldMapPosition"]) {
        let pos = p["oldMapPosition"];
        this.map.fitBounds(pos.bounds);
        this.map.setZoom(pos.zoom);
        p["oldMapPosition"] = null;
        p["oldMarker"] = null;
      }

      this.trigger("unspiderfy", unspiderfiedMarkers, nonNearbyMarkers);
      return this;
    };

    p.ptDistanceSq = function (pt1, pt2) {
      var dx, dy;
      dx = pt1.x - pt2.x;
      dy = pt1.y - pt2.y;
      return dx * dx + dy * dy;
    };

    p.ptAverage = function (pts) {
      var numPts, pt, sumX, sumY, _j, _len1;
      sumX = sumY = 0;
      for (_j = 0, _len1 = pts.length; _j < _len1; _j++) {
        pt = pts[_j];
        sumX += pt.x;
        sumY += pt.y;
      }
      numPts = pts.length;
      return new gm.Point(sumX / numPts, sumY / numPts);
    };

    p.llToPt = function (ll) {
      return this.projHelper.getProjection().fromLatLngToDivPixel(ll);
    };

    p.ptToLl = function (pt) {
      return this.projHelper.getProjection().fromDivPixelToLatLng(pt);
    };

    p.minExtract = function (set, func) {
      var bestIndex, bestVal, index, item, val, _j, _len1;
      for (index = _j = 0, _len1 = set.length; _j < _len1; index = ++_j) {
        item = set[index];
        val = func(item);
        if (
          typeof bestIndex === "undefined" ||
          bestIndex === null ||
          val < bestVal
        ) {
          bestVal = val;
          bestIndex = index;
        }
      }
      return set.splice(bestIndex, 1)[0];
    };

    p.arrIndexOf = function (arr, obj) {
      var i, o, _j, _len1;
      if (arr.indexOf != null) {
        return arr.indexOf(obj);
      }
      for (i = _j = 0, _len1 = arr.length; _j < _len1; i = ++_j) {
        o = arr[i];
        if (o === obj) {
          return i;
        }
      }
      return -1;
    };

    return _Class;
  })();

  callbackRegEx = /(\?.*(&|&amp;)|\?)spiderfier_callback=(\w+)/;

  scriptTag = document.currentScript;

  if (scriptTag == null) {
    scriptTag = (function () {
      var _i, _len, _ref, _ref1, _results;
      _ref = document.getElementsByTagName("script");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        if (
          (_ref1 = tag.getAttribute("src")) != null
            ? _ref1.match(callbackRegEx)
            : void 0
        ) {
          _results.push(tag);
        }
      }
      return _results;
    })()[0];
  }

  if (scriptTag != null) {
    callbackName =
      (_ref = scriptTag.getAttribute("src")) != null
        ? (_ref1 = _ref.match(callbackRegEx)) != null
          ? _ref1[3]
          : void 0
        : void 0;
    if (callbackName) {
      if (typeof window[callbackName] === "function") {
        window[callbackName]();
      }
    }
  }

  if (typeof window["spiderfier_callback"] === "function") {
    window["spiderfier_callback"]();
  }
}.call(this));
